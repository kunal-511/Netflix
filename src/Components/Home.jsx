import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiPlay } from "react-icons/bi"
import { AiOutlinePlus } from "react-icons/ai"

const apiKey = "f85ba1f658c0bf59e9107026ac466428";
const url = "https://api.themoviedb.org/3/";
const upcoming = "upcoming";
const popular = "popular";
const topRated = "top_rated";
const nowPlaying = "now_playing";
const imgUrl = "https://image.tmdb.org/t/p/original";

const Card = ({ img }) => <img className='card' src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
    <div className='row'>
        <h2>{title}</h2>
        <div>
            {arr.map((item, index) => (
                <Card key={index} img={`${imgUrl}${item.poster_path}`} />
            ))}
        </div>
    </div>
);

export default function Home() {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        const fetchUpcoming = async () => {
            try {
                const { data: { results } } = await axios.get(`${url}movie/${upcoming}?api_key=${apiKey}`);
                setUpcomingMovies(results);
            } catch (error) {
                console.error("Error fetching upcoming movies:", error);
            }
        };

        const fetchPopular = async () => {
            try {
                const { data: { results } } = await axios.get(`${url}movie/${popular}?api_key=${apiKey}`);
                setPopularMovies(results);
            } catch (error) {
                console.error("Error fetching popular movies:", error);
            }
        };

        const fetchTopRated = async () => {
            try {
                const { data: { results } } = await axios.get(`${url}movie/${topRated}?api_key=${apiKey}`);
                setTopRatedMovies(results);
            } catch (error) {
                console.error("Error fetching top rated movies:", error);
            }
        };

        const fetchNowPlaying = async () => {
            try {
                const { data: { results } } = await axios.get(`${url}movie/${nowPlaying}?api_key=${apiKey}`);
                setNowPlayingMovies(results);
            } catch (error) {
                console.error("Error fetching now playing movies:", error);
            }
        };
        const getAllGenres = async () => {

            try {
                const { data: { genres } } = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=f85ba1f658c0bf59e9107026ac466428');
                setGenre(genres);
            } catch (error) {
                console.error("Error fetching now playing movies:", error);
            }
        };
        getAllGenres();
        fetchUpcoming();
        fetchPopular();
        fetchTopRated();
        fetchNowPlaying();
    }, []);

    return (
        <section className="home">
            <div className="banner" style={{
                backgroundImage: popularMovies[0] ? `url(${imgUrl}/${popularMovies[0].poster_path})` : "rgb(16,16,16)"
            }}>
                {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
                {popularMovies[0] && <p>{popularMovies[0].overview}</p>}
                <div className='buttons'>
                    <button> <BiPlay /> Play  </button>
                    <button>My List <AiOutlinePlus /> </button>
                </div>

            </div>
            <Row title={"Now Playing"} arr={nowPlayingMovies} />
            <Row title={"Popular on Netflix"} arr={popularMovies} />
            <Row title={"Upcoming Movies"} arr={upcomingMovies} />
            <Row title={"Top Rated"} arr={topRatedMovies} />

            <div className="genreBox">
                {genre.map((item) => (
                    <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
                ))}
            </div>
        </section>
    );
}
