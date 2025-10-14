import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Sparkles, Zap, Brain, Code } from "lucide-react";
import projectImage1 from "@/assets/project-ai-dashboard.jpg"; 
import projectImage3 from "@/assets/project-analytics.jpg";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const projects = [
    {
      title: "AI Dashboard Analytics",
      description: "Dashboard interativo com integração de IA para análise de dados em tempo real. Desenvolvido com React, TypeScript e APIs de Machine Learning.",
      image: projectImage1,
      technologies: ["React", "TypeScript", "AI/ML", "Tailwind"],
      icon: Brain,
      gradient: "from-neon-blue to-neon-purple",
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "E-commerce Futurista",
      description: "Plataforma de e-commerce moderna com design futurista, carrinho inteligente e recomendações personalizadas por IA.",
      image: "public/images/neoshop.jpg",
      technologies: ["Next.js", "Supabase", "Framer Motion", "Stripe"],
      icon: Zap,
      gradient: "from-neon-purple to-neon-cyan",
      demoUrl: "https://caiohvboas.github.io/astral-store/#/",
      githubUrl: "https://github.com/Caiohvboas/astral-store"
    },
    {
      title: "Code Generator AI",
      description: "Ferramenta de geração automática de código usando IA, com interface intuitiva e suporte a múltiplas linguagens de programação.",
      image: projectImage3,
      technologies: ["React", "OpenAI", "Monaco Editor", "Node.js"],
      icon: Code,
      gradient: "from-neon-cyan to-neon-green",
      demoUrl: "#",
      githubUrl: "#"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-secondary opacity-5" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Projetos em Destaque
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluções inovadoras que combinam design moderno, tecnologia avançada e 
            inteligência artificial para criar experiências extraordinárias.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              variants={itemVariants}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            whileHover={{ 
              scale: 1.05,
              boxShadow: "var(--shadow-neon)"
            }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-gradient-primary px-8 py-4 rounded-full text-primary-foreground font-semibold text-lg hover:shadow-neon transition-all duration-300"
          >
            <Github size={20} />
            <span>Ver Todos no GitHub</span>
            <Sparkles size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;