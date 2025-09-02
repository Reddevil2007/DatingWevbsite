import { useParams } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { useAppStore } from '../stores/appStore'
import { useMemo, useState } from 'react'

export default function ChatPage() {
	const { userId } = useAuthStore()
	const { id: peerId } = useParams()
	const { messages, sendMessage, getUserById } = useAppStore()
	const peer = peerId ? getUserById(peerId) : undefined
	const [text, setText] = useState('')

	const thread = useMemo(() => {
		if (!userId || !peerId) return []
		return messages.filter(
			(m) => (m.senderId === userId && m.recipientId === peerId) || (m.senderId === peerId && m.recipientId === userId),
		)
	}, [messages, userId, peerId])

	function onSend(e: React.FormEvent) {
		e.preventDefault()
		if (!userId || !peerId || !text.trim()) return
		const ok = sendMessage(peerId, text.trim(), userId)
		if (ok) setText('')
	}

	if (!peer) return <div>Chat not found</div>

	return (
		<div className="mx-auto flex h-[70vh] max-w-md flex-col">
			<h1 className="mb-2 text-xl font-bold">Chat with {peer.name}</h1>
			<div className="flex-1 space-y-2 overflow-y-auto rounded border p-2">
				{thread.map((m) => (
					<div key={m.id} className={`max-w-[80%] rounded px-2 py-1 ${m.senderId === userId ? 'ml-auto bg-pink-600 text-white' : 'bg-gray-100'}`}>
						{m.text}
					</div>
				))}
			</div>
			<form onSubmit={onSend} className="mt-2 flex gap-2">
				<input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 rounded border px-3 py-2" placeholder="Type a message" />
				<button className="rounded bg-pink-600 px-3 py-2 text-white">Send</button>
			</form>
		</div>
	)
}