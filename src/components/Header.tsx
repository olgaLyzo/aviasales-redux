import React from 'react';
import css from '../styles/header.module.scss';

const Header = () => {
	return(
		<header className={css.header}>
			<img src = '../public/icons/airplane.svg'/>
			<h2>Поиск авиабилетов</h2>
		</header>
	)
}

export default Header;