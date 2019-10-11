import React from 'react';
import { Descriptions, Spin } from 'antd';
import axios from 'axios'


class MovieDetail extends React.Component {
    state = {
        movie: {}
    };
    componentDidMount() {
        const { match: { params } } = this.props;
        console.log( params.imdbID );
        axios.get(`http://omdbapi.com/?apikey=cc45b81&i=${params.imdbID}`)
            .then(res => {
                const movie = res.data;
                this.setState({
                    loading: false,
                    movie: movie
                })
                console.log( this.state.movie );
            });
    }
    render() {
        return (
            <Descriptions title="Movie Info" bordered>
                <Descriptions.Item label="Title">{this.state.movie.Title}</Descriptions.Item>
                <Descriptions.Item label="Genre">{this.state.movie.Genre}</Descriptions.Item>
                <Descriptions.Item label="Released">{this.state.movie.Released}</Descriptions.Item>
                <Descriptions.Item label="IMDB rating">{this.state.movie.imdbRating}</Descriptions.Item>
                <Descriptions.Item label="Runtime">{this.state.movie.Runtime}</Descriptions.Item>
                <Descriptions.Item label="Country">{this.state.movie.Country}</Descriptions.Item>
                <Descriptions.Item label="Actors" span={3}>
                    {this.state.movie.Actors}
                </Descriptions.Item>
                <Descriptions.Item label="Poster">
                    {this.state.loading ? <Spin size="large" /> :  <img src={this.state.movie.Poster} alt={this.state.movie.Poster}/>}
                </Descriptions.Item>
            </Descriptions>
        );
    }
}


export default MovieDetail;
