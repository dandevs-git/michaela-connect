import React, { useState, useEffect } from 'react'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel
} from '@tanstack/react-table'

function CustomTable({
    filter,
    hasPagination,
    hasSearch,
    hasEntriesNumber,
    data,
    columns,
    caption,
    topContent
}) {
    const [globalFilter, setGlobalFilter] = useState('')

    useEffect(() => {
        if (filter) {
            setGlobalFilter(filter)
        } else {
            setGlobalFilter('')
        }
    }, [filter])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter
    })

    return (
        <>
            <div className="d-flex row align-items-center justify-content-center mb-3">
                <div className="col-8 d-flex align-items-center">
                    {topContent ? topContent : ''}
                    {!hasEntriesNumber && (
                        <div className="text-start">
                            show
                            <select
                                className="rounded mx-2 px-3"
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => {
                                    table.setPageSize(Number(e.target.value))
                                }}
                            >
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>
                            entries
                        </div>
                    )}
                </div>
                <div className="col-4">
                    {!hasSearch && (
                        <div className="d-flex">
                            <div className="d-flex input-group input-group-sm">
                                <span className="input-group-text bg-primary border rounded-start-pill text-light px-3">
                                    Search
                                </span>
                                <input
                                    type="text"
                                    placeholder="Ticket number, Department, Employee and etc."
                                    value={globalFilter}
                                    onChange={(e) => setGlobalFilter(e.target.value)}
                                    className="form-control rounded-end-pill"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <table className="table table-bordered table-hover table-responsive text-nowrap mb-3">
                {caption && <caption className="text-center">{caption}</caption>}
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {header.column.getIsSorted() && (
                                        <i
                                            className={`bi ${
                                                header.column.getIsSorted() === 'asc'
                                                    ? 'bi-caret-down-fill'
                                                    : 'bi-caret-up-fill'
                                            } ms-2`}
                                        ></i>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="table-group-divider">
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {!hasPagination && (
                <div className="justify-content-end pagination">
                    <button
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="btn border rounded-0 rounded-start-3 page-item"
                    >
                        First Page
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="btn border rounded-0 page-item px-3"
                    >
                        {'<'}
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="btn border rounded-0 page-item px-3"
                    >
                        {'>'}
                    </button>
                    <button
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                        className="btn border rounded-0 rounded-end-3 page-item"
                    >
                        Last Page
                    </button>
                </div>
            )}
        </>
    )
}

export default CustomTable
