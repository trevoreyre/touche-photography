import { MdPhotoLibrary } from 'react-icons/md'

export default {
  name: 'photo',
  title: 'Photo',
  type: 'document',
  icon: MdPhotoLibrary,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
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
      of: [
        {
          type: 'string'
        }
      ],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: Rule => Rule.required()
    }
  ]
}
