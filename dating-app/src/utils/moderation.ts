const banned = ['badword', 'explicit', 'nsfw']

export function isCleanText(text: string): boolean {
	const lower = text.toLowerCase()
	return !banned.some((w) => lower.includes(w))
}