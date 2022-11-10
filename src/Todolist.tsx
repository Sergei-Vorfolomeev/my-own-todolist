import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {DataType, FilterValueType} from "./App";
import styles from './Todolist.module.css'

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: DataType[]
    removeTask: (todolistsID: string, taskID: string) => void
    addTask: (todolistsID: string, title: string) => void
    changeCheckBoxValue: (todolistsID: string, taskID: string, checkBoxValue: boolean) => void
    changeFilter: (todolistsID: string, filterValue: FilterValueType) => void
    filter: FilterValueType
    todolistsID: string
}

export const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>('')

    const removeTaskHandler = (taskID: string) => {
        props.removeTask(props.todolistsID, taskID)
    }
    const addTasksHandler = () => {
        if (title !== ''){
            props.addTask(props.todolistsID, title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError('')
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addTask(props.todolistsID, title.trim())
            setTitle('')
        }
    }
    const onChangeCheckBoxHandler = (taskID: string, checkBoxValue: boolean) => {
        props.changeCheckBoxValue(props.todolistsID, taskID, checkBoxValue)
    }
    const onClickFilter = (filterValue: FilterValueType) => {
        props.changeFilter(props.todolistsID, filterValue)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTasksHandler}>+</button>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id} className={el.isDone === true ? styles.isDone : ''}>
                            <input
                                onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeCheckBoxHandler(el.id, event.currentTarget.checked)}
                                type="checkbox"
                                checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={() => removeTaskHandler(el.id)}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? styles.activeFilter : ''} onClick={() => onClickFilter('all')}>All</button>
                <button className={props.filter === 'active' ? styles.activeFilter : ''} onClick={() => onClickFilter('active')}>Active</button>
                <button className={props.filter === 'completed' ? styles.activeFilter : ''} onClick={() => onClickFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}