import React from 'react';
import css from '../styles/header.module.scss';

const Header = () => {
	return(
		<header className={css.header}>
			<img src = '../public/icons/airplane.svg'/>
		</header>
	)
}

export default Header;