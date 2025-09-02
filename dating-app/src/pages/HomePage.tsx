import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useEngagementStore } from '../stores/engagementStore'

export default function HomePage() {
	const { streak, markLogin, nextSuggestionAt } = useEngagementStore()
	useEffect(() => { markLogin() }, [markLogin])
	return (
		<div className="mx-auto max-w-xl">
			<h1 className="mb-4 text-3xl font-bold">Welcome to HeartLink</h1>
			<p className="mb-4 text-gray-700">Create your profile and start matching.</p>
			<div className="mb-6 rounded border p-3">
				<div className="font-medium">Streak: {streak} day(s)</div>
				<div className="text-sm text-gray-600">Next daily suggestion: {nextSuggestionAt ? new Date(nextSuggestionAt).toLocaleString() : 'Available now'}</div>
			</div>
			<div className="flex gap-3">
				<Link to="/discover" className="rounded bg-pink-600 px-4 py-2 text-white">Discover</Link>
				<Link to="/matches" className="rounded border px-4 py-2">Matches</Link>
				<Link to="/profile" className="rounded border px-4 py-2">Edit Profile</Link>
			</div>
		</div>
	)
}