import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {Input} from "./components/Input";


export type FilterValueType = 'all' | 'active' | 'completed'

type TodolistsType = {
    id: string
    title: string
    filter: FilterValueType
}
type TasksStateType = {
    [key: string]: TaskPropsType[]
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

    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)})
    }
    const addTask = (todolistID: string, newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const changeFilter = (todolistID: string, filterValue: FilterValueType) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: filterValue} : el))
    }
    const changeCheckBox = (todolistID: string, taskID: string, checkBoxValue: boolean) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, isDone: checkBoxValue} : el)
        })
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
    }
    const addTodolist = (newTitle: string) => {
        const newTodoID = v1()
        const newTodo: TodolistsType = {id: newTodoID, title: newTitle, filter: 'all'}
        setTodolists([newTodo, ...todolists])
        setTasks({...tasks, [newTodoID]:[]})
    }

    return (
        <div className="App">
            <Input placeholder={'Type new todolist'} callBack={addTodolist}/>
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id]
                if (el.filter === 'active') {
                    tasksForTodolist = tasks[el.id].filter(el => !el.isDone)
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = tasks[el.id].filter(el => el.isDone)
                }
                return (
                    <Todolist
                        key={el.id}
                        todolistID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeCheckBox={changeCheckBox}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
