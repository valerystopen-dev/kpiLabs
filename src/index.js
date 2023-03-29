import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import {Header} from "./Header/Header";

import {App} from "./App";

ReactDOM.render(
    (<div>
    <Header/>
    <App />
    </div>),
    document.getElementById('root')
);

