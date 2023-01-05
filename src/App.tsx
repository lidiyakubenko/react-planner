import React from 'react';
import './App.css';
import {TodoList} from "./features/todo/TodoList";
import {Planner} from "./features/planner/Planner";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoList/>
        <Planner/>
      </header>
    </div>
  );
}

export default App;
