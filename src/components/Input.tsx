import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "../Todolist.module.css";

type InputPropsType = {
    callBack: (todolistsID: string, newTitle: string) => void
    todolistsID: string
}

export const Input = (props:InputPropsType) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
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
    const addTaskHandler = () => {
        if (newTitle !== '') {
            props.callBack(props.todolistsID, newTitle)
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <input
                placeholder={'Type new task'}
                className={error ? styles.error : ''}
                value={newTitle}
                onChange={onChangeInputHandler}
                onKeyDown={onEnterHandler}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

