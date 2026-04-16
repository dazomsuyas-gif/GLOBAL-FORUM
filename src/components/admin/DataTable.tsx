"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, MoreHorizontal, Download, Filter } from 'lucide-react';

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    searchPlaceholder?: string;
    enableBulkActions?: boolean;
}

interface ColumnDef<T> {
    key: keyof T;
    header: string;
    render?: (value: any, row: T) => React.ReactNode;
}

export default function DataTable<T>({ data, columns, searchPlaceholder = "Search...", enableBulkActions = true }: DataTableProps<T>) {
    const [search, setSearch] = useState('');
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const filteredData = data.filter(row => {
        return Object.values(row as any).some(value =>
            value?.toString().toLowerCase().includes(search.toLowerCase())
        );
    });

    const sortedData = sortBy ? [...filteredData].sort((a, b) => {
        const aVal = (a as any)[sortBy];
        const bVal = (b as any)[sortBy];
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    }) : filteredData;

    const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <motion.div
            className="glass-card border border-slate-800 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Header */}
            <div className="p-8 border-b border-slate-800 bg-slate-900/50">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <h3 className="text-4xl font-black text-white mb-2">Data Management</h3>
                        <p className="text-xl text-slate-400">Manage your content with advanced filtering and bulk actions</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 items-center">
                        {enableBulkActions && selectedRows.size > 0 && (
                            <motion.div
                                className="flex items-center gap-3 px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl text-slate-300 font-bold"
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedRows.size === data.length}
                                    onChange={() => { }}
                                    className="w-5 h-5 text-emerald-500"
                                />
                                <span>{selectedRows.size} selected</span>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-colors">
                                        Delete
                                    </button>
                                    <button className="px-4 py-2 bg-emerald-500/80 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-colors">
                                        Publish
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        <div className="flex gap-2">
                            <motion.button
                                className="glass-card p-3 rounded-2xl border border-slate-700 hover:shadow-glow flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Filter className="w-5 h-5" />
                                <span className="font-semibold">Filter</span>
                            </motion.button>
                            <motion.button
                                className="glass-card p-3 rounded-2xl border border-slate-700 hover:shadow-glow flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Download className="w-5 h-5" />
                                <span className="font-semibold">Export CSV</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="p-8 border-b border-slate-800">
                <div className="max-w-md relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-slate-800/50 border border-slate-700 rounded-3xl text-xl font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/50 transition-all"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-900/50">
                        <tr>
                            {enableBulkActions && (
                                <th className="p-6 w-12">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.size === data.length}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedRows(new Set(Array.from(data.keys())));
                                            } else {
                                                setSelectedRows(new Set());
                                            }
                                        }}
                                        className="w-5 h-5 text-emerald-500 rounded border-slate-700 focus:ring-emerald-400"
                                    />
                                </th>
                            )}
                            {columns.map((column) => (
                                <th
                                    key={column.key as string}
                                    className="p-6 text-left font-bold text-white uppercase text-xs tracking-wider cursor-pointer hover:text-emerald-400 transition-colors group"
                                    onClick={() => {
                                        if (sortBy === column.key as string) {
                                            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                                        } else {
                                            setSortBy(column.key as string);
                                            setSortDirection('asc');
                                        }
                                    }}
                                >
                                    <div className="flex items-center gap-2 group">
                                        {column.header}
                                        <ChevronDown className={`w-4 h-4 transition-transform ${sortBy === column.key ? (sortDirection === 'asc' ? 'rotate-0' : 'rotate-180') : ''}`} />
                                    </div>
                                </th>
                            ))}
                            <th className="p-6 w-24 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, rowIndex) => (
                            <motion.tr
                                key={rowIndex}
                                className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-all group"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: rowIndex * 0.05 }}
                            >
                                {enableBulkActions && (
                                    <td className="p-6">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.has(rowIndex)}
                                            onChange={(e) => {
                                                const newSelected = new Set(selectedRows);
                                                if (e.target.checked) {
                                                    newSelected.add(rowIndex);
                                                } else {
                                                    newSelected.delete(rowIndex);
                                                }
                                                setSelectedRows(newSelected);
                                            }}
                                            className="w-5 h-5 text-emerald-500 rounded border-slate-700 focus:ring-emerald-400"
                                        />
                                    </td>
                                )}
                                {columns.map((column) => (
                                    <td key={column.key as string} className="p-6">
                                        {column.render ? column.render((row as any)[column.key], row) : (row as any)[column.key]}
                                    </td>
                                ))}
                                <td className="p-6 text-right">
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                        <button className="p-3 hover:bg-slate-700 rounded-2xl text-emerald-400 hover:text-emerald-300">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button className="p-3 hover:bg-slate-700 rounded-2xl text-blue-400 hover:text-blue-300">
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button className="p-3 hover:bg-slate-700 rounded-2xl text-red-400 hover:text-red-300">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        <button className="p-3 hover:bg-slate-700 rounded-2xl text-slate-400 hover:text-slate-300">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                        {paginatedData.length === 0 && (
                            <tr>
                                <td colSpan={columns.length + 2} className="p-16 text-center">
                                    <div className="space-y-4">
                                        <Search className="w-24 h-24 text-slate-600 mx-auto" />
                                        <h3 className="text-2xl font-bold text-slate-400">No results found</h3>
                                        <p className="text-slate-500 max-w-md mx-auto">Try adjusting your search terms or filters to find what you're looking for.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {filteredData.length > itemsPerPage && (
                <div className="p-8 border-t border-slate-800 bg-slate-900/50">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        <div className="text-slate-400">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-2xl hover:bg-slate-700 disabled:opacity-50 transition-colors"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-slate-400 font-mono">{currentPage}</span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(p + 1, Math.ceil(filteredData.length / itemsPerPage)))}
                                disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                                className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-2xl hover:bg-slate-700 disabled:opacity-50 transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

