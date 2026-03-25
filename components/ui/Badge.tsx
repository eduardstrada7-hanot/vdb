type BadgeStatus = 'pending' | 'reviewed' | 'approved' | 'rejected'

interface BadgeProps {
  status: BadgeStatus | string
}

const statusConfig: Record<string, { label: string; classes: string }> = {
  pending: {
    label: 'Pending',
    classes: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
  },
  reviewed: {
    label: 'Reviewed',
    classes: 'bg-blue-50 text-blue-800 border border-blue-200',
  },
  approved: {
    label: 'Approved',
    classes: 'bg-green-50 text-green-800 border border-green-200',
  },
  rejected: {
    label: 'Rejected',
    classes: 'bg-red-50 text-red-800 border border-red-200',
  },
}

export default function Badge({ status }: BadgeProps) {
  const config = statusConfig[status] || {
    label: status,
    classes: 'bg-gray-50 text-gray-800 border border-gray-200',
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.classes}`}>
      {config.label}
    </span>
  )
}
