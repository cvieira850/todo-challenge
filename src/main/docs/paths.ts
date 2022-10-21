import {
  todoPath,
  todoByIdPath
} from './paths/'

export default {
  '/todos': todoPath,
  '/todos/{todoId}': todoByIdPath
}
