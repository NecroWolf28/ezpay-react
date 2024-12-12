import React, {useState} from 'react';
import Button from '../../../components/Button';
import './TransactionFilter.css';
import Card from "../../../components/Card";

function TransactionFilter({filters, onFilterChange, onApplyFilters, onClearFilters, uniqueTypes, uniqueStatuses}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCard = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="transaction-filter">
            <Button label={isOpen ? "Hide Filters" : "Show Filters"} type="confirm" onClick={toggleCard}/>
            {isOpen && (
                <Card>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={onFilterChange}
                    />
                    <label>End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={onFilterChange}
                    />
                    <label>Type:</label>
                    <select
                        name="type"
                        value={filters.type}
                        onChange={onFilterChange}
                    >
                        <option value="">All</option>
                        {uniqueTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    <label>Status:</label>
                    <select
                        name="status"
                        value={filters.status}
                        onChange={onFilterChange}
                    >
                        <option value="">All</option>
                        {uniqueStatuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    <div className="buttons">
                        <Button label="Filter" type="confirm" onClick={onApplyFilters}/>
                        <Button label="Clear" type="cancel" onClick={onClearFilters}/>
                    </div>
                </Card>
            )}
        </div>
    );
}

export default TransactionFilter;
