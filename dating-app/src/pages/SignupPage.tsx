import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import SocialLoginButtons from '../components/SocialLoginButtons'

export default function SignupPage() {
	const navigate = useNavigate()
	const { startOtpFlow } = useAuthStore()
	const [identifier, setIdentifier] = useState('')

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!identifier) return
		startOtpFlow(identifier)
		navigate('/otp')
	}

	return (
		<div className="mx-auto max-w-sm">
			<h1 className="mb-6 text-2xl font-bold">Sign up</h1>
			<SocialLoginButtons />
			<div className="my-4 text-center text-xs text-gray-500">or</div>
			<form onSubmit={onSubmit} className="space-y-4">
				<input
					type="text"
					placeholder="Email or phone"
					value={identifier}
					onChange={(e) => setIdentifier(e.target.value)}
					className="w-full rounded border px-3 py-2"
				/>
				<button type="submit" className="w-full rounded bg-pink-600 py-2 text-white">
					Send OTP
				</button>
			</form>
			<p className="mt-4 text-sm">
				Already have an account? <Link to="/login" className="text-pink-600">Log in</Link>
			</p>
		</div>
	)
}