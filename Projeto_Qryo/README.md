# Qryo 🎨

**Qryo** é uma ferramenta premium de personalização de QR Codes, focada em design, identidade visual e produtividade. Transforme códigos genéricos em peças de marca visualmente atraentes com uma interface neumórfica moderna e recursos avançados.

![Qryo Preview](https://picsum.photos/seed/qryo/1200/600)

## ✨ Recursos Principais

- **🎨 Estilização Avançada:** Personalize padrões de pontos, formatos de cantos (eye frames e eyeballs), cores (sólidas ou gradientes) e adicione logotipos centrais.
- **🌓 Design Neumórfico:** Interface polida com suporte total a **Dark Mode** e **Light Mode**, garantindo uma experiência visual premium.
- **📂 Biblioteca de Presets:** Salve suas combinações de estilo favoritas localmente no navegador para reutilização instantânea.
- **⚡ Geração em Massa (Batch Mode):** Insira uma lista de URLs e gere dezenas de QR Codes de uma só vez, baixando-os em um único arquivo `.ZIP`.
- **🔐 Autenticação Firebase:** Login seguro via Google para personalização e persistência de perfil.
- **⚙️ Remote Config:** Controle dinâmico de funcionalidades (como habilitar/desabilitar a geração em massa) diretamente pelo console do Firebase.
- **🛡️ Privacidade em Primeiro Lugar:** Opção de "Modo Privacidade" que limpa os dados sensíveis após o download.

## 🚀 Tecnologias Utilizadas

- **Frontend:** [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações:** [Motion](https://motion.dev/) (framer-motion)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **QR Core:** [qr-code-styling](https://www.npmjs.com/package/qr-code-styling)
- **Backend/Infra:** [Firebase](https://firebase.google.com/) (Auth, Firestore, Remote Config)
- **Utilidades:** [JSZip](https://stuk.github.io/jszip/) (para compressão de lotes)

## 📦 Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/qryo.git
   cd qryo
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o Firebase:**
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
   - Adicione um App Web e copie as credenciais.
   - Crie um arquivo `firebase-applet-config.json` na raiz com o seguinte formato:
     ```json
     {
       "apiKey": "SUA_API_KEY",
       "authDomain": "SEU_AUTH_DOMAIN",
       "projectId": "SEU_PROJECT_ID",
       "appId": "SEU_APP_ID",
       "firestoreDatabaseId": "(default)"
     }
     ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   O app estará disponível em `http://localhost:3000`.

## 🛠️ Estrutura do Projeto

- `/src/components`: Componentes de UI (Layout, QR, UI Elements).
- `/src/context`: Provedores de estado global (Auth, Theme, RemoteConfig).
- `/src/hooks`: Lógica customizada para estilização de QR e gerenciamento de presets.
- `/src/firebase.ts`: Configuração e inicialização dos serviços Firebase.
- `firestore.rules`: Regras de segurança para o banco de dados.

## 📄 Licença

Este projeto está sob a licença Apache-2.0. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
Desenvolvido com ❤️ para marcas que valorizam cada pixel.
