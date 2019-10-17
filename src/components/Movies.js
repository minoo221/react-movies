import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';


class Movies extends React.Component {
    state = {
        loading: false,
        hasMore: true,
        moviesF: [],
    };
    componentDidMount() {
        if (localStorage.getItem("testObjectD") !== null ) {
            let oldItems = JSON.parse(localStorage.getItem('testObjectD'));
            /*this.setState({moviesF: newItem});*/
            /*localStorage.setItem('testObjectD', JSON.stringify(this.props.movies.find(({imdbID}) => imdbID === val )));*/
            this.setState({
                moviesF: oldItems,
            });
        }
    }
    handleInfiniteOnLoad = () => {
        let data = this.props.movies;
        this.setState({
            loading: true,
        });
        if (data.length > 3) {
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.fetchData(res => {
            data = data.concat(res.results);
            this.setState({
                data,
                loading: false,
            });
        });
    };

    addFavorite = (e) => {
        e.preventDefault();
        const val = e.target.dataset.value,
            newItem = this.props.movies.find(({imdbID}) => imdbID === val ),
            movies = this.state.moviesF.slice(0)

            movies.push(newItem);
            this.setState({
                moviesF: movies,
            });
            localStorage.setItem('testObjectD', JSON.stringify(movies));
    };

    render() {
        return (
        <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}
        >
        <List
            itemLayout="horizontal"
            dataSource={this.props.movies}
            renderItem={item => (
                <List.Item  actions={[<Link to={`/movies/${item.imdbID}`}>Detail</Link>, <span data-value={item.imdbID} onClick={this.addFavorite}>favorite</span>]}>
                    <List.Item.Meta
                        avatar={<Avatar src={item.Poster} />}
                        title={<a href="https://ant.design">{item.Title}</a>}
                        description={item.Year}
                    />
                </List.Item>
            )}
        />
        </InfiniteScroll>
        )
    }
}

Movies.propTypes = {
    movies: PropTypes.array.isRequired,
}

export default Movies;
