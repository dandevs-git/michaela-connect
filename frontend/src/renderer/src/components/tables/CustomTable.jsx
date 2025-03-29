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
    topContent,
    isloading
}) {
    const [globalFilter, setGlobalFilter] = useState('')

    useEffect(() => {
        setGlobalFilter(filter || '')
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
            <div className="">
                {isloading ? (
                    <div
                        className="d-flex flex-column justify-content-center align-items-center"
                        style={{ minHeight: '200px' }}
                    >
                        <div className="spinner-border text-primary mb-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-muted fw-semibold">Fetching data, please wait...</p>
                    </div>
                ) : (
                    <>
                        {/* Search & Entries Selection */}
                        <div className="d-flex row align-items-center justify-content-between mb-3">
                            <div className="col-8 d-flex align-items-center">
                                {topContent && topContent}

                                {!hasEntriesNumber && (
                                    <div className="text-start">
                                        Show{' '}
                                        <select
                                            className="rounded mx-2 px-3"
                                            value={table.getState().pagination.pageSize}
                                            onChange={(e) =>
                                                table.setPageSize(Number(e.target.value))
                                            }
                                        >
                                            {[10, 20, 30, 50, 100].map((pageSize) => (
                                                <option key={pageSize} value={pageSize}>
                                                    {pageSize}
                                                </option>
                                            ))}
                                        </select>{' '}
                                        entries
                                    </div>
                                )}
                            </div>

                            {!hasSearch && (
                                <div className="col-4">
                                    <div className="input-group input-group-sm">
                                        <span className="input-group-text bg-primary text-light px-3 rounded-start-pill">
                                            Search
                                        </span>
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={globalFilter}
                                            onChange={(e) => setGlobalFilter(e.target.value)}
                                            className="form-control rounded-end-pill"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Table */}
                        <div className="table-responsive rounded-3 border mb-3">
                            <table className="table table table-hover text-wrap mb-3 text-center">
                                {caption && <caption className="text-center">{caption}</caption>}
                                <thead>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <th
                                                    className="fw-semibold"
                                                    key={header.id}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {header.column.getIsSorted() && (
                                                        <i
                                                            className={`bi ${
                                                                header.column.getIsSorted() ===
                                                                'asc'
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
                                    {table.getRowModel().rows.length > 0 ? (
                                        table.getRowModel().rows.map((row) => (
                                            <tr key={row.id}>
                                                {row.getVisibleCells().map((cell) => (
                                                    <td key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={columns.length} className="text-center">
                                                No data available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {!hasPagination && (
                            <div className="d-flex justify-content-end pagination">
                                <button
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                    className="btn btn-sm btn-light border rounded-start-3"
                                >
                                    First
                                </button>
                                <button
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    className="btn btn-sm btn-light border px-3"
                                >
                                    {'<'}
                                </button>
                                <span className="px-3">
                                    Page {table.getState().pagination.pageIndex + 1} of{' '}
                                    {table.getPageCount()}
                                </span>
                                <button
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    className="btn btn-sm btn-light border px-3"
                                >
                                    {'>'}
                                </button>
                                <button
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    disabled={!table.getCanNextPage()}
                                    className="btn btn-sm btn-light border rounded-end-3"
                                >
                                    Last
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    )
}

export default CustomTable
