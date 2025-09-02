import { create } from 'zustand'

export type Gender = 'male' | 'female' | 'nonbinary' | 'prefer_not_say'

export type UserProfile = {
	id: string
	name: string
	age: number | null
	gender: Gender | null
	location: string
	bio: string
	interests: string[]
	photos: string[] // data URLs
}

type ProfileState = {
	profile: UserProfile | null
	saveProfile: (profile: UserProfile) => void
	loadProfile: (userId: string) => void
	addPhoto: (dataUrl: string) => void
	removePhotoAt: (index: number) => void
}

const STORAGE_KEY = 'userProfile'

export const useProfileStore = create<ProfileState>((set, get) => ({
	profile: null,
	saveProfile: (profile: UserProfile) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
		set({ profile })
	},
	loadProfile: (userId: string) => {
		const raw = localStorage.getItem(STORAGE_KEY)
		if (raw) {
			try {
				const parsed: UserProfile = JSON.parse(raw)
				set({ profile: parsed })
				return
			} catch {}
		}
		// initialize an empty profile for new users
		set({
			profile: {
				id: userId,
				name: '',
				age: null,
				gender: null,
				location: '',
				bio: '',
				interests: [],
				photos: [],
			},
		})
	},
	addPhoto: (dataUrl: string) => {
		const current = get().profile
		if (!current) return
		const updated = { ...current, photos: [...current.photos, dataUrl] }
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
		set({ profile: updated })
	},
	removePhotoAt: (index: number) => {
		const current = get().profile
		if (!current) return
		const updated = { ...current, photos: current.photos.filter((_, i) => i !== index) }
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
		set({ profile: updated })
	},
}))