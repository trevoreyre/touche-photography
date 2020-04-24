import SizesInput from '../components/SizesInput'

export default {
  name: 'shippingMethod',
  title: 'Shipping Method',
  type: 'document',
  fields: [
    {
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'deliveryTime',
      title: 'Delivery Time',
      description: 'Number of days',
      type: 'number',
      validation: (Rule) => Rule.required().integer(),
    },
    {
      name: 'rates',
      title: 'Rates',
      type: 'array',
      options: { editModal: 'modal' },
      of: [
        {
          name: 'rate',
          title: 'Rate',
          type: 'object',
          fields: [
            {
              name: 'rate',
              title: 'Rate',
              type: 'number',
              validation: (Rule) => Rule.integer(),
            },
            {
              name: 'sizes',
              title: 'Sizes',
              type: 'array',
              of: [{ type: 'string' }],
              inputComponent: SizesInput
            },
          ],
          preview: {
            select: {
              rate: 'rate',
            },
            prepare({ rate }) {
              return {
                title: rate,
                subtitle: '',
              }
            },
          },

        },
      ],
    },
    // {
    //   name: 'rates',
    //   title: 'Rates',
    //   type: 'array',
    //   options: { editModal: 'modal' },
    //   of: [{ type: 'shippingRate' }],
    // },
  ],
}
