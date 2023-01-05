import React, {useEffect, useState} from 'react'
import commonStyles from '../common/common.module.css'
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  addTask,
  selectError,
  selectStatus,
  selectTaskList,
  removeTask
} from './plannerSlice';
import {sagaActions} from './sagaActions'

export function Planner() {
  const dispatch = useAppDispatch()
  const storeTaskList = useAppSelector(selectTaskList)
  const [taskList, setTaskList] = useState(storeTaskList)

  useEffect(() => {
    const preparedTasks = storeTaskList.map(p => ({...p, date: p.date.replace('T', ' ')}))
    setTaskList(preparedTasks)
  }, [storeTaskList])

  const status = useAppSelector(selectStatus)
  const error = useAppSelector(selectError)

  const [date, setDate] = useState('2023-01-01T00:00')
  const [name, setName] = useState('')
  const [inputError, setInputError] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (name) {
      dispatch(addTask({date, name}))
      setName('')
    } else {
      setInputError('required')
    }
  }

  return (
    <form className={commonStyles.container} onSubmit={onSubmit}>
      <h2>Planner</h2>
      <button
        className={commonStyles.button}
        onClick={() => dispatch({type: sagaActions.ADD_TASK})}
        disabled={status === 'loading'}>
        update task list
      </button>
      <ul>{
        status === 'idle' ? taskList.map(item => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>{item.date}</p>
            <button
              className={commonStyles.button}
              onClick={() => dispatch(removeTask(item.id))}>
              remove
            </button>
          </li>
        )) : status === 'loading' ?
          <div>loading...</div> :
          <div className={commonStyles.error}>{error}</div>
      }
      </ul>
      <input
        className={commonStyles.input}
        type="datetime-local"
        name="trip-start"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min="2018-01-01" max="2018-12-31"/>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={commonStyles.input}
      />
      <div className={commonStyles.error}>{inputError}</div>
      <button
        type="submit"
        className={commonStyles.button}
      >
        create task
      </button>
    </form>
  )
}
