export const todosSchema = {
  type: 'array',
  items: {
    schema: {
      $ref: '#/schemas/todo'
    }
  }
}
