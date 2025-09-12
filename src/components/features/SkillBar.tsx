import { motion } from 'framer-motion';
import type { SkillBarProps } from '../../types';

const SkillBar = ({ skill }: SkillBarProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'bg-green-500';
      case 'advanced':
        return 'bg-blue-500';
      case 'intermediate':
        return 'bg-yellow-500';
      case 'beginner':
        return 'bg-gray-500';
      default:
        return 'bg-accent';
    }
  };

  const getLevelWidth = (weight: number) => {
    return `${weight}%`;
  };

  return (
    <div className="p-4 bg-surface rounded-lg border border-surface hover:border-accent/50 transition-colors">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">{skill.name}</h3>
        <span className="text-sm text-muted capitalize">{skill.level}</span>
      </div>
      
      <div className="w-full bg-background rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${getLevelColor(skill.level)}`}
          initial={{ width: 0 }}
          whileInView={{ width: getLevelWidth(skill.weight) }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      <div className="mt-2 text-right">
        <span className="text-xs text-muted">{skill.weight}%</span>
      </div>
    </div>
  );
};

export default SkillBar;
