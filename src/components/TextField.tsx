import React, {ChangeEvent, FC} from "react";
import {observer} from "mobx-react-lite";

export interface TextFieldProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

const TextField: FC<TextFieldProps> = observer(({value, onChange, placeholder}) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        onChange(value);
    }

    return <input placeholder={placeholder} value={value} onChange={handleChange}/>
})

export default TextField