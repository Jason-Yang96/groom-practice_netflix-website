import React from 'react';
import axios from '../api/axios';
import { useEffect, useState } from 'react';
import './Row.css';
import MovieModal from './MovieModal';

const Row = ({ title, fetchUrl, isLargeRow, id }) => {
	const [movies, setMovies] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [movieSelected, setMovieSelected] = useState({});
	useEffect(() => {
		fetchMovieData();
	}, []);
	const fetchMovieData = async () => {
		const request = await axios.get(fetchUrl);
		// console.log('request', request);
		setMovies(request.data.results);
	};

	const handleClick = (movie) => {
		setModalOpen(true);
		setMovieSelected(movie);
	};

	return (
		<section>
			<h2>{title}</h2>
			<div className='slider'>
				<div className='slider__arrow-left'>
					<span
						className='arrow'
						onClick={() => {
							document.getElementById(id).scrollLeft -=
								window.innerWidth - 80;
						}}>
						{'<'}
					</span>
				</div>
				<div
					id={id}
					className='row__posters'>
					{movies.map(
						(
							movie //바로 렌더링이 되기 위해서는 소괄호 사용
						) => (
							<img
								key={movie.id}
								className={`row__poster ${
									isLargeRow && 'row__posterLarge'
								}`}
								src={`https://image.tmdb.org/t/p/original/${
									isLargeRow
										? movie.poster_path
										: movie.backdrop_path
								}`}
								alt={movie.name}
								onClick={() => handleClick(movie)}
							/>
						)
					)}
				</div>
				<div className='slider__arrow-right'>
					<span
						className='arrow'
						onClick={() => {
							document.getElementById(id).scrollLeft +=
								window.innerWidth - 80;
						}}>
						{'>'}
					</span>
				</div>
			</div>
			{modalOpen && (
				<MovieModal
					{...movieSelected}
					setModalOpen={setModalOpen}
				/>
			)}
		</section>
	);
};

export default Row;
