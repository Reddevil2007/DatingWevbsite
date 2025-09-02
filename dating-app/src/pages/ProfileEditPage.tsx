import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { useProfileStore } from '../stores/profileStore'
import type { UserProfile, Gender } from '../stores/profileStore'

export default function ProfileEditPage() {
	const { userId } = useAuthStore()
	const { profile, loadProfile, saveProfile, addPhoto, removePhotoAt } = useProfileStore()
	const [localProfile, setLocalProfile] = useState<UserProfile | null>(null)

	useEffect(() => {
		if (userId) {
			loadProfile(userId)
		}
	}, [userId, loadProfile])

	useEffect(() => {
		if (profile) setLocalProfile(profile)
	}, [profile])

	function onPhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0]
		if (!file) return
		const reader = new FileReader()
		reader.onload = () => {
			if (typeof reader.result === 'string') {
				addPhoto(reader.result)
			}
		}
		reader.readAsDataURL(file)
	}

	function onSubmit(e: FormEvent) {
		e.preventDefault()
		if (!localProfile) return
		saveProfile(localProfile)
		alert('Profile saved')
	}

	if (!localProfile) {
		return <div>Please log in to edit your profile.</div>
	}

	return (
		<div className="mx-auto max-w-2xl">
			<h1 className="mb-6 text-2xl font-bold">Edit Profile</h1>
			<form onSubmit={onSubmit} className="space-y-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<label className="block">
						<span className="mb-1 block text-sm">Name</span>
						<input
							type="text"
							value={localProfile.name}
							onChange={(e) => setLocalProfile({ ...localProfile, name: e.target.value })}
							className="w-full rounded border px-3 py-2"
						/>
					</label>
					<label className="block">
						<span className="mb-1 block text-sm">Age</span>
						<input
							type="number"
							value={localProfile.age ?? ''}
							onChange={(e) => setLocalProfile({ ...localProfile, age: Number(e.target.value) || null })}
							className="w-full rounded border px-3 py-2"
						/>
					</label>
					<label className="block">
						<span className="mb-1 block text-sm">Gender</span>
						<select
							value={localProfile.gender ?? ''}
							onChange={(e) => setLocalProfile({ ...localProfile, gender: (e.target.value || null) as Gender | null })}
							className="w-full rounded border px-3 py-2"
						>
							<option value="">Select</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="nonbinary">Non-binary</option>
							<option value="prefer_not_say">Prefer not to say</option>
						</select>
					</label>
					<label className="block md:col-span-2">
						<span className="mb-1 block text-sm">Location</span>
						<input
							type="text"
							value={localProfile.location}
							onChange={(e) => setLocalProfile({ ...localProfile, location: e.target.value })}
							className="w-full rounded border px-3 py-2"
						/>
					</label>
					<label className="block md:col-span-2">
						<span className="mb-1 block text-sm">Bio</span>
						<textarea
							value={localProfile.bio}
							onChange={(e) => setLocalProfile({ ...localProfile, bio: e.target.value })}
							className="w-full rounded border px-3 py-2"
							rows={4}
						/>
					</label>
					<label className="block md:col-span-2">
						<span className="mb-1 block text-sm">Interests (comma separated)</span>
						<input
							type="text"
							value={localProfile.interests.join(', ')}
							onChange={(e) => setLocalProfile({ ...localProfile, interests: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
							className="w-full rounded border px-3 py-2"
						/>
					</label>
				</div>

				<div>
					<span className="mb-2 block text-sm font-medium">Photos</span>
					<div className="mb-3 grid grid-cols-3 gap-2">
						{localProfile.photos.map((src, i) => (
							<div key={i} className="relative">
								<img src={src} className="h-28 w-full rounded object-cover" />
								<button type="button" onClick={() => removePhotoAt(i)} className="absolute right-1 top-1 rounded bg-black/60 px-2 py-0.5 text-xs text-white">✕</button>
							</div>
						))}
					</div>
					<input type="file" accept="image/*" onChange={onPhotoUpload} />
				</div>

				<div className="flex justify-end">
					<button type="submit" className="rounded bg-pink-600 px-4 py-2 text-white">Save</button>
				</div>
			</form>
		</div>
	)
}