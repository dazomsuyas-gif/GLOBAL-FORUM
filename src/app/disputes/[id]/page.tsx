import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import DisputeStatusBadge from '@/components/disputes/DisputeStatusBadge'
import DisputeTimeline from '@/components/disputes/DisputeTimeline'
import { AlertCircle, CheckCircle, MessageCircle, Pencil } from 'lucide-react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

interface DisputePageProps {
    params: { id: string }
}

export default async function DisputeDetail({ params }: DisputePageProps) {
    const session = await getServerSession(authOptions)

    const dispute = await prisma.dispute.findUnique({
        where: { id: params.id },
        include: {
            order: {
                include: { user: true }
            },
            user: true,
            seller: true
        }
    })

    if (!dispute) notFound()

    const isOwner = session?.user?.id === dispute.userId
    const isAdmin = session?.user?.role === 'ADMIN'
    const isSeller = session?.user?.id === dispute.sellerId

    if (!isOwner && !isAdmin && !isSeller) {
        redirect('/disputes')
    }

    const reasons = {
        wrong_item: 'Wrong Item Received',
        damaged: 'Item Arrived Damaged',
        not_received: 'Not Received (Shows Delivered)',
        other: 'Other Issue'
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-8 pb-24">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header */}
                <div className="glass-card p-12 rounded-4xl text-center">
                    <h1 className="text-5xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-4">
                        Dispute #{dispute.disputeNumber}
                    </h1>
                    <DisputeStatusBadge status={dispute.status} />
                    <div className="flex flex-wrap gap-4 mt-8 justify-center text-slate-400">
                        <span>Filed by {dispute.user.name}</span>
                        <span>Order #{dispute.order.orderNumber}</span>
                        <span>Seller: {dispute.seller.name}</span>
                        <span>${dispute.amount}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Order Details */}
                    <div className="glass-card p-12 rounded-4xl space-y-8">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                            <AlertCircle className="w-10 h-10 text-yellow-400" />
                            Order Details
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-xl text-slate-300 mb-3">Products</h3>
                                <div className="space-y-4">
                                    {dispute.order.products.map((product: any, i: number) => (
                                        <div key={i} className="flex items-center gap-4 p-6 bg-slate-900/50 rounded-3xl border border-slate-700">
                                            <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center">
                                                📦
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-lg text-white">{product.title || 'Product'}</h4>
                                                <p className="text-slate-400">Qty: {product.quantity || 1} | ${product.price || 0}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <span className="text-slate-400">Order Total</span>
                                    <span className="text-2xl font-black text-emerald-400">${dispute.order.totalUSD}</span>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-slate-400">Status</span>
                                    <DisputeStatusBadge status={dispute.order.status} />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-700">
                                <h4 className="font-bold text-xl text-white mb-4">Delivery Address</h4>
                                <pre className="text-slate-300 bg-slate-900/50 p-4 rounded-2xl font-mono text-sm">
                                    {JSON.stringify(dispute.order.deliveryAddress, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Dispute Details */}
                    <div className="glass-card p-12 rounded-4xl space-y-8">
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                            <CheckCircle className="w-10 h-10 text-emerald-400" />
                            Dispute Information
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <span className="text-slate-400 block mb-2">Reason</span>
                                <span className="text-2xl font-bold capitalize">{reasons[dispute.reason as keyof typeof reasons] || dispute.reason}</span>
                            </div>

                            <div>
                                <span className="text-slate-400 block mb-2">Description</span>
                                <div className="glass-card p-6 rounded-3xl border border-slate-700 prose prose-invert max-w-none">
                                    <p>{dispute.description}</p>
                                </div>
                            </div>

                            {dispute.evidence.length > 0 && (
                                <div>
                                    <span className="text-slate-400 block mb-4 flex items-center gap-2 font-bold">
                                        Evidence ({dispute.evidence.length})
                                    </span>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {dispute.evidence.map((url, i) => (
                                            <div key={i} className="glass-card aspect-square rounded-3xl overflow-hidden border border-slate-700 group hover:shadow-glow-emerald">
                                                <img src={url} alt="Evidence" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {dispute.adminNotes && (
                                <div className="bg-blue-500/20 border border-blue-500/30 p-6 rounded-3xl">
                                    <span className="text-slate-300 font-bold block mb-3">Admin Notes</span>
                                    <p className="text-slate-200">{dispute.adminNotes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <DisputeTimeline disputeId={params.id} />

                {/* Action Buttons - Admin Only */}
                {isAdmin && (
                    <div className="glass-card p-12 rounded-4xl border border-slate-700">
                        <h3 className="text-3xl font-bold text-white mb-8 text-center">
                            Admin Actions
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <form action={`/api/disputes/${params.id}`} className="contents">
                                <button formMethod="POST" formAction={`/api/disputes/${params.id}?status=under_review`}
                                    className="glass-card p-8 rounded-4xl border-2 border-blue-400/50 hover:shadow-glow-blue font-bold text-xl hover:bg-blue-500/10 transition-all">
                                    Mark Under Review
                                </button>
                            </form>
                            <form action={`/api/disputes/${params.id}`} className="contents">
                                <button formMethod="POST" formAction={`/api/disputes/${params.id}?status=resolved&resolution=refund_issued`}
                                    className="glass-card p-8 rounded-4xl border-2 border-emerald-400/50 hover:shadow-glow-emerald font-bold text-xl hover:bg-emerald-500/10 transition-all">
                                    Resolve - Refund
                                </button>
                            </form>
                            <form action={`/api/disputes/${params.id}`} className="contents">
                                <button formMethod="POST" formAction={`/api/disputes/${params.id}?status=rejected`}
                                    className="glass-card p-8 rounded-4xl border-2 border-red-400/50 hover:shadow-glow-red font-bold text-xl hover:bg-red-500/10 transition-all">
                                    Reject Dispute
                                </button>
                            </form>
                        </div>
                        <div className="mt-8 p-6 bg-slate-900/50 rounded-3xl border border-slate-700">
                            <label className="block text-white font-bold mb-4">Add Admin Notes</label>
                            <textarea rows={3} className="w-full glass-card p-4 rounded-3xl border border-slate-700 focus:border-emerald-400 text-white"
                                placeholder="Optional notes for resolution..." />
                        </div>
                    </div>
                )}

                {/* User Actions */}
                {isOwner && (
                    <div className="glass-card p-12 rounded-4xl border border-slate-700 text-center">
                        <MessageCircle className="w-20 h-20 text-slate-400 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">
                            {dispute.status === 'resolved' || dispute.status === 'rejected'
                                ? 'Dispute Closed'
                                : 'Awaiting Admin Review'}
                        </h3>
                        <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
                            {dispute.status === 'resolved'
                                ? `Resolved with ${dispute.resolution || 'action taken'}.`
                                : dispute.status === 'rejected'
                                    ? 'Dispute rejected by admin.'
                                    : 'Admin will review within 24-48 hours.'
                            }
                        </p>
                        <button className="glass-card px-12 py-4 rounded-3xl border border-emerald-400 font-bold hover:shadow-glow-emerald">
                            Add Comment/Evidence
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

