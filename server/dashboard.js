export default {
  widgets: [
    {
      name: 'netlify',
      options: {
        title: 'Deploy website',
        sites: [
          {
            title: 'dev.touchephotography.com',
            apiId: process.env.NETLIFY_API_ID,
            buildHookId: process.env.NETLIFY_BUILD_HOOK_ID,
            name: process.env.NETLIFY_WEBSITE_NAME,
          },
        ],
      },
    },
  ],
}
