import React, {CSSProperties, FC, useState} from "react";
import {observer} from "mobx-react-lite";
import Button, {ButtonProps} from "./Button";
import TextField from "./TextField";
import TextControlVM from "../viewModels/TextControlVM";

export interface TextControlProps {
    viewModel:  TextControlVM;
    buttons:	ButtonProps[]
    style?: 	CSSProperties
}

export const TextControl: FC<TextControlProps> = observer(({viewModel, buttons,style}) => {

    const [leftButtons, rightButtons] = buttons.reduce<[React.ReactNode[], React.ReactNode[]]>(
        ([left, right], button) => {
            if (button.side === 'left') {
                return [[...left, <Button text={button.text} handler={button.handler} key={button.text} />], right]
            } else {
                return [left, [...right, <Button text={button.text} handler={button.handler} key={button.text} />]]
            }
        },[[],[]]
    )

    return <div style={style}>
        {leftButtons}
        <TextField value={viewModel.text} onChange={viewModel.onTextChange} />
        {rightButtons}
    </div>

})