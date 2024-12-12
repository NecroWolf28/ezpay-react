import React from 'react';
import Button from '../../../components/Button';
import './TransactionFilter.css';

function TransactionFilter({
                               filters,
                               onFilterChange,
                               onApplyFilters,
                               onClearFilters,
                               uniqueTypes,
                               uniqueStatuses,
                           }) {
    return (
        <div className="filter-bar">
            <label className="filter-label">Start Date:</label>
            <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={onFilterChange}
                className="filter-input"
            />
            <label className="filter-label">End Date:</label>
            <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={onFilterChange}
                className="filter-input"
            />
            <label className="filter-label">Type:</label>
            <select
                name="type"
                value={filters.type}
                onChange={onFilterChange}
                className="filter-input"
            >
                <option value="">All</option>
                {uniqueTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            <label className="filter-label">Status:</label>
            <select
                name="status"
                value={filters.status}
                onChange={onFilterChange}
                className="filter-input"
            >
                <option value="">All</option>
                {uniqueStatuses.map((status) => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>
            <Button label="Filter" type="confirm" onClick={onApplyFilters}/>
            <Button label="Clear" type="cancel" onClick={onClearFilters}/>
        </div>
    );
}

export default TransactionFilter;
