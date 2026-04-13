import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const Pet = ({ state }) => {
  return (
    <div className="pet-container">
      <div className="pet-avatar-wrapper">
        <div className="pet-glow"></div>
        <motion.div 
          className="pet-avatar"
          animate={{ 
            y: [0, -10, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          🐱
        </motion.div>
      </div>
      
      <div className="pet-info">
        <h2 className="pet-name">Buddy</h2>
        <div className="pet-status-badge">
          <Heart size={12} fill="currentColor" />
          <span>{state}</span>
        </div>
      </div>
    </div>
  )
}

export default Pet
