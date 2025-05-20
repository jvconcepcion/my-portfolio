# 🌐 Web Portfolio – Jonathan V. Concepcion

## 🚀 About the Project
This is a **modern web portfolio** built using **Next.js** and **TypeScript**, designed to showcase my skills, projects, and experience in a sleek, interactive, and professional format. It includes a custom-built AI assistant named **Scaeva**, dynamic resume loading from **Firestore** with encrypted credentials, and animations to enhance user experience.

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router, React, TypeScript)
- **Security:** AES-256 encryption, Base64 encoding
- **Styling:** Tailwind CSS, Chakra UI, Framer Motion
- **UI Components & Effects:**
  - `react-icons`, `react-icon-cloud`, `react-type-animation`, `swiper`, `react-countup`, `react-tagcloud`, `react-tsparticles`
- **Maps:** Leaflet, react-leaflet
- **Email:** Nodemailer
- **Database:** Firestore with encrypted service account
- **AI Assistant:** OpenAI GPT (with encrypted API key)

---

## 🔐 Security Updates
- Firestore service account credentials encrypted using AES-256 and stored as Base64
- OpenAI API key encrypted with AES-256
- Decryption handled by `lib/decrypt.ts` utility
- Separate decryption password stored in environment variables

## 🔥 Secure Firestore Integration
Firestore is used to:

- Dynamically store and retrieve resume content
- Manage Scaeva’s greetings and assistant responses
- Enable easy content updates without redeploying the code

Firestore credentials are securely managed through:

- AES-256 encrypted service account (Base64 encoded)
- Runtime decryption using environment password
- Isolated decryption utility (`lib/decrypt.ts`)

> See `lib/decrypt.ts` for decryption implementation, `lib/settings.ts` and `api/chat/route.ts` for secure Firestore initialization.

---

## 🤖 Scaeva – Secure AI Assistant

Scaeva is an AI-powered virtual assistant integrated into the chat interface using the OpenAI GPT API. It responds to:

- General chat prompts
- Questions about Me (cv-based)
- Greetings, intros, and more
- OpenAI API key encrypted using AES-256
- Decryption occurs at runtime via `lib/decrypt.ts`
- Secure credential handling through environment variables

It also uses:
- `localStorage` to persist messages
- Text-to-speech and clipboard support

---

## 📦 Dependencies
```json
"dependencies": {
  "@chakra-ui/react": "^2.10.5",
  "clsx": "^2.1.1",
  "crypto": "^1.0.1",
  "dompurify": "^3.0.8",
  "firebase-admin": "^13.4.0",
  "framer-motion": "^10.16.4",
  "jsdom": "^22.1.0",
  "leaflet": "^1.9.4",
  "lodash": "^4.17.21",
  "net": "^1.0.2",
  "next": "latest",
  "nodemailer": "^6.9.8",
  "openai": "^4.83.0",
  "pathseg": "^1.2.1",
  "react": "latest",
  "react-countup": "^6.4.2",
  "react-dom": "latest",
  "react-icon-cloud": "^4.1.7",
  "react-icons": "^4.11.0",
  "react-leaflet": "^4.2.1",
  "react-tagcloud": "^2.3.3",
  "react-tsparticles": "^2.12.2",
  "react-type-animation": "^3.1.0",
  "swiper": "^10.3.1",
  "tailwind-scrollbar": "^3.0.5",
  "tsparticles": "^2.12.0",
  "tsparticles-path-polygon": "^2.12.0"
}
```

## 🛠 Development Dependencies
```json
"devDependencies": {
  "@types/dompurify": "^3.0.5",
  "@types/leaflet": "^1.9.6",
  "@types/node": "latest",
  "@types/nodemailer": "^6.4.14",
  "@types/react": "latest",
  "@types/react-dom": "latest",
  "@types/react-leaflet": "^3.0.0",
  "@types/react-tagcloud": "^1.1.9",
  "autoprefixer": "latest",
  "postcss": "^8.4.31",
  "tailwindcss": "latest",
  "typescript": "latest"
}
```

## 📂 Project Structure
```
/my-portfolio
  ├── app/              # Next.js App Router pages and layouts
  ├── components/       # Reusable UI components
  ├── containers/       # Page-level wrappers
  ├── interfaces/       # TypeScript interfaces and types
  ├── lib/              # Firestore and backend utilities (e.g. settings.ts)
  ├── public/           # Static assets (images, icons)
  ├── styles/           # Global stylesheets and Tailwind configs
  ├── utils/            # Helper functions
```

## 🚀 Getting Started
### 1. Clone the Repository
```bash
git clone https://github.com/jvconcepcion/my-portfolio.git
cd my-portfolio
```

### 2. Install Dependencies
```bash
npm install  # or yarn install
```

### 3. Setup Environment Variables
Create a .env.local file:
```
OPENAI_KEY_PASSWORD=encrypted_decrypt_password
OPENAI_API_KEY=encrypted_openai_api_key
NEXT_PUBLIC_USE_AI=true
FIREBASE_ENCODED_ACCOUNT=encoded_base_64_service_account
```

Preparation Steps:

- Encrypt your Firestore credentials using AES-256 with a strong password
- Base64-encode the encrypted result
- Repeat process for OpenAI API key
- Store the decryption password securely in environment variables

### 4. Run the Development Server
```bash
npm run dev  # or yarn dev
```
The portfolio will be available at [http://localhost:3000](http://localhost:3000).

## 📌 Features
✅ Responsive and modern UI
✅ Animated elements with Framer Motion
✅ Custom AI Assistant “Scaeva” using OpenAI
✅ Interactive tag cloud & particle backgrounds
✅ Firestore-powered resume & chat assistant
✅ Leaflet map integration
✅ Email contact form via Nodemailer
✅ Text-to-speech and clipboard support
✅ Local message history persistence

---
✨ Credits
Designed & Developed by **Jonathan V. Concepcion**
🧠 AI Assistant powered by OpenAI
☁️ Dynamic data via Firebase Firestore
💻 Frontend built with Next.js and Tailwind CSS