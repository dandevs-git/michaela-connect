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
    hasPagination = true,
    hasSearch = true,
    hasExportOptions = false,
    hasEntriesNumber = true,
    hasFilterByHeader = false,
    data,
    columns,
    caption,
    topComponent,
    isloading
}) {
    const [globalFilter, setGlobalFilter] = useState('')
    const [columnFilters, setColumnFilters] = useState([])

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
        getColumnFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter,
            columnFilters
        },
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters
    })

    const handleExport = (type) => {
        console.log(type)
    }

    return (
        <>
            <div className="">
                {isloading ? (
                    <div
                        className="d-flex flex-column justify-content-center align-items-center"
                        style={{ minHeight: '200px' }}
                    >
                        <div className="spinner-grow text-primary mb-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-muted fw-semibold">Fetching data, please wait...</p>
                    </div>
                ) : (
                    <>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            {topComponent && topComponent}

                            {hasEntriesNumber && (
                                <div className="text-start">
                                    Show{' '}
                                    <select
                                        className="rounded mx-2 px-3"
                                        value={table.getState().pagination.pageSize}
                                        onChange={(e) => table.setPageSize(Number(e.target.value))}
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

                            {hasExportOptions && (
                                <div
                                    className="btn-group gap-2"
                                    role="group"
                                    aria-label="Export options"
                                >
                                    <button
                                        type="button"
                                        className="btn btn-primary rounded-3"
                                        onClick={handleExport('pdf')}
                                    >
                                        <i className="bi bi-file-earmark-pdf-fill me-1"></i> Export
                                        PDF
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary text-light rounded-3"
                                        onClick={handleExport('excel')}
                                    >
                                        <i className="bi bi-file-earmark-excel-fill me-1"></i>{' '}
                                        Export Excel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary rounded-3"
                                        // onClick={() => window.print()}
                                    >
                                        <i className="bi bi-printer-fill me-1"></i> Print
                                    </button>
                                </div>
                            )}

                            {hasSearch && (
                                <div className="" style={{ width: '400px' }}>
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

                        <div
                            className="table-responsive rounded-3 border mb-3"
                            style={{ overflow: 'visible' }}
                        >
                            <table className="table table-hover text-wrap mb-3 text-center">
                                {caption && <caption className="text-center">{caption}</caption>}
                                <thead>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <React.Fragment key={headerGroup.id}>
                                            <tr>
                                                {headerGroup.headers.map((header) => (
                                                    <th
                                                        className="fw-semibold text-nowrap"
                                                        key={header.id}
                                                        onClick={header.column.getToggleSortingHandler()}
                                                        style={{
                                                            cursor: 'pointer',
                                                            borderTopLeftRadius: '10px',
                                                            borderTopRightRadius: '10px'
                                                        }}
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
                                            {hasFilterByHeader && (
                                                <tr>
                                                    {headerGroup.headers.map((header) => (
                                                        <th key={`${header.id}-filter`}>
                                                            {header.column.getCanFilter() ? (
                                                                <input
                                                                    className="form-control form-control-sm"
                                                                    type="text"
                                                                    value={
                                                                        header.column.getFilterValue() ??
                                                                        ''
                                                                    }
                                                                    onChange={(e) =>
                                                                        header.column.setFilterValue(
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    placeholder={`Filter ${flexRender(header.column.columnDef.header, header.getContext())}`}
                                                                />
                                                            ) : null}
                                                        </th>
                                                    ))}
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </thead>

                                <tbody className="table-group-divider">
                                    {table.getRowModel().rows.length > 0 ? (
                                        table.getRowModel().rows.map((row) => (
                                            <tr key={row.id}>
                                                {row.getVisibleCells().map((cell) => (
                                                    <td className="text-capitalize" key={cell.id}>
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
                        {hasPagination && (
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
