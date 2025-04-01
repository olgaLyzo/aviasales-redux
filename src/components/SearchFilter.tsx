import React, { useState } from 'react';
import css from '../styles/filters.module.scss';

const SearchFilter: React.FC<{ 
	selectedAirline: string, 
	selectedConnections: number[],
	children: JSX.Element,
	}> = ({ 
			selectedAirline,
			selectedConnections,
			children,
			}) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {setIsOpen((prev) => !prev);};
	let nameOfAirline = selectedAirline.slice(19,-4);
	
  return (
		<>
			<div className={css.search_panel}>
				<div className={css.chosen_criteria_block}>
					<div className={css.results_of_choice}>
						<span>{isOpen && selectedAirline ? ` Авиакомпания: ${nameOfAirline},  `:`Любые авиабилеты, `}
						</span>
						<span>{isOpen && selectedConnections.length !== 0 
							? `пересадок: ${selectedConnections.map((el)=>`${el}`)}`
							: `любое кол-во пересадок`}
						</span> 
					</div>
					<div className = {css.criteria_block}>
						<span>Открыть настройки</span>
						<div 
							className={`${css.open_criteria_btn} ${isOpen ? css.active : ''}`}
							onClick={toggleMenu}>
						</div>
					</div> 
				</div>
      {isOpen && (
				<div>{children}</div>
			)}
			</div>
		</>
	)};

export default SearchFilter;