'use client'

import { AlertCircle, CheckCircle, Clock, HelpCircle } from 'lucide-react'

interface DisputeStatusBadgeProps {
    status: string
}

const statusConfig = {
    pending: { color: 'yellow', bg: 'bg-yellow-500/20 border-yellow-500/30', icon: Clock },
    under_review: { color: 'blue', bg: 'bg-blue-500/20 border-blue-500/30', icon: HelpCircle },
    resolved: { color: 'green', bg: 'bg-emerald-500/20 border-emerald-500/30', icon: CheckCircle },
    rejected: { color: 'red', bg: 'bg-red-500/20 border-red-500/30', icon: AlertCircle }
}

export default function DisputeStatusBadge({ status }: DisputeStatusBadgeProps) {
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending

    const Icon = config.icon

    return (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${config.bg} text-${config.color}-400`}>
            <Icon className="w-4 h-4" />
            {status.replace('_', ' ').toUpperCase()}
        </div>
    )
}

