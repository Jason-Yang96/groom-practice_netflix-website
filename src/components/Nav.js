import React, { useEffect, useState } from 'react';
import './Nav.css';
const Nav = () => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 50) {
				setShow(true);
			} else {
				setShow(false);
			}
		});
		return () => {
			window.removeEventListener('scroll', () => {});
		};
	}, []);

	return (
		<nav className={`nav ${show && 'nav__black'}`}>
			<img
				className='nav__logo'
				alt='nav logo'
				src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Netflix_2014_logo.svg/225px-Netflix_2014_logo.svg.png'
				onClick={() => window.location.reload()}
			/>
			<img
				className='nav__avatar'
				alt='nav logo'
				src='data:image/png;base64,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'
			/>
		</nav>
	);
};

export default Nav;
