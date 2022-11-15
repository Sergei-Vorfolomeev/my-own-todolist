import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from './Todolist.module.css'
import {DataTasks, FilterValueType, TasksStateType} from "./App";
import {Input} from "./components/Input";
import EditableSpan from "./components/EditableSpan";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    tasks: DataTasks[]
    todolistsID: string
    removeTask: (todolistsID: string, taskID: string) => void
    addTask: (todolistsID: string, newTitle: string) => void
    changeFilter: (todolistsID: string, filterValue: FilterValueType) => void
    changeCheckBox: (todolistsID: string, taskID: string, checkBoxValue: boolean) => void
    flipTasks: (todolistsID: string) => void
    filter: FilterValueType
    deleteTodolist: (todolistsID: string) => void
    updateTask: (todolistsID: string, taskID: string, updateTitle: string) => void
    updateTodolist: (todolistsID: string, updateTitle: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onClickRemoveTaskHandler = (taskID: string) => {
        props.removeTask(props.todolistsID, taskID)
    }
    const addTaskHandler = () => {
        if (newTitle !== '') {
            props.addTask(props.todolistsID, newTitle)
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError(null)
    }
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTitle !== '') {
            addTaskHandler()
        } else {
            setError('Title is required')
        }
    }
    const onClickFilterHandler = (filterValue: FilterValueType) => {
        props.changeFilter(props.todolistsID, filterValue)
    }
    const onChangeCheckBoxHandler = (taskID: string, checkBoxValue: boolean) => {
        props.changeCheckBox(props.todolistsID, taskID, checkBoxValue)
    }
    const deleteTodolistHandler = () => {
        props.deleteTodolist(props.todolistsID)
    }
    const flipTasksHandler = () => {
        props.flipTasks(props.todolistsID)
    }
    const updateTodolistHandler = (updateTitle: string) => {
        props.updateTodolist(props.todolistsID, updateTitle)
    }
    const updateTaskHandler = (taskID: string, updateTitle: string) => {
        props.updateTask(props.todolistsID, taskID, updateTitle)
    }

    return (
        <div>
            <h3 className={styles.title}>
                <EditableSpan callBack={updateTodolistHandler} title={props.title}/>
                <button onClick={deleteTodolistHandler}>Del</button>
            </h3>
            {/*<Input callBack={props.addTask} todolistsID={props.todolistsID}/>*/}
            <div>
                <input
                    placeholder={'Type new task'}
                    className={error ? styles.error : ''}
                    value={newTitle}
                    onChange={onChangeInputHandler}
                    onKeyDown={onEnterHandler}
                />
                <button onClick={addTaskHandler}>+</button>
                <button onClick={flipTasksHandler}>Flip</button>
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id}
                            className={el.isDone ? styles.isDone : ''}>
                            <input
                                onChange={(e) => onChangeCheckBoxHandler(el.id, e.currentTarget.checked)}
                                type="checkbox"
                                checked={el.isDone}/>
                            <EditableSpan
                                callBack={(updateTitle) => updateTaskHandler(el.id, updateTitle)}
                                title={el.title}
                            />
                            <button onClick={() => onClickRemoveTaskHandler(el.id)}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div className={styles.title}>
                <button className={props.filter === 'all' ? styles.activeFilter : ''}
                        onClick={() => onClickFilterHandler('all')}>All
                </button>
                <button className={props.filter === 'active' ? styles.activeFilter : ''}
                        onClick={() => onClickFilterHandler('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? styles.activeFilter : ''}
                        onClick={() => onClickFilterHandler('completed')}>Completed
                </button>
            </div>
        </div>
    )
}