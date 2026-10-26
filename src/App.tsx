import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteConfig, type LinkItem } from './config'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.22, 1, 0.36, 1] as const
const logoUrl = `${import.meta.env.BASE_URL}mts-logo.png`

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function LinkCard({ item, index, onPlaceholder }: { item: LinkItem; index: number; onPlaceholder: (label: string) => void }) {
  const reduced = useReducedMotion()

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.href === '#') {
      event.preventDefault()
      onPlaceholder(item.label)
    }
  }

  return (
    <motion.a
      href={item.href}
      target={item.external && item.href !== '#' ? '_blank' : undefined}
      rel={item.external ? 'noreferrer' : undefined}
      onClick={handleClick}
      className={`link-card ${item.featured ? 'link-card--featured' : ''}`}
      whileHover={reduced ? undefined : { y: -4 }}
      whileTap={reduced ? undefined : { scale: 0.985 }}
      aria-label={`${item.label}: ${item.description}`}
    >
      <span className="card-index">0{index + 1}</span>
      <span className="card-copy">
        <span className="card-eyebrow">{item.eyebrow}</span>
        <span className="card-title">{item.label}</span>
        <span className="card-description">{item.description}</span>
      </span>
      <span className="card-arrow"><ArrowIcon /></span>
      {item.featured && <span className="featured-mark">em destaque</span>}
    </motion.a>
  )
}

export default function App() {
  const shellRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [toast, setToast] = useState<string | null>(null)
  const [introComplete, setIntroComplete] = useState(reduced)

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 2500)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (reduced) setIntroComplete(true)
  }, [reduced])

  useLayoutEffect(() => {
    if (reduced || !shellRef.current) return

    const context = gsap.context(() => {
      const logo = shellRef.current?.querySelector('.brand-logo')
      const cards = gsap.utils.toArray<HTMLElement>('.link-card')

      if (logo) {
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const shouldShow = self.scroll() < 72 || self.direction === -1
            gsap.to(logo, {
              autoAlpha: shouldShow ? 1 : 0,
              y: shouldShow ? 0 : -18,
              scale: shouldShow ? 1 : 0.88,
              duration: 0.38,
              ease: 'power3.out',
              overwrite: true,
            })
          },
        })
      }

      gsap.to('.hero', {
        yPercent: -12,
        opacity: 0.58,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top 18%',
          end: 'bottom top',
          scrub: 0.7,
        },
      })

      gsap.to('.accent-line', {
        xPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })

      gsap.to('.ambient--one', {
        y: 180,
        x: -70,
        scale: 1.24,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 1.2 },
      })

      gsap.set(cards, { opacity: 0, y: 54, scale: 0.98 })
      ScrollTrigger.batch(cards, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.11,
          ease: 'power3.out',
          overwrite: true,
        }),
      })

      gsap.to('.scroll-progress', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.2 },
      })
    }, shellRef)

    return () => context.revert()
  }, [reduced])

  return (
    <div className="site-shell" ref={shellRef}>
      <AnimatePresence>
        {!introComplete && (
          <motion.div
            className="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.55, ease } }}
          >
            <motion.img
              src={logoUrl}
              alt=""
              initial={{ opacity: 0, scale: 0.82, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease }}
              onAnimationComplete={() => window.setTimeout(() => setIntroComplete(true), 350)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      <div className="noise" />
      <div className="scroll-progress" aria-hidden="true" />

      <header className="topbar">
        <motion.img
          src={logoUrl}
          alt="MTS Store"
          className="brand-logo"
          initial={reduced ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease }}
        />
        <motion.div
          className="status"
          initial={reduced ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease }}
        >
          <span className="status-dot" />
          {siteConfig.availability}
        </motion.div>
      </header>

      <main>
        <section className="hero">
          <motion.p
            className="hero-kicker"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease }}
          >
            Bem-vindo à experiência MTS <span>↗</span>
          </motion.p>
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
          >
            {siteConfig.headline.split('\n').map((line, index) => (
              <span key={line} className={index === 1 ? 'accent-line' : undefined}>{line}</span>
            ))}
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.48, ease }}
          >
            {siteConfig.description}
          </motion.p>
        </section>

        <section className="links" aria-label="Links da MTS Store">
          {siteConfig.links.map((item, index) => (
            <LinkCard key={item.id} item={item} index={index} onPlaceholder={(label) => setToast(`${label}: adicione o destino em src/config.ts`)} />
          ))}
        </section>
      </main>

      <motion.footer
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <span>{siteConfig.handle}</span>
        <span className="footer-center">MTS / {new Date().getFullYear()}</span>
        <button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href).then(() => setToast('Link copiado'))}>
          compartilhar
        </button>
      </motion.footer>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
