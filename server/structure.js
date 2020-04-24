import S from '@sanity/desk-tool/structure-builder'
import { FiImage, FiSettings, FiShoppingBag } from 'react-icons/fi'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Photos')
        .schemaType('photo')
        .icon(FiImage)
        .child(S.documentTypeList('photo').title('Photos')),
      S.divider(),
      S.listItem()
        .title('Settings')
        .icon(FiSettings)
        .child(
          S.editor()
            .title('Settings')
            .schemaType('settings')
            .documentId('settings')
        ),
      S.listItem()
        .title('Products')
        .schemaType('product')
        .icon(FiShoppingBag)
        .child(
          S.documentTypeList('product')
            .title('Products')
            .menuItems()
            .canHandleIntent(() => false)
        ),
      S.listItem()
        .title('Shipping')
        .child(
          S.documentTypeList('product')
            .title('Shipping')
            .menuItems()
            .canHandleIntent(() => false)
            .child((productId) =>
              S.documentTypeList('shippingMethod')
                .filter('product._ref == $productId')
                .params({ productId })
                .initialValueTemplates([
                  S.initialValueTemplateItem('shippingMethodForProduct', {
                    productId,
                  }),
                ])
            )
        ),
      S.listItem()
        .title('Config')
        .icon(FiSettings)
        .child(
          S.editor()
            .id('config')
            .schemaType('config')
            .documentId('global-config')
        ),
    ])
