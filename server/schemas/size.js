import { FiMaximize as IconMaximize } from 'react-icons/fi'

export default {
  name: 'size',
  title: 'Size',
  type: 'object',
  icon: IconMaximize,
  fields: [
    {
      name: 'width',
      title: 'Width',
      type: 'number',
      validation: Rule => Rule.required().integer()
    },
    {
      name: 'height',
      title: 'Height',
      type: 'number',
      validation: Rule => Rule.required().integer()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().integer()
    },
    {
      name: 'shipping',
      title: 'Shipping',
      type: 'number',
      validation: Rule => Rule.required().integer()
    }
  ],
  preview: {
    select: {
      width: 'width',
      height: 'height',
      price: 'price'
    },
    prepare({ width, height, price }) {
      return {
        title: `${width || '0'}x${height || '0'}`,
        subtitle: `$${price || '0'}`,
      }
    }
  }
}
