import React from 'react';
import css from '../styles/filters.module.scss';

const Criteria: React.FC<{
	aviaCompanies:[],
	onAirlineChange:(airline:string)=>void,
	connectionOptions:number[],
	handleConnectionChange:(connection: number)=>void,
	}> = ({
		aviaCompanies,
		onAirlineChange,
		connectionOptions, 
		handleConnectionChange,
	}) => {
	const uniqueAirlines=[...new Set(aviaCompanies)];	
	
	return (
		<div className={css.filters_panel}>
			<div className={css.filter}>
				<h4>Choose Airline</h4>
				<label key={"all"}>
					<input 
						type="radio"
						name="airline"
						value="allAirlines"
						onChange= {()=>
							window.location.reload()
						}						
					/>All airlines
				</label>			
				{uniqueAirlines.map((airline) => 
					<label key={airline}>
						<input
							type="radio"
							name="airline"
							value={airline}
							onChange={()=>{onAirlineChange(airline)}}	
						/>
						{airline.slice(19,-4)}
					</label>
				)}
			</div>
			<div className={css.filter}>
				<h4>Number of Connections</h4>
				{connectionOptions.map((connection) => (
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
	)
}

export default Criteria;


