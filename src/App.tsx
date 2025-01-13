import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTickets } from "./store/ticketsSlice";
import { RootState, AppDispatch } from "./store/store";
import Header from './components/Header';
import TicketList from './components/TicketList';
import './styles/App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
	const { tickets, loading, error } = useSelector((state: RootState) => 
	state.tickets);

  useEffect(() => {
		if (tickets.length === 0) {  
      dispatch(loadTickets());
    }
  }, [dispatch, tickets.length]);  
  

	if(loading) return <p>Loading...</p>;
	if(error) return <p>Error: {error}</p>

  return (
    <div className="app">
      <Header />
			<TicketList />
    </div>
  );
};

export default App;