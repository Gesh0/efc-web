import gsap from 'gsap'

/**
 * Fades an element in and slides it up into place as it scrolls into view.
 * @param {Element} el
 * @param {{ duration?: number, y?: number, ease?: string, start?: string }} [opts]
 */
export function fadeUp(el, { duration = 0.8, y = 40, ease = 'power2.out', start = 'top 85%' } = {}) {
	return gsap.to(el, {
		opacity: 1,
		y,
		duration,
		ease,
		scrollTrigger: {
			trigger: el,
			start, // fires when element's top hits 85% down the viewport
			// no `scrub` — this plays once, not tied continuously to scroll position
		},
	})
}
