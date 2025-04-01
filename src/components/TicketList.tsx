import React, { useState } from 'react';
import TicketCard from './TicketCard';
import css from '../styles/ticket-list.module.scss';
import { Ticket } from '../types/types';

interface TicketListProps {
  tickets: Ticket[];
}
const TicketList: React.FC<TicketListProps> = ({ tickets })=> {
	const [activeTab, setActiveTab] = useState<'cheapest' | 'fastest' | 'optimal'>('cheapest');
	const [visibleCount, setVisibleCount] = useState<number>(3);
	
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
		<div className={css.ticket_list_wrapper}>
			<div className={css.ticket_types_panel}>
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
				))
				}
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