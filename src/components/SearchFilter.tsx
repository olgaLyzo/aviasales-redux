import React, { useState } from 'react';
import css from '../styles/filters.module.scss';

const SearchFilter: React.FC<{ 
	airlines: string[], 
	connectionsOptions: number[], 
	selectedAirline: string, 
	selectedConnections: number[],
	handleConnectionChange:(connection: number)=>void,
	onAirlineChange:(airline:string)=>void,
	}> = ({ 
			airlines, 
			connectionsOptions, 
			selectedAirline,
			selectedConnections,
			handleConnectionChange,
			onAirlineChange
			}) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {setIsOpen((prev) => !prev);};
	let nameOfAirline = selectedAirline.slice(19,-4);
	
  return (
		<>
		
			<div className={css.search_panel}>

				{/* Блок отражения результата выбора параметров */}
				<div className={css.chosen_criteria_block}>
					<div className={css.results_of_choice} id='title'>
						<span>{isOpen && selectedAirline ? ` Авиакомпания: ${nameOfAirline},  `:`Любые авиабилеты, `}
						</span>
						<span>{isOpen && selectedConnections.length !== 0 
							? `пересадок: ${selectedConnections.map((el)=>`${el}`)}`
							: `любое кол-во пересадок`}
						</span> 
					</div>
				{/* Кнопка развертывания параметров */}
					<div className = {css.criteria_block}>
						<span>Открыть настройки</span>
						<div 
							className={`${css.open_criteria_btn} ${isOpen ? css.active : ''}`}
							onClick={toggleMenu}>
						</div>
					</div> 
				</div>

			{/* Списки фильтров */}
      {isOpen && (
				<div className={css.filters_panel}>
					<div className={css.filter}>
						<h4>Choose Airline</h4>
						{airlines.map((airline) => (
							<label key={airline}>
								<input
									type="radio"
									name="airline"
									value={airline}
									checked={selectedAirline === airline}
									onChange={() => onAirlineChange(airline)}
								/>
								{airline.slice(19,-4)}
							</label>
						))}
					</div>
					<div className={css.filter}>
						<h4>Number of Connections</h4>
						{connectionsOptions.map((connection) => (
							<label key={connection}>
								<input
									type="checkbox"
									value={connection}
									onChange={() => {
										handleConnectionChange(connection)}}
								/>
								{connection === 0 ? 'Direct flight' : `${connection} connections`}
							</label>
						))}
					</div>
				</div>
			)}
			</div>
		</>
	)};

export default SearchFilter;