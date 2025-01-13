import React, { useState, useEffect } from 'react';
import TicketCard from './TicketCard';
import { Ticket } from '../types/types';
import { fetchTickets } from '../api/fakeApi';
import css from '../styles/ticket-list.module.scss';

const TicketList: React.FC = () => {
	const [tickets, setTickets] = useState<Ticket[]>([]);
	const [activeTab, setActiveTab] = useState<'cheapest' | 'fastest' | 'optimal'>('cheapest');
	const [visibleCount, setVisibleCount] = useState<number>(3);
	useEffect(() => {
		const getTickets = async () => {
			const data = await fetchTickets();
			setTickets(data);
		};
		getTickets()
	}, []);

	
	const filteredTickets = () => {
		let sortedTickets = [...tickets];

		if(activeTab === 'cheapest'){
			sortedTickets = sortedTickets.sort((a, b) => a.price - b.price);
		}
		else if(activeTab === 'fastest'){
			sortedTickets = sortedTickets.sort((a, b)=>a.duration - b.duration);
		}
		else if(activeTab === 'optimal'){
			sortedTickets = sortedTickets.sort((a, b)=>(a.price + a.duration) - (b.price + b.duration));
		}
		return sortedTickets.slice(0, visibleCount);
	};

	const loadMoreTickets = () => {
		setVisibleCount((prevCount)=> prevCount + 3);
	}
	return (
		<div className={css.container}>
			<div className={css.filters_panel}>
				<button
					className={`${css.ticket_type_tab} ${activeTab === 'cheapest' ? css.active_tab : ''}`}
					onClick = {()=> {
						setActiveTab('cheapest');
						setVisibleCount(3);
					}}
				>Cheapest Ticket
				</button>
				<button
					className={`${css.ticket_type_tab} ${activeTab === 'fastest' ? css.active_tab : ''}`}
					onClick = {()=> {
						setActiveTab('fastest');
						setVisibleCount(3);
					}}
				>Fastest Ticket
				</button>
				<button
					className={`${css.ticket_type_tab} ${activeTab === 'optimal' ? css.active_tab : ''}`}
					onClick = {()=> {
						setActiveTab('optimal');
						setVisibleCount(3);
					}}
				>Optimal Ticket
				</button>
			</div>
			<div>
				{filteredTickets().map((ticket) => (
					<TicketCard key={ticket.id} {...ticket} />
				))}
			</div>

			{visibleCount < tickets.length && (
					<button
						className={css.btn_load_more}
						onClick={loadMoreTickets}
					>
						Load more tickets
					</button>
			)}
		</div>
	);
};


export default TicketList;