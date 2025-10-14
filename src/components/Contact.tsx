import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, Send, MessageSquare, User, MapPin } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

  // Definindo o esquema de validação com Zod
  const contactFormSchema = z.object({
    name: z.string().min(3, { message: "O nome precisa ter pelo menos 3 caracteres." }),
    email: z
      .string()
      .email({ message: "Formato de e-mail inválido." })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, { message: "Endereço de e-mail inválido." }),
    message: z.string().min(10, { message: "A mensagem precisa ter pelo menos 10 caracteres." }),
  });

  // 1. Tipagem inferida a partir do schema do Zod
  type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { toast } = useToast();

  // 2. `useForm` gerencia todo o estado do formulário (valores, erros, estado de envio)
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset 
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  // 3. A função de envio agora recebe os dados já validados.
  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch(import.meta.env.VITE_N8N_CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar a mensagem.');
      }

      toast({
        title: "Mensagem enviada! ✨",
        description: "Obrigado pelo contato! Responderei em breve.",
      });
      // 4. `reset` limpa o formulário após o envio bem-sucedido.
      reset();

    } catch (error) {
      console.error("Erro no envio do formulário:", error);
      toast({
        title: "Erro no envio",
        description: "Houve um problema ao enviar sua mensagem. Tente novamente mais tarde.",
        variant: "default",
        className: "border-destructive bg-background text-foreground"
      });
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Caiohvboas',
      color: 'neon-blue',
      hoverColor: 'hover:text-neon-blue'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/caio-henrique-36b470181/',
      color: 'neon-cyan',
      hoverColor: 'hover:text-neon-cyan'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:caio.boas@hotmail.com',
      color: 'neon-purple',
      hoverColor: 'hover:text-neon-purple'
    }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Localização',
      value: 'Brasil - Remoto',
      color: 'neon-green'
    },
    {
      icon: MessageSquare,
      label: 'Resposta',
      value: 'Em até 24h',
      color: 'neon-cyan'
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
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
              Vamos Conversar?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pronto para criar algo incrível? Entre em contato e vamos discutir 
            como posso ajudar a transformar suas ideias em realidade digital.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-8 border border-glass-border shadow-glass">
              <h3 className="text-2xl font-bold mb-6 text-neon-cyan flex items-center space-x-3">
                <Send size={24} />
                <span>Envie uma Mensagem</span>
              </h3>

              {/* 5. `handleSubmit` do react-hook-form faz a validação antes de chamar `onSubmit` */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                      // 6. `register` conecta o input ao estado do formulário.
                      {...register("name")}
                      type="text"
                      className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all duration-300"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  {/* 7. Exibe a mensagem de erro específica para este campo */}
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full pl-12 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all duration-300"
                      placeholder="seu.email@exemplo.com"
                    />
                  </div>
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mensagem
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Conte sobre seu projeto ou ideia..."
                  />
                  {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "var(--shadow-neon)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-primary py-4 rounded-lg text-primary-foreground font-semibold text-lg hover:shadow-neon transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {/* 8. `isSubmitting` agora vem do `formState` */}
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Enviar Mensagem</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <motion.div
                  key={info.label}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="bg-gradient-card backdrop-blur-lg rounded-xl p-6 border border-glass-border hover:border-neon-cyan/50 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-${info.color}/20 rounded-lg flex items-center justify-center`}>
                      <info.icon className={`text-${info.color}`} size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{info.label}</h4>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-8 border border-glass-border shadow-glass">
              <h3 className="text-xl font-bold mb-6 text-foreground">
                Conecte-se Comigo
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center space-x-4 p-4 rounded-lg border border-glass-border hover:border-${social.color}/50 ${social.hoverColor} transition-all duration-300 group`}
                  >
                    <social.icon size={24} className="text-muted-foreground group-hover:text-current" />
                    <span className="font-medium text-foreground group-hover:text-current">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-primary rounded-2xl p-6 text-center"
            >
              <h4 className="text-xl font-bold text-primary-foreground mb-2">
                Pronto para começar?
              </h4>
              <p className="text-primary-foreground/80">
                Vamos criar algo extraordinário juntos!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;