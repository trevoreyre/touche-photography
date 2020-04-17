import { FiImage as IconPhoto } from 'react-icons/fi'

export default {
  name: 'photo',
  title: 'Photo',
  type: 'document',
  icon: IconPhoto,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
        storeOriginalFilename: false,
      },
      validation: Rule => Rule.required()
    }
  ]
}
