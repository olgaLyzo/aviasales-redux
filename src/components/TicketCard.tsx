import React from "react";
import { Ticket } from "../types/types";
import css from '../styles/ticket.module.scss';

const formatDuration = (minutes: number): string => {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${hours} h ${mins} min`;
};
const TicketCard: React.FC<Ticket> = ({ 
	from,
	to,
	company,
	price,
	currency,
	time,
	duration,
	date,
	connectionAmount
}) => {
		return (
			<div className = {css.ticket_card}>
				<div className={css.flight_info}>
					<div className={css.price}>{price} {currency}</div>
					<img src = {company}/>
				</div>


				<div className={css.flight_details}>
					<div className={css.criteria}>
						<h3 className={css.title}> {from} - {to} </h3>
						<div className={css.description}>{time.startTime} - {time.endTime}</div>
						<div className={css.description}>{date}</div>
					</div>
					<div className={css.criteria}>
						<h3 className={css.title}>Duration</h3>
						<div className={css.description}> {formatDuration(duration)}</div>
					</div>
					<div className={css.criteria}>
						<h3 className={css.title}>Connections</h3>
						<div className={css.description}> {" "}{
							connectionAmount === null || connectionAmount === 0 
							? "without connections" 
							: `${connectionAmount} ${connectionAmount === 1 ? "connection" : "connections"}`
							}
						</div>
					</div>
				</div>
			</div>
		);
	};

	export default TicketCard;