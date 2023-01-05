import {createId, Task} from "./plannerSlice";

let count = 0

export const fetchTaskList = (): Promise<{data: Task[]}> => {
  return new Promise<{ data: Task[] }>((resolve, reject) => {
    count++
    setTimeout(() => {
      if (count % 2 === 0) {
        reject(Error('an error occurred while loading'))
      }
      resolve({
        data: [
          {id: createId(), name: 'sports gym', date: '2022-01-08T11:00'},
          {id: createId(), name: 'english lesson', date: '2022-01-08T15:00'}
        ]
      })
    }, 2000)

  })
}
