import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.themoviedb.org/3', //계속 반복되는 부분을 인스턴스화 한다
	params: {
		api_key: '048e5d051402860f82fdcef2a92282fb',
		language: 'ko-KR',
	},
});

export default instance;
