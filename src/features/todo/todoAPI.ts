import {createId, TodoItem} from "./todoSlice";

let count = 0

export const fetchTodoList = () => {
  return new Promise<{ data: TodoItem[] }>((resolve, reject) => {
    count++
    setTimeout(() => {
      if (count % 2 === 0) {
        reject(Error('an error occurred while loading'))
      }
      resolve({
        data: [
          {id: createId(), name: 'read the book'},
          {id: createId(), name: 'go grocery shopping'}
        ]
      })
    }, 2000)

  })
}
