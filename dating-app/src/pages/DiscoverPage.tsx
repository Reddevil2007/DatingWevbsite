import { useMemo } from 'react'
import { useAppStore } from '../stores/appStore'
import UserSafetyMenu from './UserSafetyMenu'
import { compatibilityScore } from '../utils/compatibility'
import { demoUsers } from '../data/demoUsers'

export default function DiscoverPage() {
	const { feed, refreshFeed, likeUser, passUser, getUserById } = useAppStore()
	const topId = useMemo(() => feed[0], [feed])
	const user = topId ? getUserById(topId) : undefined
	const currentUser = demoUsers[0]
	const score = user && currentUser ? compatibilityScore(currentUser as any, user as any) : null

	return (
		<div className="mx-auto flex max-w-md flex-col items-center gap-4">
			<h1 className="text-2xl font-bold">Discover</h1>
			<button onClick={refreshFeed} className="text-xs text-gray-500">Refresh</button>
			{user ? (
				<div className="w-full rounded-lg border p-3 shadow">
					{user.photos?.[0] && (
						<img src={user.photos[0]} className="mb-3 h-80 w-full rounded object-cover" />
					)}
					<div className="mb-2 flex items-center justify-between">
						<div className="text-lg font-semibold">{user.name}</div>
						<UserSafetyMenu userId={user.id} />
					</div>
					{score !== null && (
						<div className="mb-3 text-sm text-gray-600">Compatibility: <span className="font-medium">{score}%</span></div>
					)}
					<div className="flex gap-3">
						<button onClick={() => passUser(user.id)} className="flex-1 rounded border py-2">Pass</button>
						<button onClick={() => likeUser(user.id)} className="flex-1 rounded bg-pink-600 py-2 text-white">Like</button>
					</div>
				</div>
			) : (
				<div className="text-gray-600">No more profiles. Check back later.</div>
			)}
		</div>
	)
}