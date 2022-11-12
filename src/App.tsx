import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {inspect} from "util";
import styles from './Todolist.module.css'

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: DataTasks[]
}
export type DataTasks = {
    id: string
    title: string
    isDone: boolean
}

function App() {

    let todolistsID1 = v1()
    let todolistsID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: todolistsID1, title: 'What to learn?', filter: 'all'},
            {id: todolistsID2, title: 'What to buy?', filter: 'all'},
        ]
    )

    const [tasks, setTasks] = useState<TasksStateType>({
            [todolistsID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Redux", isDone: false},
                {id: v1(), title: "Typescript", isDone: false},
                {id: v1(), title: "Angular", isDone: false},
            ],
            [todolistsID2]: [
                {id: v1(), title: "Water", isDone: true},
                {id: v1(), title: "Apples", isDone: true},
                {id: v1(), title: "Oranges", isDone: false},
                {id: v1(), title: "Kiwis", isDone: false},
                {id: v1(), title: "Bananas", isDone: false},
                {id: v1(), title: "Limes", isDone: false},
            ],
        })
    const removeTask = (todolistsID: string, taskID: string) => {
        setTasks({...tasks, [todolistsID]: tasks[todolistsID].filter(el => el.id !== taskID)})
    }
    const addTask = (todolistsID: string, newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todolistsID]: [newTask, ...tasks[todolistsID]]})
    }
    const changeFilter = (todolistsID: string, filterValue: FilterValueType) => {
        setTodolists(todolists.map(el => el.id === todolistsID ? {...el, filter: filterValue} : el))
    }
    const changeCheckBox = (todolistsID: string, taskID:string, checkBoxValue: boolean) => {
        setTasks({...tasks, [todolistsID]: tasks[todolistsID].map(el => el.id === taskID ? {...el, isDone: checkBoxValue} : el)})
    }
    const deleteTodolist = (todolistsID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistsID))
    }
    const flipTasks = (todolistsID: string) => {
        setTasks({...tasks, [todolistsID]:tasks[todolistsID].reverse()})
    }

    return (
        <div className="App">
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id]
                if (el.filter === 'active') {
                    tasksForTodolist = tasks[el.id].filter(el => !el.isDone)
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = tasks[el.id].filter(el => el.isDone)
                }
                return (
                    <div className={styles.todolist}>
                    <Todolist
                        key={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        todolistsID={el.id}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeCheckBox={changeCheckBox}
                        flipTasks={flipTasks}
                        filter={el.filter}
                        deleteTodolist={deleteTodolist}
                    />
                    </div>
                )
            })}
        </div>
    );
}

export default App;
