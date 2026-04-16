'use client'

import { Clock, CheckCircle, AlertCircle, User, Shield } from 'lucide-react'

interface TimelineEvent {
    date: string
    action: string
    by: string
    note?: string
}

interface DisputeTimelineProps {
    disputeId: string
}

export default function DisputeTimeline({ disputeId }: DisputeTimelineProps) {
    // Mock timeline - in real: fetch history
    const timeline: TimelineEvent[] = [
        {
            date: '2024-10-20 10:30 AM',
            action: 'Dispute Filed',
            by: 'John Doe (Buyer)',
        },
        {
            date: '2024-10-20 2:15 PM',
            action: 'Under Review',
            by: 'Admin Team',
        },
        {
            date: '2024-10-21 9:45 AM',
            action: 'Resolved - Refund Issued',
            by: 'Super Admin',
            note: 'Full refund processed to original payment method.'
        }
    ]

    return (
        <div className="glass-card p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Clock className="w-8 h-8" />
                Dispute Timeline
            </h3>
            <div className="space-y-6">
                {timeline.map((event, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                        <div className="flex flex-col items-center w-12">
                            <div className="w-10 h-10 glass-card rounded-2xl flex items-center justify-center border border-slate-700 shadow-lg group-hover:shadow-glow-emerald transition-all">
                                {index === 0 ? <User className="w-5 h-5 text-emerald-400" /> : (
                                    index === timeline.length - 1 ? <Shield className="w-5 h-5 text-emerald-400" /> : <Clock className="w-5 h-5 text-blue-400" />
                                )}
                            </div>
                            {index < timeline.length - 1 && (
                                <div className="w-0.5 h-16 bg-gradient-to-b from-slate-700 to-slate-800 mx-auto mt-3" />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                                    {event.action}
                                </span>
                                <span className="text-sm text-slate-400">by {event.by}</span>
                            </div>
                            <p className="text-slate-300 mb-1">{event.date}</p>
                            {event.note && (
                                <p className="text-slate-400 italic bg-slate-900/50 p-3 rounded-2xl border border-slate-800">
                                    {event.note}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

