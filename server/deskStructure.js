import Structure from '@sanity/desk-tool/structure-builder'
import { FiSettings as IconSettings } from 'react-icons/fi'

const hiddenDocTypes = ['config']

const filterDocTypes = document => !hiddenDocTypes.includes(document.getId())

export default () =>
  Structure.list()
    .title('Content')
    .items([
      ...Structure.documentTypeListItems()
        .filter(filterDocTypes),
      Structure.listItem()
        .title('Settings')
        .icon(IconSettings)
        .child(
          Structure.editor()
            .id('config')
            .schemaType('config')
            .documentId('global-config')
        )
    ])
