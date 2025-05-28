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
        -	CCNA Exploration: Accessing the WAN

        Education:
        - B.S. in Computer Science, AMA Computer College
        - Studied Nursing, College of the Holy Spirit

        Contact: jonathanconcepcion1991@gmail.com | +639602367316 (Smart) | +639661957128 (Globe)
        `;
    case 'greetings':
      return `Greetings! I’m Scaeva, Nathan’s personal AI assistant. If you’re here to learn more about him, I’d be happy to help.`;
    default:
      return '';
  }
};
