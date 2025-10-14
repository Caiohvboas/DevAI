import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-glass backdrop-blur-lg border-b border-glass-border shadow-glass' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent cursor-pointer"
          onClick={() => scrollToSection('hero')}
        >
          &lt;DevAI/&gt;
        </motion.div>

        <div className="hidden md:flex space-x-8">
          {[
            { label: 'Início', id: 'hero' },
            { label: 'Sobre', id: 'about' },
            { label: 'Projetos', id: 'projects' },
            { label: 'IA Chat', id: 'chatbot' },
            { label: 'Contato', id: 'contact' }
          ].map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative text-foreground hover:text-neon-cyan transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-primary"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "var(--shadow-neon)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('contact')}
          className="bg-gradient-primary px-6 py-2 rounded-full text-primary-foreground font-semibold hover:shadow-neon transition-all duration-300"
        >
          Contato
        </motion.button>
      </nav>
    </motion.header>
  );
};

export default Header;