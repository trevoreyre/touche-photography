import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import photo from './schemas/photo'
import product from './schemas/product'
import settings from './schemas/settings'
import shippingMethod from './schemas/shippingMethod'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([photo, product, settings, shippingMethod]),
})
