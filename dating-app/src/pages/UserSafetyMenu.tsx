import { useAppStore } from '../stores/appStore'

export default function UserSafetyMenu({ userId }: { userId: string }) {
	const { blockUser, reportUser } = useAppStore()
	return (
		<div className="flex gap-2">
			<button onClick={() => blockUser(userId)} className="rounded border px-2 py-1 text-sm">Block</button>
			<button onClick={() => reportUser(userId, 'inappropriate')} className="rounded border px-2 py-1 text-sm">Report</button>
		</div>
	)
}