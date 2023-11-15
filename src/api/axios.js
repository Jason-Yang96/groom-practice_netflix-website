import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.themoviedb.org/3', //계속 반복되는 부분을 인스턴스화 한다
	params: {
		api_key: process.env.REACT_APP_MOVIE_DB_API_KEY,
		language: 'ko-KR',
	},
});

export default instance;
