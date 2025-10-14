import { motion } from "framer-motion";
import { ExternalLink, Github, LucideIcon } from "lucide-react";

// 1. Definimos uma interface para as propriedades (props) que o card vai receber.
//    Isso garante a tipagem e nos ajuda a saber exatamente o que o componente espera.
interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  icon: LucideIcon;
  gradient: string;
  demoUrl: string;
  githubUrl: string;
  variants: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number; transition: { duration: number } };
  };
}

// 2. Este é o nosso novo componente, focado exclusivamente em renderizar um card.
const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  icon: Icon, // Renomeamos a prop 'icon' para 'Icon' para usá-la como um componente.
  gradient,
  demoUrl,
  githubUrl,
  variants,
}: ProjectCardProps) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{
        y: -10,
        boxShadow: "var(--shadow-purple)",
        scale: 1.02,
      }}
      className="group bg-gradient-card backdrop-blur-lg rounded-2xl overflow-hidden border border-glass-border shadow-glass hover:border-neon-purple/50 transition-all duration-500 cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
        <div className="absolute top-4 right-4">
          <Icon className="text-neon-cyan" size={24} />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-neon-cyan transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span key={tech} className="px-3 py-1 text-xs bg-muted rounded-full text-muted-foreground border border-glass-border">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex space-x-4">
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={demoUrl} target="_blank" rel="noopener noreferrer" className={`flex-1 bg-gradient-to-r ${gradient} px-4 py-2 rounded-lg text-center font-semibold text-background hover:shadow-neon transition-all duration-300 flex items-center justify-center space-x-2`}>
            <ExternalLink size={16} />
            <span>Demo</span>
          </motion.a>
          
          <motion.a whileHover={{ scale: 1.05, borderColor: "hsl(var(--neon-cyan))" }} whileTap={{ scale: 0.95 }} href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 border border-glass-border px-4 py-2 rounded-lg text-center font-semibold text-foreground hover:bg-hover transition-all duration-300 flex items-center justify-center space-x-2">
            <Github size={16} />
            <span>Code</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;