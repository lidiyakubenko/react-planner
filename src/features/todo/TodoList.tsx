import React, {useEffect, useState} from 'react'
import {useAppSelector, useAppDispatch} from "../../app/hooks";
import {
  selectTodo,
  addTodo,
  removeTodo,
  selectStatus,
  selectError,
  getTodoListAsync
} from "./todoSlice";
import styles from './TodoList.module.css'

export function TodoList() {
  const dispatch = useAppDispatch()
  const todoList = useAppSelector(selectTodo)
  const status = useAppSelector(selectStatus)
  const error = useAppSelector(selectError)

  const [name, setName] = useState('')
  const [inputError, setInputError] = useState('')

  const onClickAddTodoBtn = () => {
    if (name) {
      dispatch(addTodo(name))
      setName('')
    } else {
      setInputError('required')
    }
  }

  useEffect(() => {
    setInputError('')
  }, [name])

  return (
    <div className={styles.container}>
      <h2>Todo list</h2>
      <button
        className={styles.button}
        onClick={() => dispatch(getTodoListAsync())}
        disabled={status === 'loading'}>
        update list
      </button>
      <ul>{
        status === 'idle' ? todoList.map(item => (
          <li key={item.id}>{item.name}
            <button className={styles.button} onClick={() => dispatch(removeTodo(item.id))}>remove</button>
          </li>
        )) : status === 'loading' ? <div>loading...</div> : <div className={styles.error}>{error}</div>
      }
      </ul>

      <input className={styles.input} type="text" value={name} onChange={event => setName(event.target.value)}/>
      <div className={styles.error}>{inputError}</div>
      <button onClick={onClickAddTodoBtn} className={styles.button}>add todo</button>
    </div>)
}
