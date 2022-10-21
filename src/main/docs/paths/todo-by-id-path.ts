export const todoByIdPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Todo'],
    operationId: 'get',
    summary: 'API to get todo info',
    parameters:
    [
      {
        in: 'path',
        name: 'todoId',
        description: 'todo id to get data',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
          example: 'da35596c-faee-4ddb-8a4c-a3fa27306082'
        }
      }
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/todo'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Todo'],
    operationId: 'put',
    summary: 'API to change todo info',
    parameters:
    [
      {
        in: 'path',
        name: 'todoId',
        description: 'todo id to change data',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
          example: 'da35596c-faee-4ddb-8a4c-a3fa27306082'
        }
      }
    ],
    requestBody: {
      description: 'API to register a new todo',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/todoParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/todo'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Todo'],
    operationId: 'delete',
    summary: 'API to delete todo info',
    parameters:
    [
      {
        in: 'path',
        name: 'todoId',
        description: 'todo id to delete data',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
          example: 'da35596c-faee-4ddb-8a4c-a3fa27306082'
        }
      }
    ],
    responses: {
      201: {
        description: 'Success'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
