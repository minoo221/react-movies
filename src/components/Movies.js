import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { List, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

class Movies extends React.Component {
    state = {
        loading: false,
        hasMore: true,
    };

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
                <List.Item  actions={[<Link to={`/${item.imdbID}`}>Detail</Link>]}>
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
