import React from 'react';

function TransactionsFilter({ filters, onFilterChange, onApplyFilters }) {
    return (
        <div>
            <label>
                Start Date:
                <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={onFilterChange}
                    style={{ margin: '0 5px' }}
                />
            </label>
            <label>
                End Date:
                <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={onFilterChange}
                    style={{ margin: '0 5px' }}
                />
            </label>
            <input
                type="text"
                placeholder="Type"
                name="type"
                value={filters.type}
                onChange={onFilterChange}
                style={{ margin: '0 5px' }}
            />
            <input
                type="text"
                placeholder="Status"
                name="status"
                value={filters.status}
                onChange={onFilterChange}
                style={{ margin: '0 5px' }}
            />
            <button onClick={onApplyFilters} style={{ margin: '0 5px' }}>
                Filter
            </button>
        </div>
    );
}

export default TransactionsFilter;
