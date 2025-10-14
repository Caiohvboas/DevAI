import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Bot, Send, User, Sparkles } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { nanoid } from 'nanoid';

interface Message {
  id: string | number;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

const ChatBot = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [messages, setMessages] = useState<Message[]>([
    {
      id: nanoid(),
      type: 'bot',
      text: 'Olá! 👋 Sou a IA assistente deste portfólio. Pergunte sobre as habilidades, projetos ou experiências!',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // 1. Criamos uma referência para o contêiner das mensagens.
  //    É este elemento que tem a barra de rolagem (overflow-y-auto).
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // 2. Usamos o `useEffect` para observar mudanças no array de `messages`.
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      // 3. Quando uma nova mensagem é adicionada, rolamos o contêiner para o final.
      //    `scrollTop` é a posição da rolagem, e `scrollHeight` é a altura total do conteúdo.
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]); // A dependência `messages` garante que isso execute a cada nova mensagem.

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userInput = inputValue; // Capture the input before clearing

    const newMessage: Message = {
      id: nanoid(),
      type: 'user',
      text: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: userInput }),
      });

      if (!response.ok) {
        throw new Error('A resposta da rede não foi ok.');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: nanoid(),
        type: 'bot',
        text: data.reply || "Desculpe, não consegui processar sua resposta.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro ao buscar resposta da IA:", error instanceof Error ? error.message : error);
      const errorMessage: Message = { id: nanoid(), type: 'bot', text: 'Oops! Algo deu errado. Tente novamente.', timestamp: new Date() };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestedQuestions = [
    "Quais são suas habilidades?",
    "Fale sobre seus projetos",
    "Experiência com IA",
    "Como posso te contatar?"
  ];

  return (
    <section id="chatbot" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Chat com IA Assistente
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Converse comigo! Esta IA simula respostas sobre minhas habilidades, 
            projetos e experiências. Uma demonstração de interatividade moderna.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-card backdrop-blur-lg rounded-2xl border border-glass-border shadow-glass overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-primary p-4 flex items-center space-x-3">
              <div className="w-10 h-10 bg-neon-cyan/20 rounded-full flex items-center justify-center">
                <Bot className="text-neon-cyan" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">IA Assistente</h3>
                <p className="text-sm text-primary-foreground/80">Online agora</p>
              </div>
              <div className="ml-auto">
                <Sparkles className="text-neon-cyan animate-pulse" size={20} />
              </div>
            </div>

            {/* Messages Area */}
            <div ref={messagesContainerRef} className="h-96 overflow-y-auto p-6 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    layout
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex space-x-3 max-w-xs lg:max-w-md ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' 
                          ? 'bg-gradient-primary' 
                          : 'bg-neon-cyan/20'
                      }`}>
                        {message.type === 'user' ? (
                          <User size={16} className="text-primary-foreground" />
                        ) : (
                          <Bot size={16} className="text-neon-cyan" />
                        )}
                      </div>
                      <div className={`px-4 py-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground border border-glass-border'
                      }`}>
                        <div className="prose prose-sm prose-invert max-w-none text-sm text-inherit">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.text}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-neon-cyan/20 rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-neon-cyan" />
                    </div>
                    <div className="px-4 py-3 bg-muted rounded-2xl border border-glass-border">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Suggested Questions */}
            <div className="px-6 py-3 border-t border-glass-border">
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <motion.button
                    key={question}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setInputValue(question)}
                    className="px-3 py-1 text-sm bg-hover rounded-full text-muted-foreground hover:text-neon-cyan border border-glass-border hover:border-neon-cyan/50 transition-all duration-300"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-glass-border">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua pergunta..."
                  className="flex-1 bg-input border border-border rounded-full px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "var(--shadow-neon)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendMessage}
                  className="bg-gradient-primary p-3 rounded-full text-primary-foreground hover:shadow-neon transition-all duration-300"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatBot;