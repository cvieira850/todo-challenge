export const todoPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Todo'],
    operationId: 'post',
    summary: 'API to register a new todo',
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
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Todo'],
    operationId: 'get',
    summary: 'API to load todos',
    requestBody: {
      description: 'API to load todos'
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/todos'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/forbidden'
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
