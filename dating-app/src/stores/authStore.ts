import { create } from 'zustand'

type AuthState = {
	userId: string | null
	pendingIdentifier: string | null
	startOtpFlow: (identifier: string) => void
	completeOtpFlow: (otp: string) => boolean
	logout: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
	userId: localStorage.getItem('userId'),
	pendingIdentifier: null,
	startOtpFlow: (identifier: string) => {
		set({ pendingIdentifier: identifier })
		// In real app, send OTP via backend. Here, store a mock code.
		localStorage.setItem('mockOtp', '123456')
	},
	completeOtpFlow: (otp: string) => {
		const expected = localStorage.getItem('mockOtp')
		if (otp === expected) {
			const syntheticUserId = `user_${Date.now()}`
			localStorage.setItem('userId', syntheticUserId)
			set({ userId: syntheticUserId, pendingIdentifier: null })
			return true
		}
		return false
	},
	logout: () => {
		localStorage.removeItem('userId')
		set({ userId: null })
	},
}))