import React from 'react';
import axios from '../api/axios';
import { useEffect, useState } from 'react';
import './Row.css';
import MovieModal from './MovieModal';

const Row = ({ title, fetchUrl, isLargeRow, id }) => {
	const [movies, setMovies] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [movieSelected, setMovieSelected] = useState({});

	//의존성 배열이 없는 경우에는 처음에 마운트 될 때만 호출이 된다. 있다면? 지정 값이 바뀔 때 다시 호출 된다.
	//useEffect안에 사용하는 상태나 props가 있다면 deps에 넣어줘야 한다. 그게 규칙이다. 넣지 않으면, 최신 값을 받아서 실행될 수 없다.
	useEffect(() => {
		fetchMovieData();
	});
	const fetchMovieData = async () => {
		const request = await axios.get(fetchUrl);
		// console.log('request', request);
		setMovies(request.data.results);
		// console.log(request.data.results);
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
							<img // 각 요소에 대해서 id를 key값으로 부여해야 한다. 안그러면 오류
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
