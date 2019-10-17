import React from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar } from 'antd';


class FavoriteMovies extends React.Component {
    state = {
    };
    componentDidMount() {
        let oldItems = JSON.parse(localStorage.getItem('testObjectD'));
        this.setState({
            movies: oldItems,
        });
    };
    deleteFavorite = (id) => {
        this.setState({
            movies: [...this.state.movies.filter((item) => item.imdbID !== id)]
        })

        const newMoviesList = this.state.movies;
        localStorage.setItem('testObjectD', JSON.stringify(newMoviesList));


        console.log(newMoviesList.length);
    }

    render() {
        return (
            this.state.movies ?
            <List
                itemLayout="horizontal"
                dataSource={this.state.movies}
                renderItem={item => (
                    <List.Item  actions={[<Link to={`/movies/${item.imdbID}`}>Detail</Link>, <span onClick={this.deleteFavorite.bind(this, item.imdbID)}>x</span>]}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.Poster} />}
                            title={<a href="https://ant.design">{item.Title}</a>}
                            description={item.Year}
                        />
                    </List.Item>
                )}
            /> : <h1>No data</h1>
        );
    }
}


export default FavoriteMovies;
