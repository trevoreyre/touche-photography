export default {
  name: 'imageBlock',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
    storeOriginalFilename: false,
  },
  fields: [
    {
      name: 'alt',
      title: 'Alternative text',
      description: 'Brief description of the image',
      type: 'string',
      options: {
        isHighlighted: true,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'alt',
    },
  },
}
