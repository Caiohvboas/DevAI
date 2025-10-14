import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Lightbulb, Rocket, Zap } from "lucide-react";

// 1. Mapeamento de Cores para Classes Tailwind
//    Criamos um objeto que mapeia os nomes das cores para as classes de gradiente correspondentes.
//    Isso centraliza a lógica de estilo, tornando-a mais limpa e fácil de modificar.
const skillColorMap: { [key: string]: string } = {
  'neon-blue': 'from-blue-500 to-blue-400',
  'neon-purple': 'from-purple-500 to-pink-500',
  'neon-cyan': 'from-cyan-500 to-teal-400',
  'neon-green': 'from-green-500 to-emerald-400',
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skills = [
    { name: "React & Next.js", level: 90, color: "neon-blue" },
    { name: "TypeScript", level: 85, color: "neon-purple" },
    { name: "Tailwind CSS", level: 95, color: "neon-cyan" },
    { name: "AI Integration", level: 80, color: "neon-green" },
  ];

  const features = [
    {
      icon: Code2,
      title: "Código Limpo",
      description: "Desenvolvimento com foco em qualidade, performance e manutenibilidade."
    },
    {
      icon: Lightbulb,
      title: "Aprendizado Contínuo",
      description: "Sempre explorando novas tecnologias e metodologias de desenvolvimento."
    },
    {
      icon: Rocket,
      title: "Inovação",
      description: "Criando soluções criativas e eficientes para problemas complexos."
    },
    {
      icon: Zap,
      title: "IA & Automação",
      description: "Integrando Inteligência Artificial para otimizar processos e experiências."
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-card opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Sobre Mim
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Desenvolvedor Front-End apaixonado por tecnologia e inovação, especializado em criar 
            experiências digitais excepcionais usando as mais modernas ferramentas e técnicas, 
            incluindo Inteligência Artificial.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-8 border border-glass-border shadow-glass">
              <h3 className="text-2xl font-bold mb-6 text-neon-cyan">Habilidades Técnicas</h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-foreground font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          {/* 2. Uso do Mapeamento de Cores */}
                          {/*    Agora, construímos a classe dinamicamente usando o objeto `skillColorMap`. */}
                          {/*    O código fica muito mais limpo e direto. */}
                          <motion.div
                            className={`h-full bg-gradient-to-r ${skillColorMap[skill.color] || 'from-primary to-secondary'} rounded-full`}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                          />
                        </div>
                      </div>
                  ))}
                </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "var(--shadow-purple)",
                }}
                className="bg-gradient-card backdrop-blur-lg rounded-xl p-6 border border-glass-border hover:border-neon-purple/50 transition-all duration-300 cursor-pointer"
              >
                <feature.icon className="text-neon-cyan mb-4" size={32} />
                <h4 className="text-lg font-semibold mb-2 text-foreground">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-8 border border-glass-border shadow-glass max-w-4xl mx-auto">
            <blockquote className="text-xl md:text-2xl font-light italic text-muted-foreground leading-relaxed">
              "A tecnologia não é apenas minha profissão, é minha paixão. Cada linha de código 
              é uma oportunidade de criar algo extraordinário e resolver problemas reais."
            </blockquote>
            <div className="mt-6 flex justify-center">
              <div className="w-20 h-1 bg-gradient-primary rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;