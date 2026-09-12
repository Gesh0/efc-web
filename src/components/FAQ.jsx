import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const HEIGHT_DURATION = 0.2
const OPACITY_DURATION = 0.1

const questions = [
  {
    question: 'How long does it take to get set up and integrated?',
    answer:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam molestias eligendi saepe quia dolore magnam odit asperiores, culpa numquam provident corporis illum quo sint, eius iste iusto optio. Dolores minima fugiat laborum perspiciatis voluptatem exercitationem est totam, consequatur commodi voluptates fuga recusandae, inventore in perferendis similique, aut quasi cumque dicta!',
  },
  {
    question: 'How will I know if the returned goods are damaged',
    answer:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam molestias eligendi saepe quia dolore magnam odit asperiores, culpa numquam provident corporis illum quo sint, eius iste iusto optio.',
  },
  {
    question: 'What happens if the order is damaged in transport',
    answer:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam molestias eligendi saepe quia dolore magnam odit asperiores, culpa numquam provident corporis illum quo sint, eius iste iusto optio.',
  },
]

function FAQItem({ question, answer, isOpen, onToggle, register }) {
  const clipRef = useRef(null)
  const textRef = useRef(null)

  useLayoutEffect(() => {
    register(clipRef.current, textRef.current)
    gsap.set(clipRef.current, { height: isOpen ? 'auto' : 0, paddingTop: isOpen ? '1rem' : 0 })
    gsap.set(textRef.current, { opacity: isOpen ? 1 : 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex-col  stroke-t py2" onClick={onToggle} style={{ cursor: 'pointer' }}>
      <h5>{question}</h5>
      <div ref={clipRef} className="faq-clip">
        <p ref={textRef}>{answer}</p>
      </div>
    </div>
  )
}

function addExpand(tl, clip, text, at) {
  const currentHeight = clip.getBoundingClientRect().height
  gsap.set(clip, { height: 'auto', paddingTop: '1rem' })
  const finalHeight = clip.scrollHeight
  gsap.set(clip, { height: currentHeight, paddingTop: 0 })

  tl.to(clip, { height: finalHeight, paddingTop: '1rem', ease: 'none', duration: HEIGHT_DURATION }, at)
  tl.to(text, { opacity: 1, ease: 'none', duration: OPACITY_DURATION }, at + HEIGHT_DURATION - OPACITY_DURATION)
}

function addCollapse(tl, clip, text, at) {
  tl.to(text, { opacity: 0, ease: 'none', duration: OPACITY_DURATION }, at)
  tl.to(clip, { height: 0, paddingTop: 0, ease: 'none', duration: HEIGHT_DURATION }, at)
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const openIndexRef = useRef(openIndex)
  const nodesRef = useRef([])

  const registerAt = (index) => (clip, text) => {
    nodesRef.current[index] = { clip, text }
  }

  const toggle = (index) => {
    const previousIndex = openIndexRef.current
    const nextIndex = previousIndex === index ? -1 : index
    openIndexRef.current = nextIndex
    setOpenIndex(nextIndex)

    const tl = gsap.timeline({ defaults: { overwrite: true } })

    if (previousIndex !== -1 && nodesRef.current[previousIndex]) {
      const { clip, text } = nodesRef.current[previousIndex]
      addCollapse(tl, clip, text, 0)
    }
    if (nextIndex !== -1 && nodesRef.current[nextIndex]) {
      const { clip, text } = nodesRef.current[nextIndex]
      addExpand(tl, clip, text, 0)
    }
  }

  return (
    <div className="flex g2 p4 outline">
      <div className="flex-col g4 grow">
        <h2>Good things to know before working with us</h2>
        <div>
          {questions.map((item, index) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
              register={registerAt(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
