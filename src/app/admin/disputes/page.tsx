'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, ChevronLeft, ChevronRight, AlertCircle, Clock, CheckCircle } from 'lucide-react'
import DisputeStatusBadge from '@/components/disputes/DisputeStatusBadge'
import { Button } from '@/components/ui/button'

export default function AdminDisputes() {
    const [disputes, setDisputes] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [statusFilter, setStatusFilter] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        fetchDisputes()
    }, [page, statusFilter, searchTerm])

    const fetchDisputes = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                ...(statusFilter && { status: statusFilter }),
                ...(searchTerm && { search: searchTerm })
            })
            const res = await fetch(`/api/disputes/list?${params}`)
            const data = await res.json()
            setDisputes(data.disputes || [])
            setTotalPages(data.pagination?.pages || 1)
        } catch (error) {
            console.error('Failed to fetch disputes', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto p-8 max-w-7xl">
            <div className="flex items-center gap-6 mb-12">
                <AlertCircle className="w-16 h-16 text-orange-400" />
                <div>
                    <h1 className="text-5xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                        Disputes Management
                    </h1>
                    <p className="text-2xl text-slate-400">
                        Review and resolve customer disputes
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="glass-card p-8 rounded-4xl mb-12 flex flex-col lg:flex-row gap-6 items-stretch lg:items-center">
                <div className="flex gap-4 flex-1">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search dispute number or user email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 rounded-3xl glass-card border border-slate-700 focus:border-emerald-400 transition-all text-white placeholder-slate-500"
                        />
                    </div>
                    <Button variant="outline" className="glass-card px-8 border-emerald-400 text-emerald-400 hover:shadow-glow-emerald whitespace-nowrap">
                        <Filter className="w-5 h-5 mr-2" />
                        Filter Status
                    </Button>
                </div>
                <div className="flex gap-2 flex-wrap lg:justify-end">
                    <Button
                        variant={statusFilter === '' ? 'default' : 'outline'}
                        onClick={() => setStatusFilter('')}
                        className="glass-card px-6"
                    >
                        All
                    </Button>
                    <Button
                        variant={statusFilter === 'pending' ? 'default' : 'outline'}
                        onClick={() => setStatusFilter('pending')}
                        className="glass-card px-6 bg-yellow-500/20 border-yellow-500/30 text-yellow-400"
                    >
                        <Clock className="w-4 h-4 mr-2" />
                        Pending
                    </Button>
                    <Button
                        variant={statusFilter === 'under_review' ? 'default' : 'outline'}
                        onClick={() => setStatusFilter('under_review')}
                        className="glass-card px-6 bg-blue-500/20 border-blue-500/30 text-blue-400"
                    >
                        Under Review
                    </Button>
                    <Button
                        variant={statusFilter === 'resolved' ? 'default' : 'outline'}
                        onClick={() => setStatusFilter('resolved')}
                        className="glass-card px-6 bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                    >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Resolved
                    </Button>
                    <Button
                        variant={statusFilter === 'rejected' ? 'default' : 'outline'}
                        onClick={() => setStatusFilter('rejected')}
                        className="glass-card px-6 bg-red-500/20 border-red-500/30 text-red-400"
                    >
                        Rejected
                    </Button>
                </div>
            </div>

            {/* Disputes Table */}
            <div className="space-y-8">
                {loading ? (
                    <div className="glass-card p-16 rounded-4xl text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto mb-4"></div>
                        Loading disputes...
                    </div>
                ) : disputes.length === 0 ? (
                    <div className="glass-card p-20 rounded-4xl text-center border-2 border-dashed border-slate-700">
                        <AlertCircle className="w-20 h-20 text-slate-500 mx-auto mb-8" />
                        <h3 className="text-3xl font-bold text-white mb-4">No disputes found</h3>
                        <p className="text-xl text-slate-400 max-w-md mx-auto">
                            {statusFilter ? `No ${statusFilter} disputes match your filter.` : 'No disputes to review.'}
                        </p>
                    </div>
                ) : (
                    <div className="glass-card rounded-4xl overflow-hidden border border-slate-700">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-900/50 border-b border-slate-700">
                                        <th className="text-left p-6 font-bold text-lg text-white">#</th>
                                        <th className="text-left p-6 font-bold text-lg text-white">Buyer</th>
                                        <th className="text-left p-6 font-bold text-lg text-white">Seller</th>
                                        <th className="text-left p-6 font-bold text-lg text-white">Amount</th>
                                        <th className="text-left p-6 font-bold text-lg text-white">Reason</th>
                                        <th className="text-left p-6 font-bold text-lg text-white">Status</th>
                                        <th className="text-left p-6 font-bold text-lg text-white">Date</th>
                                        <th className="p-6 font-bold text-lg text-white">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {disputes.map((dispute) => (
                                        <tr key={dispute.id} className="border-b border-slate-800 hover:bg-slate-900/30 transition-colors">
                                            <td className="p-6 font-mono text-emerald-400 text-xl font-bold">
                                                {dispute.disputeNumber}
                                            </td>
                                            <td className="p-6">
                                                <div>
                                                    <p className="font-bold text-white">{dispute.user.name}</p>
                                                    <p className="text-slate-400 text-sm">{dispute.user.email}</p>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div>
                                                    <p className="font-bold text-white">{dispute.seller.name}</p>
                                                    <p className="text-slate-400 text-sm">{dispute.seller.email}</p>
                                                </div>
                                            </td>
                                            <td className="p-6 font-bold text-2xl text-emerald-400">
                                                ${dispute.amount}
                                            </td>
                                            <td className="p-6">
                                                <span className="inline-block px-4 py-2 bg-slate-800 rounded-full text-sm font-bold capitalize">
                                                    {dispute.reason.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="p-6">
                                                <DisputeStatusBadge status={dispute.status} />
                                            </td>
                                            <td className="p-6">
                                                <span className="text-slate-400">{new Date(dispute.createdAt).toLocaleDateString()}</span>
                                            </td>
                                            <td className="p-6">
                                                <Button variant="outline" className="glass-card px-6 py-2 hover:shadow-glow-emerald mr-2">
                                                    View
                                                </Button>
                                                <Button variant="destructive" size="sm" className="glass-card bg-red-500/20 border-red-500/30 hover:bg-red-500/30">
                                                    Resolve
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="glass-card p-8 rounded-4xl flex items-center justify-between flex-wrap gap-4">
                        <div className="text-slate-400">
                            Page {page} of {totalPages} ({disputes.length} disputes)
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="glass-card border-slate-700"
                            >
                                <ChevronLeft className="w-5 h-5 mr-2" />
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="glass-card border-slate-700"
                            >
                                Next
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

