export type DemoUser = {
	id: string
	name: string
	age: number
	gender: 'male' | 'female' | 'nonbinary'
	location: string
	bio: string
	interests: string[]
	photos: string[]
}

export const demoUsers: DemoUser[] = [
	{
		id: 'u1',
		name: 'Alex',
		age: 28,
		gender: 'female',
		location: 'San Francisco',
		bio: 'Coffee lover, trail runner, and indie films.',
		interests: ['running', 'movies', 'coffee'],
		photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop'],
	},
	{
		id: 'u2',
		name: 'Jordan',
		age: 31,
		gender: 'male',
		location: 'New York',
		bio: 'Foodie and traveler. Ask me about Tokyo!',
		interests: ['food', 'travel', 'music'],
		photos: ['https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=800&auto=format&fit=crop'],
	},
	{
		id: 'u3',
		name: 'Sam',
		age: 26,
		gender: 'nonbinary',
		location: 'Austin',
		bio: 'Guitar, gaming, and great conversations.',
		interests: ['gaming', 'music', 'tech'],
		photos: ['https://images.unsplash.com/photo-1541534401786-2077eed87a9f?q=80&w=800&auto=format&fit=crop'],
	},
]