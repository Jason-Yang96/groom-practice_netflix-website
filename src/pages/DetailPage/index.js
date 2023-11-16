import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

export default function DetailPage() {
	const [movie, setMovie] = useState([]);
	const { movieId } = useParams(); //Nav.js에서 movieId를 path에 지정했으므로, useParams의 값은 movieId 를 속성으로 가지는 객체가 주어진다.
	console.log(movieId);
	console.log('useparams', useParams());

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(`/movie/${movieId}`);
			setMovie(request.data);
		}
		fetchData();
	}, [movieId]);

	if (movie.length === 0) return <div>...loading</div>;

	return (
		<section>
			<img
				className='modal__poster-img' // 이게 어떻게 가능한거지? 불러오지도 않았는데 말이야
				src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
				alt='movie-img'
			/>
		</section>
	);
}
