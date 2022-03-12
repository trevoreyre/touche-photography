const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const SanityClient = require('@sanity/client')
const sanityImageUrl = require('@sanity/image-url')

const sanityClient = SanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
})
const sanityUrlBuilder = sanityImageUrl(sanityClient)

const PHOTO_QUERY = `
  *[_type == 'photo' && _id == $photoId][0] {
    'id': _id,
    title,
    'slug': slug.current,
    image
  }
`

const PRODUCT_QUERY = `
  *[_type == 'product' && _id == $productId][0] {
    'id': _id,
    name,
    'size': sizes[_key == $sizeKey][0] {
      'id': _key,
      width,
      height,
      price,
    }
  }
`

/**
 * Each shippingMethod has a list of rates, each with a list of sizes you
 * can ship at that rate. To calculate 'rate', we filter the list of sizes
 * in shippingMethod.rates.sizes to only the single $sizeKey variable
 * provided, then filter the list of rates to those where the list of sizes
 * is not empty. This gives us a list of one rate for the provided $sizeKey,
 * then we can just grab the rate from it directly.
 */
const SHIPPING_METHODS_QUERY = `
  *[_type == 'shippingMethod' && product._ref == $productId] {
    'id': _id,
    name,
    deliveryTime,
    'rate': rates[][count(sizes[][@ in [$sizeKey]]) > 0][0].rate,
  }
`

const QUERY = `{
  'photo': ${PHOTO_QUERY},
  'product': ${PRODUCT_QUERY},
  'shippingMethods': ${SHIPPING_METHODS_QUERY}
}`

exports.handler = async (event) => {
  const params = new URLSearchParams(event.body)
  const photoId = params.get('photoId')
  const productId = params.get('productId')
  const sizeKey = params.get('sizeKey')

  const { photo, product, shippingMethods } = await sanityClient.fetch(QUERY, {
    photoId,
    productId,
    sizeKey,
  })

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    success_url: `${process.env.SITE_URL}/confirmation?session={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.SITE_URL}/photos/${photo.slug}?product=${productId}&size=${sizeKey}`,
    metadata: {
      photoId,
      productId,
      sizeKey,
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'USD',
          unit_amount: product.size.price * 100,
          product_data: {
            name: photo.title,
            description: `${product.name} - ${product.size.width}x${product.size.height}`,
            images: [sanityUrlBuilder.image(photo.image).width(100).url()],
          },
        },
      },
    ],
    shipping_address_collection: { allowed_countries: ['US'] },
    shipping_options: shippingMethods
      .sort(({ rate: rate1 }, { rate: rate2 }) => rate1 - rate2)
      .map((shippingMethod) => ({
        shipping_rate_data: {
          display_name: shippingMethod.name,
          type: 'fixed_amount',
          fixed_amount: {
            amount: shippingMethod.rate * 100,
            currency: 'USD',
          },
          delivery_estimate: {
            maximum: {
              unit: 'business_day',
              value: shippingMethod.deliveryTime,
            },
          },
        },
      })),
  })

  return {
    statusCode: 303,
    headers: {
      Location: session.url,
    },
  }
}
