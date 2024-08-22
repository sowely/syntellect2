
import React, {CSSProperties, FC, useState} from "react";
import {observer} from "mobx-react-lite";
import TextField from "./TextField";
import AutoCompleteVM from "../viewModels/AutoCompleteVM";

export interface AutoCompleteProps {
    maxTipsCount: 	number
    style?:			CSSProperties
}

export const AutoComplete: FC<AutoCompleteProps> = observer(({maxTipsCount, style}) => {

    const [viewModel] = useState(() => new AutoCompleteVM(maxTipsCount));

    return <div style={style}>
        <TextField value={viewModel.searchText} onChange={viewModel.onSearchTextChange} placeholder={'Поиск...'}/>
        {
            viewModel.searchText && viewModel.countries &&
            viewModel.countries.slice(0, maxTipsCount).map((country) => <div
                    key		= {country.name}
                    onClick	= {() => {viewModel.onTipClick(country.name)}}
                    style	= {{width: 'max-content', textAlign: 'center',padding: 5, background: 'powderblue', border: '1px black solid', cursor: 'pointer'}}
                >
                    { country.name }, { country.fullName }
                    <img
                        style = {{width: 20, marginLeft: 10}}
                        src	= {country.flag}
                        alt = {country.name}
                    />
                </div>
            )
        }
    </div>
})