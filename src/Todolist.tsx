import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './App';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey && event.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    };


    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('')
    };

    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(s => {
                        const onRemoveHandler = () => {
                            props.removeTask(s.id)
                        };
                        return <li key={s.id}><input type="checkbox" checked={s.isDone}/><span>{s.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>all</button>
                <button onClick={onActiveClickHandler}>active</button>
                <button onClick={onCompletedClickHandler}>completed</button>
            </div>
        </div>
    );
}
