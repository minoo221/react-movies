import React from 'react';
import Todo from './Todo';
import PropTypes from 'prop-types'

class Todos extends React.Component {
    render() {
        return this.props.todos.map((todo) => (
            <Todo key={todo.id} todo={todo} markComplete={this.props.markComplete} deleteItem={this.props.deleteItem}/>
        ));
    }
}

Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired
}

export default Todos;
