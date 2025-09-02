import { create } from 'zustand'
import { demoUsers } from '../data/demoUsers'
import { isCleanText } from '../utils/moderation'

export type ChatMessage = {
	id: string
	senderId: string
	recipientId: string
	text: string
	timestamp: number
}

type AppState = {
	feed: string[]
	likes: Record<string, boolean>
	passes: Record<string, boolean>
	blocks: Record<string, boolean>
	matches: Record<string, boolean>
	messages: ChatMessage[]
	refreshFeed: () => void
	likeUser: (userId: string) => void
	passUser: (userId: string) => void
	blockUser: (userId: string) => void
	reportUser: (userId: string, reason: string) => void
	sendMessage: (toUserId: string, text: string, fromUserId: string) => boolean
	getUserById: (id: string) => { id: string; name: string; photos: string[] } | undefined
}

const STORAGE = 'app_state_v1'

function load(): Partial<AppState> | undefined {
	try {
		const raw = localStorage.getItem(STORAGE)
		if (!raw) return undefined
		return JSON.parse(raw)
	} catch {
		return undefined
	}
}

function persist(state: Partial<AppState>) {
	localStorage.setItem(STORAGE, JSON.stringify({
		likes: state.likes,
		passes: state.passes,
		blocks: state.blocks,
		matches: state.matches,
		messages: state.messages,
	}))
}

export const useAppStore = create<AppState>((set, get) => ({
	feed: demoUsers.map((u) => u.id),
	likes: load()?.likes ?? {},
	passes: load()?.passes ?? {},
	blocks: load()?.blocks ?? {},
	matches: load()?.matches ?? {},
	messages: load()?.messages ?? [],
	refreshFeed: () => {
		const { blocks, passes, likes } = get()
		const next = demoUsers
			.filter((u) => !blocks[u.id] && !passes[u.id] && !likes[u.id])
			.map((u) => u.id)
		set({ feed: next })
	},
	likeUser: (userId: string) => {
		const { likes, matches } = get()
		const updatedLikes = { ...likes, [userId]: true }
		// simulate mutual match if userId ends with '1' or '3'
		const mutual = ['1', '3'].some((s) => userId.endsWith(s))
		const updatedMatches = mutual ? { ...matches, [userId]: true } : matches
		persist({ ...get(), likes: updatedLikes, matches: updatedMatches })
		set({ likes: updatedLikes, matches: updatedMatches })
		get().refreshFeed()
	},
	passUser: (userId: string) => {
		const { passes } = get()
		const updated = { ...passes, [userId]: true }
		persist({ ...get(), passes: updated })
		set({ passes: updated })
		get().refreshFeed()
	},
	blockUser: (userId: string) => {
		const { blocks } = get()
		const updated = { ...blocks, [userId]: true }
		persist({ ...get(), blocks: updated })
		set({ blocks: updated })
		get().refreshFeed()
	},
	reportUser: (_userId: string, _reason: string) => {
		// In real app, send to backend; here we no-op
		console.info('Reported user', _userId, _reason)
	},
	sendMessage: (toUserId: string, text: string, fromUserId: string) => {
		if (!isCleanText(text)) return false
		const message = {
			id: `m_${Date.now()}`,
			senderId: fromUserId,
			recipientId: toUserId,
			text,
			timestamp: Date.now(),
		}
		const updated = [...get().messages, message]
		persist({ ...get(), messages: updated })
		set({ messages: updated })
		return true
	},
	getUserById: (id: string) => demoUsers.find((u) => u.id === id),
}))