import { MdSettings } from 'react-icons/md'

export default {
  name: 'config',
  title: 'Config',
  type: 'document',
  icon: MdSettings,
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
