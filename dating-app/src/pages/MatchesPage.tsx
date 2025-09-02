import { Link } from 'react-router-dom'
import { useAppStore } from '../stores/appStore'

export default function MatchesPage() {
	const { matches, getUserById } = useAppStore()
	const ids = Object.keys(matches).filter((id) => matches[id])

	return (
		<div className="mx-auto max-w-md">
			<h1 className="mb-4 text-2xl font-bold">Matches</h1>
			<div className="space-y-2">
				{ids.length === 0 && <div className="text-gray-600">No matches yet</div>}
				{ids.map((id) => {
					const u = getUserById(id)
					if (!u) return null
					return (
						<Link key={id} to={`/chat/${id}`} className="flex items-center gap-3 rounded border p-2">
							{u.photos?.[0] && <img src={u.photos[0]} className="h-12 w-12 rounded object-cover" />}
							<div>
								<div className="font-medium">{u.name}</div>
								<div className="text-xs text-gray-500">Tap to chat</div>
							</div>
						</Link>
					)
				})}
			</div>
		</div>
	)
}