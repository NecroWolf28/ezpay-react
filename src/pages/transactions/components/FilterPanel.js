import React from 'react';

const FilterPanel = ({ filters, onFilterChange, onApplyFilters }) => (
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
            value={filters.type}
            onChange={e => onFilterChange({ target: { name: 'type', value: e.target.value } })}
            style={{ margin: '0 5px' }}
        />
        <input
            type="text"
            placeholder="Status"
            value={filters.status}
            onChange={e => onFilterChange({ target: { name: 'status', value: e.target.value } })}
            style={{ margin: '0 5px' }}
        />
        <button onClick={onApplyFilters} style={{ margin: '0 5px' }}>
            Filter
        </button>
    </div>
);

export default FilterPanel;
