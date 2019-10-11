import React from 'react';
import axios from "axios/index";

class AddTodo extends React.Component {
    state = {
        title: '',
        todos: {}
    };

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    onSubmit = (e) => {
        e.preventDefault();
        /*this.props.searchMovies(this.state.title);
        this.setState({title: ''})*/
        const value =  this.state.title;
        axios.get(`http://www.omdbapi.com/?s=${value}&apikey=cc45b81`).then(res => {
            const todos = res.data;
                console.log(this.state.todos.Search);
            this.setState({ todos });
            this.props.searchMovies(this.state.todos.Search);
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
                <input type="text" name="title" style={{flex: '10'}} value={this.state.title} onChange={this.onChange} placeholder="Add todo ..."/>
                <button type="sumit" className="btn" style={{flex: '1', padding: '10px'}}>Submit</button>
            </form>
        )
    }
}
export default AddTodo;
