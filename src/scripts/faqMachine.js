export function faqMachine(initialIndex) {
	let open = initialIndex

	return {
		get: () => open,
		toggle(i) {
			const prev = open
			open = open === i ? -1 : i
			return { prev, next: open }
		},
	}
}
