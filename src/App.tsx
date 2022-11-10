import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type DataType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: DataType[]
}

function App() {

    let todolistsID1 = v1()
    let todolistsID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: todolistsID1, title: 'What to learn', filter: 'all'},
            {id: todolistsID2, title: 'What to buy', filter: 'all'},
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
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Redux", isDone: false},
                {id: v1(), title: "Typescript", isDone: false},
                {id: v1(), title: "Angular", isDone: false},
            ],
        }
    )

    const removeTask = (todolistsID: string, taskID: string) => {
        setTasks({...tasks, [todolistsID]: tasks[todolistsID].filter(el => el.id !== taskID)})
    }
    const addTask = (todolistsID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistsID]: [newTask, ...tasks[todolistsID]]})
    }
    const changeCheckBoxValue = (todolistsID: string, taskID: string, checkBoxValue: boolean) => {
        setTasks({...tasks, [todolistsID]:tasks[todolistsID].map(el => el.id === taskID ? {...el, isDone: checkBoxValue} : el)})
    }
    const changeFilter = (todolistsID: string, filterValue: FilterValueType) => {
        setTodolists(todolists.map(el => el.id === todolistsID ? {...el, filter: filterValue} : el))
    }

    return (
        <div className="App">
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id]
                if (el.filter === 'active') tasksForTodolist = tasks[el.id].filter(el => !el.isDone)
                if (el.filter === 'completed') tasksForTodolist = tasks[el.id].filter(el => el.isDone)
                return (
                    <Todolist
                        key={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeCheckBoxValue={changeCheckBoxValue}
                        changeFilter={changeFilter}
                        filter={el.filter}
                        todolistsID={el.id}
                    />
                )
            })}
        </div>
    );
}

export default App;
