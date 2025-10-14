import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Code, Sparkles, Brain } from "lucide-react";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const fullText = "Front-End em evolução constante, aprendendo com IA e resolvendo problemas reais.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Aguarda um pouco após o carregamento para garantir que tudo está estável
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const floatingIcons = [
    { Icon: Code, delay: 0, x: "10%", y: "20%" },
    { Icon: Sparkles, delay: 0.2, x: "80%", y: "30%" },
    { Icon: Brain, delay: 0.4, x: "20%", y: "70%" },
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero animate-gradient opacity-20" />
      
      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-neon-cyan/30"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={40} />
        </motion.div>
      ))}

      {/* Particle Effect Background */}
      {isLoaded && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => {
            const initialX = (i * 100) % window.innerWidth;
            const initialY = (i * 150) % window.innerHeight;
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-neon-blue rounded-full"
                initial={{
                  x: initialX,
                  y: initialY,
                  opacity: 0,
                }}
                animate={{
                  x: [initialX, initialX + 200, initialX - 100],
                  y: [initialY, initialY - 150, initialY + 100],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "linear",
                }}
                style={{
                  filter: "blur(0.5px)",
                }}
              />
            );
          })}
        </div>
      )}

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Developer
            </span>{" "}
            <span className="text-foreground">do</span>{" "}
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Futuro
            </span>
          </motion.h1>

          <motion.div
            className="text-xl md:text-2xl text-muted-foreground mb-12 h-16 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span>
              {typedText}
            </span>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "var(--shadow-neon)",
                background: "var(--gradient-primary)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-primary px-8 py-4 rounded-full text-primary-foreground font-semibold text-lg hover:shadow-neon transition-all duration-300"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Projetos
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.05,
                borderColor: "hsl(var(--neon-cyan))",
                color: "hsl(var(--neon-cyan))"
              }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-glass-border px-8 py-4 rounded-full text-foreground font-semibold text-lg backdrop-blur-sm hover:bg-hover transition-all duration-300"
              onClick={() => document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Chat com IA
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;