import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function collapseLogoOnScroll() {
	const rest = gsap.utils.toArray('.logo-rest')
	const wrap = document.getElementById('logo-text')
	if (!rest.length || !wrap) return

	const widths = rest.map((el) => el.getBoundingClientRect().width)
	rest.forEach((el, i) => gsap.set(el, { width: widths[i] }))

	const collapse = () => {
		gsap
			.timeline()
			.to(rest, { opacity: 0, ease: 'power2.out', duration: 0.3, overwrite: 'auto' }, 0)
			.to(rest, { width: 0, ease: 'power2.out', duration: 0.2, overwrite: 'auto' }, 0.1)
			.to(wrap, { gap: 0, ease: 'power2.out', duration: 0.2, overwrite: 'auto' }, 0.1	)
	}

	const expand = () => {
		gsap
			.timeline()
			.to(wrap, { gap: '0.5rem', ease: 'power3.inOut', duration: 0.2, overwrite: 'auto' }, 0)
			.to(
				rest,
				{
					width: (i) => widths[i],
					ease: 'power3.inOut',
					duration: 0.2,
					overwrite: 'auto',
				},
				0,
			)
			.to(rest, { opacity: 1, ease: 'power2.out', duration: 0.2, overwrite: 'auto' }, 0.1)
	}

	ScrollTrigger.create({
		start: '100px top',
		onEnter: collapse,
		onLeaveBack: expand,
	})
}
