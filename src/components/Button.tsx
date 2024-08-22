import React, {FC, MouseEventHandler} from "react";
import {observer} from "mobx-react-lite";

export interface ButtonProps {
    text:     string
    handler:  MouseEventHandler<HTMLButtonElement> // TODO
    side?:    'left' | 'right'
}

const Button: FC<ButtonProps> = observer(({text, handler}) => {
    return <button onClick={handler}>{text}</button>
})

export default Button