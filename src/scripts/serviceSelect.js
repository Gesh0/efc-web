import gsap from 'gsap'

export function initServiceSelect() {
	const tabs = gsap.utils.toArray('.service-tab')
	const slotA = document.getElementById('service-image-slot-a')
	const slotB = document.getElementById('service-image-slot-b')
	const p1 = document.getElementById('service-p1')
	const p2 = document.getElementById('service-p2')
	if (!tabs.length || !slotA || !slotB) return

	let active = slotA
	let staged = slotB

	tabs.forEach((tab) => {
		tab.addEventListener('click', () => {
			if (tab.classList.contains('selected')) return

			tabs.forEach((t) => t.classList.remove('selected'))
			tab.classList.add('selected')

			staged.querySelector('img').src = tab.dataset.image
			gsap.set(staged, { y: '-100%' })

			gsap
				.timeline({ defaults: { overwrite: true } })
				.to(active, { y: '100%', duration: 0.6, ease: 'power3.inOut' }, 0)
				.to(staged, { y: '0%', duration: 0.6, ease: 'power3.inOut' }, 0)
				.to([p1, p2], { y: 8, opacity: 0, duration: 0.2, ease: 'power1.in' }, 0)
				.call(() => {
					p1.textContent = tab.dataset.p1
					p2.textContent = tab.dataset.p2
				}, null, 0.2)
				.fromTo(
					[p1, p2],
					{ y: -8, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
					0.35,
				)

			const next = active
			active = staged
			staged = next
		})
	})
}
