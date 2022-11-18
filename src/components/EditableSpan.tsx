import React, {ChangeEvent,KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    oldTitle: string
    callBack: (newTitle:string) => void
}

export const EditableSpan = (props:EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)

    const transformSpan = () => {
        setEdit(!edit)
        edit && addEditTaskCallBack()
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addEditTaskCallBack = () => {
        props.callBack(newTitle)
    }
    const onEnterHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            transformSpan()
        }
    }

    return (
        edit
            ? <input value={newTitle}
                     autoFocus
                     onBlur={transformSpan}
                     onChange={onChangeHandler}
                     onKeyDown={onEnterHandler}
            />
            : <span onDoubleClick={transformSpan}>{props.oldTitle}</span>
    );
};

