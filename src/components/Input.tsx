import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type InputPropsType = {
    callBack: (newTitle: string) => void
    placeholder: string
}

export const Input = (props: InputPropsType) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTitle(e.currentTarget.value)
    }
    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTaskHandler()
    }
    const addTaskHandler = () => {
        if (newTitle !== '') {
            props.callBack(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <input
                value={newTitle}
                placeholder={props.placeholder}
                onChange={onChangeInputHandler}
                onKeyDown={onEnterHandler}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div>{error}</div>}
        </div>
    );
};

