import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function collapseLogoOnScroll() {
	const rest = gsap.utils.toArray('.logo-rest')
	const wrap = document.getElementById('logo-text')
	if (!rest.length || !wrap) return

	const widths = rest.map((el) => el.getBoundingClientRect().width)
	rest.forEach((el, i) => gsap.set(el, { width: widths[i] }))

	const collapse = () => {
		gsap.to(rest, { width: 0, opacity: 0, ease: 'power2.out', duration: 0.6, overwrite: true })
		gsap.to(wrap, { gap: 0, ease: 'power2.out', duration: 0.6, overwrite: true })
	}

	const expand = () => {
		rest.forEach((el, i) =>
			gsap.to(el, {
				width: widths[i],
				opacity: 1,
				ease: 'power3.inOut', // distinct feel for the "return" direction
				duration: 0.3,
				overwrite: true,
			}),
		)
		gsap.to(wrap, { gap: '0.5rem', ease: 'power3.inOut', duration: 0.2, overwrite: true })
	}

	ScrollTrigger.create({
		start: '100px top',
		onEnter: collapse,
		onLeaveBack: expand,
	})
}
