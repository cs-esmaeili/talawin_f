import React from 'react';
import SimpleTable from './SimpleTable';

const headers = ["Company", "Contact", "Country"];
const rows = [
  ["Alfreds Futterkiste", "Maria Anders", "Germany"],
  ["Centro comercial Moctezuma", "Francisco Chang", "Mexico"],
  ["Ernst Handel", "Roland Mendel", "Austria"],
  ["Island Trading", "Helen Bennett", "UK"],
  ["Laughing Bacchus Winecellars", "Yoshi Tannamuri", "Canada"],
  ["Magazzini Alimentari Riuniti", "Giovanni Rovelli", "Italy"]
];

// Show only the "Company" and "Country" columns (0 and 2)
const columnsToShow = [0, 2];

// Apply custom CSS classes
const headerClasses = ["text-blue-500", "", "text-green-500"]; // Company header in blue, Country header in green

// Function to determine row classes
const rowClasses = (row, rowIndex) => {
  return row.some(cell => Number(cell) > 10) ? "bg-yellow-100" : "";
};

// Function to determine cell classes
const cellClasses = (cell, cellIndex, row, rowIndex) => {
  return Number(cell) > 10 ? "text-red-500" : "";
};

// Example action component
const ActionComponent = ({ rowData, rowIndex }) => {
  return (
    <button onClick={() => alert(`Row ${rowIndex + 1} clicked!`)} className="px-4 py-2 bg-blue-500 text-white rounded">
      Click Me
    </button>
  );
};

// Column visibility classes
const columnVisibilityClasses = [
  "", // Company column: visible
  "hidden sm:table-cell", // Contact column: hidden by default, visible on small screens and up
  "" // Country column: visible
];

const App = () => {
  return (
    <SimpleTable
      headers={headers}
      rows={rows}
      columnsToShow={columnsToShow}
      headerClasses={headerClasses}
      rowClasses={rowClasses}
      cellClasses={cellClasses}
      actionComponent={ActionComponent} // Pass the action component
      columnVisibilityClasses={columnVisibilityClasses} // Pass visibility classes
    />
  );
};

export default App;
