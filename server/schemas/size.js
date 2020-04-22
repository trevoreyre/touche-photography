import { FiMaximize as IconMaximize } from 'react-icons/fi'

export default {
  name: 'size',
  title: 'Size',
  type: 'object',
  icon: IconMaximize,
  fieldsets: [{ name: 'shipping', title: 'Shipping' }],
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
    {
      name: 'ground',
      title: 'Ground',
      type: 'number',
      fieldset: 'shipping',
      validation: (Rule) => Rule.required().integer(),
    },
    {
      name: 'twoDay',
      title: 'Two day',
      type: 'number',
      fieldset: 'shipping',
      validation: (Rule) => Rule.required().integer(),
    },
    {
      name: 'overnight',
      title: 'Overnight',
      type: 'number',
      fieldset: 'shipping',
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
