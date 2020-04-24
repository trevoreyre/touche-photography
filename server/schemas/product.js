import { FiMaximize, FiShoppingBag } from 'react-icons/fi'

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: FiShoppingBag,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      options: { editModal: 'modal' },
      of: [
        {
          name: 'size',
          title: 'Size',
          type: 'object',
          icon: FiMaximize,
          fields: [
            {
              name: 'width',
              title: 'Width',
              type: 'number',
              validation: (Rule) => Rule.required().integer(),
            },
            {
              name: 'height',
              title: 'Height',
              type: 'number',
              validation: (Rule) => Rule.required().integer(),
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
              validation: (Rule) => Rule.required().integer(),
            },
          ],
          preview: {
            select: {
              width: 'width',
              height: 'height',
              price: 'price',
            },
            prepare({ width, height, price }) {
              return {
                title: `${width || '0'}x${height || '0'}`,
                subtitle: `$${price || '0'}`,
              }
            },
          },
        }
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      sizes: 'sizes',
    },
    prepare({ title, sizes }) {
      let subtitle = 'No sizes'
      if (sizes && sizes.length) {
        subtitle = `${sizes.length} size${sizes.length !== 1 ? 's' : ''}`
      }

      return {
        title,
        subtitle,
      }
    },
  },
}
