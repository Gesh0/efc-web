import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Moves an oversized image inside a clipped container as its container
 * travels through the viewport. The container must have overflow hidden
 * and the image must be taller than the container (e.g. height: 130%)
 * so there's slack for the translation to draw from.
 * @param {Element} container - the clipped, normally-sized wrapper
 * @param {Element} image - the oversized image inside it
 * @param {{ yPercent?: number }} [opts]
 */
export function parallaxImage(container, image, { yPercent = 15 } = {}) {
	if (!container || !image) return

	// Image starts shifted up, ends shifted down (or vice versa) so the
	// midpoint of its travel lines up with the container's own midpoint.
	gsap.fromTo(
		image,
		{ yPercent: -yPercent },
		{
			yPercent,
			ease: 'none',
			scrollTrigger: {
				trigger: container,
				start: 'top bottom',
				end: 'bottom top',
				scrub: 1.5,
			},
		},
	)
}

export function initParallax() {
	gsap.utils.toArray('.parallax-frame').forEach((container) => {
		const image = container.querySelector('.parallax-image')
		parallaxImage(container, image)
	})
}
