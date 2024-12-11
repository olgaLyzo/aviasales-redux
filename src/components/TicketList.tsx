import React, { useState, useEffect } from 'react';
import TicketCard from './TicketCard';
import { Ticket } from '../types/types';
import { fetchTickets } from '../api/fakeApi';

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
		<div>
			<div style = {{display: 'flex', marginBottom: '20px'}}>
				<button
					style = {{
						flex: 1,
						padding: '10px',
						backgroundColor: activeTab === 'cheapest' ? '#ddd' : '#fff',
						border: '1px solid #ccc',
						cursor: 'pointer',
					}}
						onClick = {()=> {
							setActiveTab('cheapest');
							setVisibleCount(3);
						}}
				>Cheapest Ticket
				</button>
				<button
					style = {{
						flex: 1,
						padding: '10px',
						backgroundColor: activeTab === 'fastest' ? '#ddd' : '#fff',
						border: '1px solid #ccc',
						cursor: 'pointer',
					}}
						onClick = {()=> {
							setActiveTab('fastest');
							setVisibleCount(3);
						}}
				>Fastest Ticket
				</button>
				<button
					style = {{
						flex: 1,
						padding: '10px',
						backgroundColor: activeTab === 'optimal' ? '#ddd' : '#fff',
						border: '1px solid #ccc',
						cursor: 'pointer',
					}}
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
				<div style={{texAlign: 'center', marginTop: '20px'}}>
					<button
						style={{
							padding: '10px 20px',
							backgroundColor: '#007bff',
							color: '#fff',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
						}}
						onClick={loadMoreTickets}
					>
						Load more tickets
					</button>
				</div>
			)}
		</div>
	);
};


export default TicketList;