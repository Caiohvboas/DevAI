# TODO: Integração n8n com Chatbot e Gemini

## Passos para Criar o Workflow no n8n
- [x] Iniciar o n8n localmente (`npm run n8n`)
- [x] Acessar http://localhost:5678 e fazer login (admin/senha123)
- [x] Criar novo workflow chamado "Chatbot Gemini"
- [x] Adicionar nó Webhook (para receber mensagens do chatbot)
- [x] Configurar Webhook: Método POST, Path /chat, Testar webhook
- [x] Adicionar nó Google Gemini: Conectar com API key do Google (usuário precisa fornecer)
- [x] Configurar Gemini: Prompt para responder mensagens, usar dados do webhook
- [ ] Adicionar nó HTTP Request: Para enviar resposta de volta ao chatbot (POST para localhost:3000/api/chat/response) - NÃO NECESSÁRIO, usar resposta direta do webhook
- [ ] Testar workflow: Enviar POST para webhook e verificar resposta (workflow iniciado, mas resposta não retornada)
- [x] Salvar e ativar workflow

## Integração no React (ChatBot.tsx)
- [x] Ler ChatBot.tsx para entender estrutura atual (já implementado com fetch para webhook)
- [x] Verificar se VITE_N8N_WEBHOOK_URL está definido no .env.local
- [x] Modificar para enviar mensagens via fetch para webhook do n8n (já tem implementação básica)
- [x] Receber resposta do n8n e exibir no chat (já implementado)
- [ ] Adicionar endpoint /api/chat/response no backend (se necessário) ou usar diretamente no frontend

## Testes
- [x] Testar envio de mensagem do chatbot para n8n (webhook ativado com sucesso)
- [x] Verificar se Gemini gera resposta correta (resposta gerada, mas não retornada)
- [x] Confirmar que resposta volta ao chatbot (resposta retornada com sucesso!)
- [ ] Testar com mensagens variadas (happy path, erros)
- [ ] Testar integração completa no chatbot React

## Próximos Passos
- Obter API key do Google Gemini (usuário precisa configurar)
- Ajustar URLs e portas conforme necessário
