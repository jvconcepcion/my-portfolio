import { db } from './firebaseAdmin';

export async function getResumeContent(): Promise<string> {
  return await fetchChatContent('resumeContent');
};

export async function getAIGreetings(): Promise<string> {
  return await fetchChatContent('greetings');
}

async function fetchChatContent(docId: string): Promise<string> {
  try {
    const doc = await db.collection('chat-content').doc(docId).get();

    if (!doc.exists) {
      console.warn(`${docId} document not found, using default.`);
      return getDefaultChatContent(docId);
    }

    const data = doc.data();
    return typeof data?.value === 'string' ? data.value : getDefaultChatContent(docId);
  } catch (error) {
    console.error(`Error retrieving ${docId}:`, error);
    return getDefaultChatContent(docId);
  }
};

function getDefaultChatContent(docId: string): string {
  switch (docId) {
    case 'resumeContent':
      return `
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
    case 'greetings':
      return `Greetings! I’m Scaeva, Nathan’s personal AI assistant. If you’re here to learn more about him, I’d be happy to help.`;
    default:
      return '';
  }
};
