import React from "react";
import "./App.css";
import {AutoComplete} from "./components/AutoComplete";
import {TextControl} from "./components/TextControl";
import TextControlVM from "./viewModels/TextControlVM";

function App() {

  const TextControlVM1 = new TextControlVM();
  const TextControlVM2 = new TextControlVM();

  return <div style={{margin: 20}}>

    <h2>Контрол с кнопками</h2>
    <TextControl
        viewModel = {TextControlVM1}
        buttons = {[{
          text: 'Очистить',
          handler: TextControlVM1.onClearText
        }, {
          text: 'Заменить на "Hello world!"',
          handler: TextControlVM1.onHelloWorld
        }]}
        style = {{marginBottom: 16}}
    />
    <TextControl
        viewModel = {TextControlVM2}
        buttons = {[{
          text: 'Показать значение, если оно число',
          side: 'left',
          handler: TextControlVM2.onAlertIfNumber
        }, {
          text: 'Показать значение',
          side: 'right',
          handler: TextControlVM2.onAlertText
        }]}
        style = {{marginBottom: 16}}
    />

    <h2>Контрол-автокомплит</h2>
    <AutoComplete
        maxTipsCount = {3}
        style = {{marginBottom: 16}}
    />
    <AutoComplete
        maxTipsCount = {10}
    />
  </div>
}

export default App;
