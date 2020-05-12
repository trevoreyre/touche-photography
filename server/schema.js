import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import imageBlock from './schemas/imageBlock'
import page from './schemas/page'
import photo from './schemas/photo'
import product from './schemas/product'
import settings from './schemas/settings'
import shippingMethod from './schemas/shippingMethod'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    imageBlock,
    page,
    photo,
    product,
    settings,
    shippingMethod,
  ]),
})
