//TodoList.js
import React, { Component } from 'react';
import Todo from './Todo';
import style from './style';

class TodoList extends Component {
    render() {
        let todoNodes = this.props.data.map(todo => {
            return (
                <Todo 
                    uniqueID={ todo['_id'] }
                    onTodoDelete={ this.props.onTodoDelete }
                    onTodoUpdate={ this.props.onTodoUpdate } 
                    key={ todo['_id'] }>
                        { todo.text }
            </Todo>
            )
        })
        
        return (
            <div style={ style.todoList }>
                { todoNodes }
            </div>
        )
    }
}

export default TodoList;