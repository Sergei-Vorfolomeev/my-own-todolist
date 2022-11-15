import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    callBack: (newTitle: string) => void
    title: string
}

const EditableSpan = (props: EditableSpanPropsType) => {
    let [updateTitle, setUpdateTitle] = useState(props.title)
    const [edit, setEdit] = useState(false)

    const addTaskHandler = () => {
           props.callBack(updateTitle)
    }
    const onDoubleClickHandler = () => {
        setEdit(!edit)
        edit && addTaskHandler()
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }
    return (
        edit
            ? <input
                value={updateTitle}
                autoFocus
                onBlur={onDoubleClickHandler}
                onChange={onChangeHandler}
                />
            : <span onDoubleClick={onDoubleClickHandler} >{props.title}</span>
    );
};

export default EditableSpan;