import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValueType = 'all' | 'completed' | 'active';

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'Css', isDone: true},
        {id: v1(), title: 'Js', isDone: true},
        {id: v1(), title: 'ReactJs', isDone: false},
        {id: v1(), title: 'Rest Api', isDone: false},
        {id: v1(), title: 'GraphQl', isDone: true}
    ]);

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(s => s.id !== id)
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let newTask = {
            id: v1(), title: title, isDone: false
        }
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find((t) => {
            if (t.id === taskId) {
                return true;
            } else {
                return false;
            }
        })
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);
    }

    function changeFilter(value: FilterValueType, todolistId: string) {
            let todolist = todolists.find(tl => tl.id === todolistId);
            if (todolist) {
                todolist.filter = value;
                setTodolists([...todolists])
            }
    }

    let [todolists, setTodolists] = useState<Array<TodolistType>>( [
        {id: v1(), title: 'What to learn', filter: 'active'},
        {id: v1(), title: 'What to buy', filter: 'completed'}
    ]);


    return (
        <div className="App">
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasks;

                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasks.filter(s => s.isDone)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasks.filter(s => !s.isDone)
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}/>
                })
            }
        </div>
    )
}

export default App;
