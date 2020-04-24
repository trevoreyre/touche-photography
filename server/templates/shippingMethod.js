import T from '@sanity/base/initial-value-template-builder'

export default T.template({
  id: 'shippingMethodForProduct',
  title: 'Shipping Method',
  schemaType: 'shippingMethod',
  parameters: [
    {
      name: 'productId',
      type: 'string',
    },
  ],
  value: ({ productId }) => ({
    product: { _type: 'reference', _ref: productId },
  }),
})
