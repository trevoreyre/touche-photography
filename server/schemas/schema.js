import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import config from './config'
import photo from './photo'
import purchaseOption from './purchaseOption'
import size from './size'

export default createSchema({
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    config,
    photo,
    purchaseOption,
    size,
  ])
})
