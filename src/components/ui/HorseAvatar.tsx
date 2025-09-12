import { motion } from 'framer-motion';

const HorseAvatar = ({ className = 'w-12 h-12' }: { className?: string }) => {
  return (
    <motion.div
      className={`${className} relative`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#gradient)"
          stroke="#0a84ff"
          strokeWidth="2"
        />

        {/* Horse head */}
        <path
          d="M30 45 Q35 35 45 38 Q55 35 65 40 Q70 45 68 55 Q65 65 55 68 Q45 70 35 65 Q28 58 30 45Z"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="1"
        />

        {/* Horse mane */}
        <path
          d="M35 38 Q40 30 48 35 Q52 28 58 32 Q62 25 68 30"
          fill="none"
          stroke="#654321"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Eyes */}
        <circle cx="42" cy="48" r="3" fill="#000" />
        <circle cx="58" cy="48" r="3" fill="#000" />
        <circle cx="43" cy="47" r="1" fill="#fff" />
        <circle cx="59" cy="47" r="1" fill="#fff" />

        {/* Nose */}
        <ellipse cx="50" cy="58" rx="4" ry="2" fill="#654321" />
        <path
          d="M48 58 Q50 60 52 58"
          stroke="#000"
          strokeWidth="1"
          fill="none"
        />

        {/* Ears */}
        <path
          d="M38 42 Q40 38 42 42"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="1"
        />
        <path
          d="M58 42 Q60 38 62 42"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="1"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0a84ff" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default HorseAvatar;
