import { motion, useScroll, useSpring } from 'framer-motion'

// Hairline reading-progress bar along the top edge.
export default function ScrollProgress({ active }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-rosedeep/70"
      style={{ scaleX }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    />
  )
}
