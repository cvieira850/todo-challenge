export const todoParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    weight: {
      type: 'number'
    }
  },
  required: ['name', 'weight']
}
