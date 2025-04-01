import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTickets } from "./store/ticketsSlice";
import { RootState, AppDispatch } from "./store/store";
import Header from './components/Header';
import TicketList from './components/TicketList';
import SearchFilter from './components/SearchFilter';
import Criteria from './components/Criteria';
import css from './styles/filters.module.scss';

import './styles/App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
	const { tickets, loading, error } = useSelector((state: RootState) => 
	state.tickets);
	const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [selectedAirline, setSelectedAirline] = useState<string>('');
  const [selectedConnections, setSelectedConnections] = useState<number[]>([]);

	useEffect(() => {
		if (tickets.length === 0) {  
      dispatch(loadTickets());
    }
  }, [dispatch, tickets.length]);  
  
	useEffect(() => {
    const filterTickets = () => {
      return tickets.filter(ticket =>
        (selectedAirline 
					? ticket.company.includes(selectedAirline) 
					: true) &&
        (selectedConnections.length > 0 
					? selectedConnections.includes(ticket.connectionAmount || 0) 
					: true)
      );
    };

    setFilteredTickets(filterTickets);
  }, [tickets, selectedAirline, selectedConnections]);

	const handleAirlineChange = (airline: string) => {
		setSelectedAirline(airline);
	};

	const handleConnectionChange = (connection: number) => {
		if(selectedConnections.includes(connection)){
			const filteredSelectedConnection = selectedConnections.filter((elem)=>elem !== connection)
			setSelectedConnections(filteredSelectedConnection)
		}else{
     const filteredSelectedConnection = Array.from(selectedConnections);
		 filteredSelectedConnection.push(connection)
		 setSelectedConnections(filteredSelectedConnection)
		} 
	}	

	if(loading) return <p>Loading...</p>;
	if(error) return <p>Error: {error}</p>

	const airlines = tickets.map(ticket => ticket.company);
  const connectionOptions = [0, 1, 2];

	return (
    <div className="app">
      <Header />
			<div className={css.search_block}>
				<div className={css.criteria_sidebar}>			
					<Criteria
						aviaCompanies={airlines}
						connectionOptions={connectionOptions} 
						selectedConnections={selectedConnections}
						handleConnectionChange={handleConnectionChange}
						onAirlineChange={handleAirlineChange}
					/>
				</div>
				<SearchFilter
					selectedAirline={selectedAirline}
					selectedConnections={selectedConnections}
				>
					<Criteria
						aviaCompanies={airlines}
						setSelectedAirline={setSelectedAirline}
						connectionOptions={connectionOptions} 
						selectedConnections={selectedConnections}
						handleConnectionChange={handleConnectionChange}
						onAirlineChange={handleAirlineChange}
					/>
				</SearchFilter>
				<TicketList 
					tickets={filteredTickets}
					 />
			</div>
    </div>
  );
};

export default App;