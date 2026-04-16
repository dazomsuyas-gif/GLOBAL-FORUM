'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    ShoppingBag,
    Package,
    Truck,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Clock,
    ChevronRight
} from 'lucide-react'

const statusConfig = {
    pending: { label: 'Pending Payment', color: 'yellow' },
    processing: { label: 'Processing', color: 'orange' },
    shipped: { label: 'Shipped', color: 'blue' },
    delivered: { label: 'Delivered', color: 'green' },
    cancelled: { label: 'Cancelled', color: 'red' }
}

export default function OrdersPage() {
    const { data: session, status } = useSession()
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status === 'authenticated') {
            fetchOrders()
        }
    }, [status])

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders') // Assume API exists or use Prisma
            const data = await res.json()
            setOrders(data.orders || [])
        } catch (error) {
            console.error('Failed to fetch orders', error)
        } finally {
            setLoading(false)
        }
    }

    if (status === 'loading') {
        return <div className="p-12 text-center">Loading orders...</div>
    }

    return (
        <div className="container mx-auto p-8 max-w-6xl">
            <div className="flex items-center gap-4 mb-12">
                <ShoppingBag className="w-12 h-12 text-emerald-400" />
                <div>
                    <h1 className="text-4xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                        Your Orders
                    </h1>
                    <p className="text-xl text-slate-400 mt-2">
                        Track and manage your purchases
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="glass-card p-8 rounded-3xl animate-pulse">
                            <div className="h-4 bg-slate-700 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-slate-700 rounded w-1/2 mb-6"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-slate-700 rounded w-full"></div>
                                <div className="h-4 bg-slate-700 rounded w-4/5"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-32">
                    <Package className="w-24 h-24 text-slate-500 mx-auto mb-8 opacity-50" />
                    <h2 className="text-3xl font-bold text-white mb-4">No orders yet</h2>
                    <p className="text-xl text-slate-400 mb-8 max-w-md mx-auto">
                        Your shopping journey starts when you place your first order.
                    </p>
                    <a href="/marketplace" className="glass-card px-12 py-6 rounded-4xl border border-emerald-400 font-bold text-xl hover:shadow-glow-emerald transition-all">
                        Start Shopping →
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {orders.map((order) => {
                        const config = statusConfig[order.status as keyof typeof statusConfig]

                        return (
                            <div key={order.id} className="glass-card group hover:shadow-glow-emerald transition-all overflow-hidden rounded-4xl border border-slate-700 h-full">
                                <div className="p-8 border-b border-slate-800">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl font-black text-white mb-2">#{order.orderNumber}</h3>
                                            <div className="flex gap-2">
                                                <Badge variant="secondary" className={`bg-${config.color}-500/20 text-${config.color}-400 border-${config.color}-500/30 font-bold px-4 py-2`}>
                                                    {config.label}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-black text-emerald-400 mb-1">${order.totalUSD.toFixed(2)}</div>
                                            <div className="text-sm text-slate-500">{order.paymentMethod?.toUpperCase()}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        {order.products.slice(0, 2).map((product: any, i: number) => (
                                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-900/30 rounded-2xl group-hover:bg-slate-800/50 transition-all">
                                                <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    📦
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-white truncate">{product.title || 'Item'}</p>
                                                    <p className="text-sm text-slate-400">Qty: {product.quantity || 1} × ${product.price?.toFixed(2) || 0}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {order.products.length > 2 && (
                                            <div className="text-center text-slate-400 py-4">
                                                +{order.products.length - 2} more items
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-8 bg-gradient-to-r from-slate-900/50 to-slate-950 border-t border-slate-800 rounded-b-3xl">
                                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <Clock className="w-4 h-4" />
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                            {order.status === 'delivered' && (
                                                <Button
                                                    variant="outline"
                                                    className="glass-card border-emerald-400 text-emerald-400 hover:bg-emerald-500/10 hover:shadow-glow-emerald font-bold px-6"
                                                    onClick={() => window.location.href = `/disputes/new?orderId=${order.id}`}
                                                >
                                                    <AlertTriangle className="w-4 h-4 mr-2" />
                                                    Report Issue
                                                </Button>
                                            )}
                                            <Button variant="ghost" className="text-slate-400 hover:text-white">
                                                View Details <ChevronRight className="w-4 h-4 ml-1" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

