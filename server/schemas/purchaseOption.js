import { FiShoppingBag as IconShoppingBag } from 'react-icons/fi'

export default {
  name: 'purchaseOption',
  title: 'Purchase Option',
  type: 'object',
  icon: IconShoppingBag,
  fields: [
    {
      name: 'material',
      title: 'Material',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      of: [{ type: 'size' }],
      options: { editModal: 'popover' }
    }
  ],
  preview: {
    select: {
      title: 'material',
      sizes: 'sizes'
    },
    prepare({ title, sizes }) {
      let subtitle = 'No sizes'
      if (sizes && sizes.length) {
        subtitle = `${sizes.length} size${sizes.length !== 1 ? 's' : ''}`
      }

      return {
        title,
        subtitle
      }
    }
  },
}
