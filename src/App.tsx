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

	const airlines = [...new Set(tickets.map(ticket => ticket.company))];
  const connectionOptions = [0, 1, 2];

  return (
    <div className="app">
      <Header />
			<SearchFilter
        airlines={airlines}
        connectionsOptions={connectionOptions}
				selectedAirline={selectedAirline}
				selectedConnections={selectedConnections}
				onAirlineChange={handleAirlineChange}
				handleConnectionChange={handleConnectionChange}
    	/>
			<TicketList tickets={filteredTickets} />
			
    </div>
  );
};

export default App;