import React, {ChangeEvent} from 'react';
import {FilterValueType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: ( taskId: string, todolistId: string ) => void
    changeFilter: ( value: FilterValueType, todolistId: string ) => void
    addTask: ( title: string, todolistId: string ) => void
    changeTaskStatus: ( taskId: string, isDone: boolean, todolistId: string ) => void
    changeTaskTitle: ( taskId: string, newTitle: string, todolistId: string ) => void
    changeTodolistTitle: ( id: string, newTitle: string ) => void
    filter: FilterValueType
    removeTodolist: ( todolistId: string ) => void
}

export function Todolist( props: PropsType ) {


    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    };
    const addTask = ( title: string ) => {
        props.addTask(title, props.id);
    };

    const changeTodolistTitle = ( newTitle: string ) => {
        props.changeTodolistTitle(props.id, newTitle)
    };

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(s => {

                        const onRemoveHandler = () => {
                            props.removeTask(s.id, props.id)
                        };
                        const onChangeStatusHandler = ( event: ChangeEvent<HTMLInputElement> ) => {
                            let newIsDoneValue = event.currentTarget.checked;
                            props.changeTaskStatus(s.id, newIsDoneValue, props.id);
                        };
                        const onChangeTitleHandler = ( newValue: string ) => {
                            props.changeTaskTitle(s.id, newValue, props.id);
                        };

                        return (
                            <li className={s.isDone ? 'is-done' : ''} key={s.id}>
                                <input type="checkbox" onChange={onChangeStatusHandler} checked={s.isDone}/>
                                <EditableSpan title={s.title} onChange={onChangeTitleHandler}/>
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

