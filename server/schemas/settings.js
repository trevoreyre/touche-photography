import { FiSettings } from 'react-icons/fi'

export default {
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: FiSettings,
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
}
