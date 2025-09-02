import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

export default function OtpPage() {
	const navigate = useNavigate()
	const { completeOtpFlow, pendingIdentifier } = useAuthStore()
	const [otp, setOtp] = useState('')

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!otp) return
		const success = completeOtpFlow(otp)
		if (success) {
			navigate('/')
		}
	}

	return (
		<div className="mx-auto max-w-sm">
			<h1 className="mb-2 text-2xl font-bold">Enter OTP</h1>
			<p className="mb-6 text-sm text-gray-600">Sent to {pendingIdentifier}</p>
			<form onSubmit={onSubmit} className="space-y-4">
				<input
					type="text"
					placeholder="6-digit code"
					value={otp}
					onChange={(e) => setOtp(e.target.value)}
					className="w-full rounded border px-3 py-2 tracking-widest"
				/>
				<button type="submit" className="w-full rounded bg-pink-600 py-2 text-white">
					Verify
				</button>
			</form>
		</div>
	)
}