export default {
  name: 'purchaseOption',
  title: 'Purchase Option',
  type: 'object',
  fields: [
    {
      name: 'option',
      title: 'Option',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required()
    }
  ]
}
