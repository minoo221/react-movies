import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Movies from './components/Movies';
import SearchMovie from './components/SearchMovie';
import Header from './components/pages/Header';
import Favorite from './components/layout/FavoriteMovies';
import MovieDetail from './components/layout/MovieDetail';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import './App.css';



class App extends React.Component {
    state = {
        movies: [],
        loading: false
    };

    componentDidMount() {
    }
    deleteItem = (id) => {
        this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]})
    };
    searchMovies = (movies) => {
        this.setState({
            loading: false,
            movies: movies
        })
    };

    render() {
        return (
            <Router>
            <div className="App">
                <div className="container">
                    <Header />
                    <Route exact path="/" render={props => (
                        <React.Fragment>
                            <SearchMovie searchMovies={this.searchMovies} />
                            {this.state.loading ? <Spin size="large" /> : <Movies movies={this.state.movies} deleteItem={this.deleteItem}/>}
                        </React.Fragment>
                    )} />
                    <Route path="/favorite" component={Favorite} />
                    <Route exact path="/movies/:imdbID" component={MovieDetail} id={this.state.movies.imdbID} />
                </div>
            </div>
            </Router>
        );
    }
}

export default App;
