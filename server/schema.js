import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import config from './schemas/config'
import photo from './schemas/photo'
import purchaseOption from './schemas/purchaseOption'
import size from './schemas/size'
import settings from './schemas/settings'
import product from './schemas/product'
import shippingMethod from './schemas/shippingMethod'

export default createSchema({
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    config,
    photo,
    purchaseOption,
    size,
    settings,
    product,
    shippingMethod,
  ]),
})
