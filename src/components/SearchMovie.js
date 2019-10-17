import React from 'react';
import axios from "axios/index";
import { Input } from 'antd';

const { Search } = Input;


class SearchMovie extends React.Component {
    state = {
        title: '',
        movies: {}
    };

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    onSubmit = (e) => {
        e.preventDefault();
        /*this.props.searchMovies(this.state.title);
        this.setState({title: ''})*/
        const value =  this.state.title;
        axios.get(`http://www.omdbapi.com/?s=${value}&apikey=cc45b81`).then(res => {
            const movies = res.data;
            this.setState({ movies });
            this.props.searchMovies(this.state.movies.Search);
            /*var retrievedObject = localStorage.getItem('testObject');

            console.log(JSON.parse(retrievedObject));*/



        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
                <Search placeholder="input search text" name="title" onChange={this.onChange} value={this.state.title} enterButton />
                {/*<input type="text" name="title" style={{flex: '10'}} value={this.state.title} onChange={this.onChange} placeholder="Add todo ..."/>
                <button type="sumit" className="btn" style={{flex: '1', padding: '10px'}}>Submit</button>*/}
            </form>
        )
    }
}
export default SearchMovie;
