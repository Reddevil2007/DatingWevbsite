import { create } from 'zustand'

const KEY = 'engagement_v1'

type EngagementState = {
	lastLoginAt: number | null
	streak: number
	nextSuggestionAt: number | null
	markLogin: () => void
	markSuggestionConsumed: () => void
}

function load() {
	try {
		const raw = localStorage.getItem(KEY)
		return raw ? JSON.parse(raw) : null
	} catch {
		return null
	}
}

function save(data: any) {
	localStorage.setItem(KEY, JSON.stringify(data))
}

export const useEngagementStore = create<EngagementState>((set, get) => ({
	lastLoginAt: load()?.lastLoginAt ?? null,
	streak: load()?.streak ?? 0,
	nextSuggestionAt: load()?.nextSuggestionAt ?? null,
	markLogin: () => {
		const now = Date.now()
		const prev = get().lastLoginAt
		let streak = get().streak
		if (prev) {
			const oneDay = 24 * 60 * 60 * 1000
			const diff = now - prev
			if (diff < 2 * oneDay && diff > oneDay * 0.5) streak += 1
			else if (diff >= 2 * oneDay) streak = 1
			else streak = Math.max(1, streak)
		} else {
			streak = 1
		}
		save({ ...get(), lastLoginAt: now, streak })
		set({ lastLoginAt: now, streak })
	},
	markSuggestionConsumed: () => {
		const next = Date.now() + 24 * 60 * 60 * 1000
		save({ ...get(), nextSuggestionAt: next })
		set({ nextSuggestionAt: next })
	},
}))