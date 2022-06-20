import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './App';


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle('')
        } else {
            setError('Title is required');
        }
    };

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.charCode === 13) {
            addTask();
        }
    };


    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTodolist = () => { props.removeTodolist(props.id)};

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(s => {

                        const onRemoveHandler = () => {
                            props.removeTask(s.id, props.id)
                        };
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(s.id, event.currentTarget.checked, props.id);
                        }

                        return (
                            <li className={s.isDone ? 'is-done' : ''} key={s.id}>
                                <input type="checkbox" onChange={onChangeHandler} checked={s.isDone}/>
                                <span>{s.title}</span>
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>all
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>completed
                </button>
            </div>
        </div>
    );
}
