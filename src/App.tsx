import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValueType = 'all' | 'completed' | 'active';

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {


    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        tasksObj[todolistId] = tasks.filter(s => s.id != id);
        setTasks({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];
        tasksObj[todolistId] = [task, ...tasks];
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find((t) => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    function changeFilter(value: FilterValueType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'}
    ]);

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'Css', isDone: true},
            {id: v1(), title: 'Js', isDone: true},
            {id: v1(), title: 'ReactJs', isDone: false},
            {id: v1(), title: 'Rest Api', isDone: false},
            {id: v1(), title: 'GraphQl', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'house', isDone: false},
            {id: v1(), title: 'car', isDone: true}
        ]
    });


    return (
        <div className="App">
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(s => s.isDone)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(s => !s.isDone)
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
