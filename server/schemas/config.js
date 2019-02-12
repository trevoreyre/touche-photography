import { FiSettings as IconSettings } from 'react-icons/fi'

export default {
  name: 'config',
  title: 'Config',
  type: 'document',
  icon: IconSettings,
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'purchaseOptions',
      title: 'Purchase Options',
      type: 'array',
      of: [{ type: 'purchaseOption' }]
    }
  ]
}
