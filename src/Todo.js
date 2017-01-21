//Todo.js
import React, { Component } from 'react';
import style from './style';
import marked from 'marked';

class Todo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            toBeUpdated: false, 
            text: ''
        };

        this.deleteTodo = this.deleteTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTodoUpdate = this.handleTodoUpdate.bind(this);
    }
    
    deleteTodo(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        this.props.onTodoDelete(id);
        console.log('Deleted todo');
    }

    updateTodo(e) {
        e.preventDefault();
        this.setState({ toBeUpdated: !this.state.toBeUpdated });
    }

    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }

    handleTodoUpdate(e) {
        e.preventDefault();
        let id = this.props.uniqueID;

        let text = (this.state.text) ? this.state.text : null;
        let todo = { text: text };

        this.props.onTodoUpdate(id, todo);
        this.setState({
            toBeUpdated: !this.state.toBeUpdated,
            text: ''
        })
    }
    
    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }

    render() {
        return (
            <div style={ style.todo }>
                <span dangerouslySetInnerHTML={ this.rawMarkup() } />
                <a style={ style.updateLink }  href='#' onClick={ this.updateTodo }>Update</a>
                <a style={ style.deleteLink }  href='#' onClick={ this.deleteTodo }>Delete</a>
                {
                    (this.state.toBeUpdated) ? (<form onSubmit={ this.handleTodoUpdate }>
                                                <input 
                                                    type='text'
                                                    placeholder='Update comment'
                                                    style={ style.todoFormText }
                                                    value={ this.state.text }
                                                    onChange={ this.handleTextChange }/>
                                                <input 
                                                    type='submit'
                                                    style={ style.todoFormPost }
                                                    value='Update'/>
                                            </form>)
                : null} 
            </div>
        )
    }
}
export default Todo;