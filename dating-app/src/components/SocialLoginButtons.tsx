import { useAuthStore } from '../stores/authStore'

export default function SocialLoginButtons() {
	const { startOtpFlow } = useAuthStore()

	function mockSocial(provider: 'google' | 'facebook' | 'apple') {
		// In real app, redirect to OAuth. Here, set identifier and move to OTP.
		startOtpFlow(`${provider}@example.com`)
		window.location.href = '/otp'
	}

	return (
		<div className="space-y-2">
			<button onClick={() => mockSocial('google')} className="w-full rounded border px-3 py-2">
				Continue with Google
			</button>
			<button onClick={() => mockSocial('facebook')} className="w-full rounded border px-3 py-2">
				Continue with Facebook
			</button>
			<button onClick={() => mockSocial('apple')} className="w-full rounded border px-3 py-2">
				Continue with Apple
			</button>
		</div>
	)
}