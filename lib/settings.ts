import { adminDb } from './firebaseAdmin';
import { clientDb } from './firebaseClient';
import { doc, getDoc } from 'firebase/firestore';
import { ContentType, DocumentID } from '@interfaces';

export async function getResumeContent(): Promise<string> {
  return await fetchContent('chat-content', 'resumeContent');
};

export async function getAIGreetings(): Promise<string> {
  return await fetchContent('chat-content', 'greetings');
};

export async function getCVLink(): Promise<string> {
  return await fetchContent('about', 'cv');
};

async function fetchContent(collection: ContentType, docId: DocumentID): Promise<string> {
  try {

    let response: any;

    if (typeof window === 'undefined') {
      response = await adminDb.collection(collection).doc(docId).get();
    } else {
      response = await getDoc(doc(clientDb, collection, docId));
    }

    if (!response.exists) {
      console.warn(`${docId} document not found in ${collection}, using default.`);
      return getDefaultContent(docId);
    };

    const data = response.data();
    return typeof data?.value === 'string' ? data.value : getDefaultContent(docId);
  } catch (error) {
    console.error(`Error retrieving ${docId} from ${collection}:`, error);
    return getDefaultContent(docId);
  }
};

function getDefaultContent(docId: DocumentID): string {
  const defaultContent: Record<DocumentID, string> = {
    resumeContent: `
      Nathan (Jonathan) - Full Stack Web & Mobile Developer
      Current Role: Web Developer/Programmer Analyst S3 at Metrobank (client)

      Experience:
      - Metrobank (2022–2025): Served as Programmer Analyst, S3/Web Developer. Built and maintained the Metrobank Command Center using Next.js, React.js, Node.js, LoopBack.io, MongoDB, and Elasticsearch. Ensured quality with SonarQube, Mocha, and Jest. Integrated secure APIs with Keycloak. Used Jira and GitHub for DevOps workflows.
      - Rappler Inc. (2018–2022): Served as both Software QA and Full-stack Web Developer. Conducted QA testing using Postman and Ghost Inspector. Built scalable apps using React.js, Next.js, TypeScript, and Firebase. Managed AMP, SEO, and cloud deployment on AWS/GCP.
      - Philweb Corp. (2015–2018): Provided application support and development using C#, PHP, Yii, Laravel, and MSSQL. Built and maintained enterprise-level tools, monitored networks using Nagios, and performed system admin tasks on VMware and Linux.
      - Sutherland Global Services (2014–2015): IT Helpdesk for Microsoft and Lenovo. Handled technical support via ACD phones, email clients, antivirus tools, and priority ticketing systems.
      - High-Tech Cable TV Inc. (2013–2014): OJT in IT department. Developed applications in C#.NET and VB.NET. Maintained database backups and documentation.

      Skills:
      JavaScript, TypeScript, React, Next.js, Flutter, Node.js, LoopBack.io, MongoDB, SQL, MySQL, Firebase, Elasticsearch, Keycloak, TailwindCSS, HTML5, CSS3, Bootstrap, W3.CSS

      Tools & Technologies:
      Postman, cURL, SonarQube, GitHub, GitLab, Jira, WinSCP, Photoshop, Figma, WordPress, Joomla, Nagios, AWS, GCP, MediaWiki, Tiki Wiki, DokuWiki

      Certifications:
      - Certified Cabling Test Technician Associate, Fluke Networks
      - CCNA Exploration: Network Fundamentals
      - CCNA Exploration: Routing Protocols and Concepts
      - CCNA Exploration: LAN Switching and Wireless
      - CCNA Exploration: Accessing the WAN

      Education:
      - B.S. in Computer Science, AMA Computer College
      - Studied Nursing, College of the Holy Spirit

      Contact: jonathanconcepcion1991@gmail.com | +639602367316 (Smart) | +639661957128 (Globe)
    `,
    greetings: 'Greetings! I\'m Scaeva, Nathan\'s personal AI assistant. If you\'re here to learn more about him, I\'d be happy to help.',
    cv: 'https://drive.google.com/file/d/1Z3gUwQKL9wv-xopPWxZclGxN9hcSn3DY/view?usp=sharing'
  };

  return defaultContent[docId] || '';
}



