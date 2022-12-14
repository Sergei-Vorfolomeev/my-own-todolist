import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "../App";
import {Input} from "./Input";
import {EditableSpan} from "./EditableSpan";

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: TaskPropsType[]
    removeTask: (todolistID: string, taskID: string) => void
    addTask: (todolistID: string, newTitle: string) => void
    changeFilter: (todolistID: string, filterValue: FilterValueType) => void
    changeCheckBox: (todolistID: string, taskID: string, checkBoxValue: boolean) => void
    removeTodolist: (todolistID: string) => void
    addEditedTask: (todolistID: string, taskID: string, newTitle:string) => void
    addEditedTitleOfTodolist: (todolistID: string, newTitle:string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const removeTaskHandler = (taskID: string) => {
        props.removeTask(props.todolistID, taskID)
    }
    const filterHandler = (filterValue: FilterValueType) => {
        props.changeFilter(props.todolistID, filterValue)
    }
    const onChangeCheckBoxHandler = (taskID: string, checkBoxValue: boolean) => {
        props.changeCheckBox(props.todolistID, taskID, checkBoxValue)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist (props.todolistID)
    }

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} callBack={(newTitle) => props.addEditedTitleOfTodolist(props.todolistID, newTitle)}/>
                <button onClick={removeTodolistHandler}>Del</button>
            </h3>
            <div>
                <Input
                    callBack={(newTitle) => props.addTask(props.todolistID, newTitle)}
                    placeholder={'Type new task'}
                />
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li key={el.id}>
                            <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={(event) => onChangeCheckBoxHandler(el.id, event.currentTarget.checked)}
                            />
                            <EditableSpan
                                oldTitle={el.title}
                                callBack={(newTitle:string)=>props.addEditedTask(props.todolistID, el.id, newTitle)}
                            />
                            <button onClick={() => removeTaskHandler(el.id)}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => filterHandler('all')}>All</button>
                <button onClick={() => filterHandler('active')}>Active</button>
                <button onClick={() => filterHandler('completed')}>Completed</button>
            </div>
        </div>
    );
};