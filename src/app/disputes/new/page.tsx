'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AlertCircle, Loader2, ChevronLeft, Image, Upload } from 'lucide-react'
import DisputeStatusBadge from '@/components/disputes/DisputeStatusBadge'

export default function NewDispute() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()
    const orderId = searchParams.get('orderId')

    const [orders, setOrders] = useState<any[]>([])
    const [formData, setFormData] = useState({
        orderId: orderId || '',
        reason: 'wrong_item' as const,
        description: '',
        evidence: [] as string[],
        amount: 0
    })
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (status === 'authenticated' && session) {
            fetchUserOrders()
        }
    }, [status, session])

    const fetchUserOrders = async () => {
        try {
            const res = await fetch(`/api/orders?status=delivered&limit=10`)
            const { orders } = await res.json()
            setOrders(orders)
            if (orderId && orders.find((o: any) => o.id === orderId)) {
                const selected = orders.find((o: any) => o.id === orderId)
                setFormData(prev => ({ ...prev, orderId, amount: selected?.totalUSD || 0 }))
            }
        } catch (err) {
            setError('Failed to load orders')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!session) return

        setSubmitting(true)
        setError('')

        try {
            const res = await fetch('/api/disputes/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                const dispute = await res.json()
                router.push(`/disputes/${dispute.id}`)
            } else {
                const err = await res.json()
                setError(err.error || 'Failed to file dispute')
            }
        } catch (err) {
            setError('Network error')
        } finally {
            setSubmitting(false)
        }
    }

    if (status === 'loading') return <div>Loading...</div>
    if (!session) return <div className="text-center p-12">Please log in to file a dispute</div>

    const selectedOrder = orders.find(o => o.id === formData.orderId)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-8">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold mb-12"
                >
                    <ChevronLeft className="w-6 h-6" />
                    Back
                </button>

                <div className="glass-card p-12 rounded-4xl shadow-2xl border border-slate-700/50">
                    <h1 className="text-4xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-2 text-center">
                        File Dispute
                    </h1>
                    <p className="text-xl text-slate-400 text-center mb-12">
                        Report an issue with your order
                    </p>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500/30 p-6 rounded-3xl mb-8 flex items-center gap-3">
                            <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-white font-bold mb-3 text-lg">Select Order</label>
                            <select
                                required
                                value={formData.orderId}
                                onChange={(e) => {
                                    const id = e.target.value
                                    const order = orders.find(o => o.id === id)
                                    setFormData({ ...formData, orderId: id, amount: order?.totalUSD || 0 })
                                }}
                                className="w-full glass-card p-6 rounded-3xl border-2 border-slate-700 focus:border-emerald-400 transition-all text-white text-lg"
                            >
                                <option value="">Choose delivered order...</option>
                                {orders.map(order => (
                                    <option key={order.id} value={order.id}>
                                        #{order.orderNumber} - ${order.totalUSD} ({order.products?.length || 0} items)
                                    </option>
                                ))}
                            </select>
                            {selectedOrder && (
                                <div className="mt-4 p-6 bg-slate-900/50 rounded-2xl border border-slate-700">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-xl text-white mb-1">#{selectedOrder.orderNumber}</h4>
                                            <div className="flex gap-2 mb-2">
                                                <DisputeStatusBadge status={selectedOrder.status} />
                                            </div>
                                        </div>
                                        <span className="text-2xl font-black text-emerald-400">${selectedOrder.totalUSD}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-white font-bold mb-3 text-lg">Reason</label>
                            <select
                                required
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value as any })}
                                className="w-full glass-card p-6 rounded-3xl border-2 border-slate-700 focus:border-emerald-400 transition-all text-white text-lg"
                            >
                                <option value="wrong_item">Wrong Item Received</option>
                                <option value="damaged">Item Damaged/Broken</option>
                                <option value="not_received">Not Received (Shows Delivered)</option>
                                <option value="other">Other Issue</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-white font-bold mb-3 text-lg">Description (max 1000 chars)</label>
                            <textarea
                                required
                                maxLength={1000}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={6}
                                className="w-full glass-card p-6 rounded-3xl border-2 border-slate-700 focus:border-emerald-400 transition-all text-white text-lg resize-vertical"
                                placeholder="Describe the issue in detail..."
                            />
                            <p className="text-slate-400 text-sm mt-2">{formData.description.length}/1000</p>
                        </div>

                        <div>
                            <label className="block text-white font-bold mb-3 text-lg">Evidence (optional, max 5 images)</label>
                            <div className="glass-card p-6 rounded-3xl border-2 border-slate-700/50 hover:border-emerald-400/50 transition-all min-h-[120px] flex items-center justify-center">
                                {formData.evidence.length === 0 ? (
                                    <div className="text-center text-slate-400">
                                        <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                        <p>Image URLs (paste direct links, max 5)</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap gap-3">
                                        {formData.evidence.map((url, i) => (
                                            <div key={i} className="relative group">
                                                <img src={url} alt="Evidence" className="w-24 h-24 object-cover rounded-2xl border border-slate-700" />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, evidence: formData.evidence.filter((_, idx) => idx !== i) })}
                                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <p className="text-slate-400 text-sm mt-2">
                                Add image URLs one per line. Max 5. Drag & drop coming soon.
                            </p>
                            <textarea
                                value={formData.evidence.join('\n')}
                                onChange={(e) => {
                                    const urls = e.target.value.split('\n').filter(Boolean).slice(0, 5)
                                    setFormData({ ...formData, evidence: urls })
                                }}
                                className="w-full mt-3 p-4 rounded-2xl border border-slate-700 bg-slate-900/50 text-white text-sm"
                                rows={3}
                                placeholder="Paste image URLs here..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting || !formData.orderId}
                            className="w-full glass-card p-8 rounded-4xl border-2 border-emerald-400/50 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 font-black text-2xl text-emerald-400 hover:shadow-glow-emerald hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 h-20"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="w-8 h-8 animate-spin" />
                                    Filing Dispute...
                                </>
                            ) : (
                                'File Dispute'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

