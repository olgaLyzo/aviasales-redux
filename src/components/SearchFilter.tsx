import React, { useState } from 'react';
import FilterPanel from './FilterPanel';
import css from '../styles/filters.module.scss';

const SearchFilter: React.FC<{ airlines: string[], connectionsOptions: number[], onFilterChange: (airline: string, connections: Set<number>) => void }> = ({ airlines, connectionsOptions, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={css.search_filter}>
        <h2 className={css.title}>Любые авиабилеты</h2>
        <button 
					className={css.toggle_button}
					onClick={toggleMenu}
				>{isOpen ? '▲' : '▼'}</button>
      
      {isOpen && (
        
          <FilterPanel 
            airlines={airlines} 
            connectionsOptions={connectionsOptions} 
            onFilterChange={onFilterChange} 
						isOpen = {isOpen}
          />
        
      )}
    </div>
  );
};

export default SearchFilter;