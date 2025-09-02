import type { DemoUser } from '../data/demoUsers'

export function compatibilityScore(a: DemoUser, b: DemoUser): number {
	let score = 0
	const shared = a.interests.filter((i) => b.interests.includes(i)).length
	score += shared * 20 // up to 60
	if (a.location === b.location) score += 25
	const ageDiff = Math.abs(a.age - b.age)
	score += Math.max(0, 15 - Math.min(15, ageDiff)) // up to 15
	return Math.min(100, score)
}