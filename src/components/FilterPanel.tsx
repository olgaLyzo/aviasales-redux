import React, { useState } from 'react';
import css from '../styles/filters.module.scss';


interface FilterPanelProps {
  airlines: string[];
  connectionsOptions: number[];
  onFilterChange: (selectedAirline: string, selectedConnections: Set<number>) => void;
	isOpen: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ airlines, connectionsOptions, onFilterChange, isOpen }) => {
  const [selectedAirline, setSelectedAirline] = useState<string>('');
  const [selectedConnections, setSelectedConnections] = useState<Set<number>>(new Set());

  const handleAirlineChange = (airline: string) => {
    setSelectedAirline(airline);
    onFilterChange(airline, selectedConnections);
  };

  const handleConnectionChange = (connection: number) => {
    const newSelectedConnections = new Set(selectedConnections);
    if (newSelectedConnections.has(connection)) {
      newSelectedConnections.delete(connection);
    } else {
      newSelectedConnections.add(connection);
    }
    setSelectedConnections(newSelectedConnections);
    onFilterChange(selectedAirline, newSelectedConnections);
  };

  return (
    <div 
			className={isOpen ? css.active : css.filters_panel}>
      <div className={css.filter}>
        <h4>Choose Airline</h4>
        {airlines.map((airline) => (
          <label key={airline}>
            <input
              type="radio"
              name="airline"
              value={airline}
              checked={selectedAirline === airline}
              onChange={() => handleAirlineChange(airline)}
            />
            {airline.slice(19,-4)}
          </label>
        ))}
      </div>
      <div className={css.filter}>
        <h4>Number of Connections</h4>
        {connectionsOptions.map((connection) => (
          <label key={connection}>
            <input
              type="checkbox"
              value={connection}
              checked={selectedConnections.has(connection)}
              onChange={() => handleConnectionChange(connection)}
            />
            {connection === 0 ? 'Direct flight' : `${connection} connections`}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;