import React from "react";

const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) || '';
};

const Table = ({
    headers,
    rows,
    rowsData,
    headerClasses,
    rowClasses,
    cellClasses,
    actionComponent: ActionComponent,
    actionHeader = "#",
    columnVisibilityClasses = [],
    rowCountstart,
    selectListener
}) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse min-w-full"> 
                <thead>
                    <tr className="bg-secondary text-xl">
                        <th className="p-2 text-center">#</th>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className={`p-2 text-center ${headerClasses?.[index] || ""} ${columnVisibilityClasses?.[index] || ""}`}
                            >
                                {header}
                            </th>
                        ))}
                        {ActionComponent && (
                            <th className="p-2 text-center">{actionHeader}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => {
                        const rowClass = rowClasses ? rowClasses(row, rowIndex) : "";
                        return (
                            <tr
                                key={rowIndex}
                                className={`${rowIndex % 2 === 1 ? "bg-secondary" : ""} ${rowClass}`}
                                onClick={(e) => { (selectListener) && selectListener(row, rowIndex) }}
                            >
                                <td className="p-2 text-center">{rowIndex + 1 + (rowCountstart != null ? rowCountstart : 0)}</td>
                                {rowsData.map((key, headerIndex) => {
                                    const cellData = getNestedValue(row, key);
                                    const cellClass = cellClasses ? cellClasses(cellData, headerIndex, row, rowIndex) : "";
                                    return (
                                        <td
                                            key={headerIndex}
                                            className={`p-2 text-center ${cellClass} ${columnVisibilityClasses?.[headerIndex] || ""}`}
                                            style={{ whiteSpace: 'nowrap' }} 
                                        >
                                            {cellData}
                                        </td>
                                    );
                                })}
                                {ActionComponent && (
                                    <td className="p-2 text-center">
                                        <ActionComponent rowData={row} rowIndex={rowIndex} />
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
