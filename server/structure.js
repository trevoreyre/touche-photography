import S from '@sanity/desk-tool/structure-builder'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Photos')
        .schemaType('photo')
        .child(S.documentTypeList('photo').title('Photos')),
      S.divider(),
      S.listItem()
        .title('Products')
        .schemaType('product')
        .child(
          S.documentTypeList('product')
            .title('Products')
            .menuItems()
            .canHandleIntent(() => false)
        ),
      S.listItem()
        .title('Shipping')
        .schemaType('shippingMethod')
        .child(
          S.documentTypeList('product')
            .schemaType('shippingMethod')
            .title('Edit shipping for product')
            .menuItems()
            .canHandleIntent(() => false)
            .child((productId) =>
              S.documentTypeList('shippingMethod')
                .schemaType('shippingMethod')
                .filter('product._ref == $productId')
                .params({ productId })
                .menuItems()
                .initialValueTemplates([
                  S.initialValueTemplateItem('shippingMethodForProduct', {
                    productId,
                  }),
                ])
            )
        ),
      S.listItem()
        .title('Settings')
        .schemaType('settings')
        .child(
          S.editor()
            .title('Settings')
            .schemaType('settings')
            .documentId('settings')
        ),
    ])
