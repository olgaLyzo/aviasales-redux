import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTickets } from "./store/ticketsSlice";
import { RootState, AppDispatch } from "./store/store";
import Header from './components/Header';
import TicketList from './components/TicketList';
import SearchFilter from './components/SearchFilter';
import './styles/App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
	const { tickets, loading, error } = useSelector((state: RootState) => 
	state.tickets);
	const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [selectedAirline, setSelectedAirline] = useState<string>('');
  const [selectedConnections, setSelectedConnections] = useState<Set<number>>(new Set());


  useEffect(() => {
		if (tickets.length === 0) {  
      dispatch(loadTickets());
    }
  }, [dispatch, tickets.length]);  
  
	useEffect(() => {
    const filterTickets = () => {
      return tickets.filter(ticket =>
        (selectedAirline ? ticket.company.includes(selectedAirline) : true) &&
        (selectedConnections.size > 0 ? selectedConnections.has(ticket.connectionAmount || 0) : true)
      );
    };

    setFilteredTickets(filterTickets);
  }, [tickets, selectedAirline, selectedConnections]);

  const handleFilterChange = (airline: string, connections: Set<number>) => {
    setSelectedAirline(airline);
    setSelectedConnections(connections);
  };

	if(loading) return <p>Loading...</p>;
	if(error) return <p>Error: {error}</p>

	const airlines = [...new Set(tickets.map(ticket => ticket.company))];
  const connectionOptions = [0, 1, 2];

  return (
    <div className="app">
      <Header />
			<TicketList tickets={filteredTickets} />
			<SearchFilter
        airlines={airlines}
        connectionsOptions={connectionOptions}
        onFilterChange={handleFilterChange}
    	/>
    </div>
  );
};

export default App;