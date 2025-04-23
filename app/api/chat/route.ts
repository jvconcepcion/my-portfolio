import { NextResponse } from "next/server";
import OpenAI from "openai";
import { CustomError } from "@interfaces";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

let lastActivity = Date.now(); // Track AI activity time

// Scaeva's Resume Content (My Portfolio Info)
const resumeContent = `
Nathan (Jonathan) - Full Stack Web & Mobile Developer
Current Role: Web Developer/Programmer Analyst S3 at Metrobank (client)
Experience:
- Full-stack development for Metrobank's Mobile App (MBOA) & Command Center web app
- Expertise in Next.js, React.js, Node.js
- Deep knowledge with multiple UI Frameworks such as Material UI, Chakra UI and Mantine UI
- Security-conscious, experienced in API integrations and system monitoring
Skills: JavaScript, TypeScript, React, Flutter, TailwindCSS, Keycloak, LoopBack, SQL, MongoDB
Certifications: Advanced Web Development, Cybersecurity Foundations
Education: B.S. Computer Science
Contact: [Your Email or Portfolio Link Here]
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";

    // Detect Greetings and Provide an Intro Instead
    if (/^(hi|hello|hey|good\s(morning|afternoon|evening))$/.test(userMessage)) {
      const reply = `
      Hello! I’m **Scaeva**, Nathan’s AI assistant. 
      If you're here to learn about him, he is a **full-stack web & mobile developer at Metrobank**. 
      He specializes in **Next.js, Flutter, Node.js, and blockchain**. 
      He Deep knowledge with multiple UI Frameworks such as **Material UI, Chakra UI and Mantine UI**.
      Feel free to ask about his **projects, skills, or experience**!
      `;
      return NextResponse.json({ reply });
    }

    // 🌟 If Not a Greeting, Use OpenAI for Responses
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are Scaeva, Nathan's AI assistant. 
          Your role is to assist with programming, technology, and AI-related queries.
          If an employer or recruiter asks about Nathan, introduce him based on this profile: 
          ${resumeContent}`
        },
        ...messages
      ],
      temperature: 0.3
    });

    const reply = response.choices?.[0]?.message?.content ?? "I'm unable to respond at the moment.";
    return NextResponse.json({ reply });

  } catch (e: unknown) {
    console.error("Error:", e);

    const error = e as CustomError;
    if (error?.response?.status === 402) {
      return NextResponse.json(
        { error: "Insufficient API balance. Please check your OpenAI account." },
        { status: 402 }
      );
    }

    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
}

// 🌐 GET API - AI Status
export async function GET() {
  const now = Date.now();
  const elapsed = now - lastActivity;
  const status = elapsed < 30000 ? "active" : elapsed < 60000 ? "idle" : "offline";

  return NextResponse.json({ status });
}
