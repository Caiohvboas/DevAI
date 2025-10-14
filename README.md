# DevAI Portfólio - Caio Henrique

![Capa do Projeto](URL_DA_IMAGEM_OU_GIF_AQUI) <!-- Sugestão: Grave um GIF mostrando o chatbot e as animações! -->

## 🚀 Sobre o Projeto

Este não é apenas um portfólio estático. É uma aplicação web interativa e moderna, construída com as tecnologias mais recentes do ecossistema React, e potencializada por Inteligência Artificial para criar uma experiência de usuário única e memorável.

O objetivo deste projeto é demonstrar minhas habilidades em desenvolvimento front-end, integração com APIs, automação de backend e a aplicação prática de IA em uma interface de usuário.

## ✨ Funcionalidades Principais

O portfólio conta com uma série de funcionalidades avançadas:

*   **🤖 Chatbot com Inteligência Artificial:**
    *   Converse com um assistente de IA (alimentado pela API do **Google Gemini**) que conhece meu currículo.
    *   Pergunte sobre minhas habilidades, projetos ou experiências e receba respostas contextuais.
    *   Backend do chatbot orquestrado com **n8n**, demonstrando habilidades de automação e integração.

*   **📬 Formulário de Contato Funcional:**
    *   Um formulário de contato que realmente funciona!
    *   Validação de dados do lado do cliente usando **Zod** para garantir que as informações (nome, e-mail, mensagem) sejam válidas.
    *   Feedback instantâneo para o usuário com notificações (toasts) de sucesso e erro.
    *   Integração com **n8n** para receber os dados do formulário e me notificar por e-mail automaticamente.

*   **🎨 Design Moderno e Animações Fluidas:**
    *   Interface construída com **Tailwind CSS**, seguindo as melhores práticas de design responsivo.
    *   Animações ricas e performáticas em toda a aplicação, utilizando **Framer Motion**.
    *   Efeitos de "Glassmorphism" e uma paleta de cores neon que criam uma identidade visual única.
    *   Animações que são ativadas conforme o usuário rola a página (`useInView`).

*   **📂 Seção de Projetos Dinâmica:**
    *   Cards de projeto que incluem links diretos para a demonstração ao vivo (Demo) e para o código-fonte no GitHub (Code).

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com um stack moderno e robusto:

*   **Frontend:**
    *   **React** com **Vite**
    *   **TypeScript**
    *   **Tailwind CSS** para estilização
    *   **Framer Motion** para animações
    *   **Zod** para validação de esquemas
    *   **Lucide React** para ícones

*   **Backend & Integrações:**
    *   **n8n.io** para automação de workflows (Chatbot e Formulário de Contato)
    *   **Google Gemini API** como o cérebro do chatbot

## 🔧 Como Executar o Projeto Localmente

Para executar este projeto em sua máquina, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Caiohvboas/DevAI.git
    ```

2.  **Instale as dependências:**
    ```bash
    cd DevAI
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    *   Crie um arquivo `.env.local` na raiz do projeto.
    *   Adicione as URLs dos seus webhooks do n8n:
        ```env
        VITE_N8N_CHATBOT_WEBHOOK_URL=SUA_URL_DO_CHATBOT
        VITE_N8N_CONTACT_WEBHOOK_URL=SUA_URL_DO_FORMULARIO_DE_CONTATO
        ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

    Abra http://localhost:5173 (ou a porta que for indicada no seu terminal) para ver o projeto.

## ✍️ Autor

**Caio Henrique**

*   LinkedIn: caio-henrique-36b470181
*   GitHub: @Caiohvboas

