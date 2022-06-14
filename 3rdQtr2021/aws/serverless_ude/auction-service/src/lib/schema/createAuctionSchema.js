const schema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
      },
      requried: ['title']
    }
  },
  requried: ['body']
}

export default schema;