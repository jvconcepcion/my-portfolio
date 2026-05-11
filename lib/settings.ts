import { supabase } from './supabase';

export interface ProjectRow {
  id: string;
  title: string;
  image_path: string;
  site_link: string;
  git_link: string;
  sort_order: number;
}

export async function getProjects(): Promise<ProjectRow[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('id, title, image_path, site_link, git_link, sort_order')
      .order('sort_order', { ascending: true });

    if (error || !data) {
      console.warn('[Supabase] Failed to fetch projects, using empty list.');
      return [];
    }
    return data as ProjectRow[];
  } catch (error) {
    console.error('Error retrieving projects:', error);
    return [];
  }
};

export async function getResumeContent(): Promise<string> {
  return await fetchContent('resume');
};

export async function getAIGreetings(): Promise<string> {
  return await fetchContent('greeting');
};

export async function getCV(): Promise<string> {
  return await fetchContent('cv');
};

export async function getAIQuotaExceeded(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'ai_status')
      .single();

    if (error || !data) return false;
    return data.value?.quotaExceeded === true;
  } catch {
    return false;
  }
};

export async function setAIQuotaExceeded(value: boolean): Promise<void> {
  try {
    await supabase
      .from('settings')
      .upsert({ key: 'ai_status', value: { quotaExceeded: value }, updated_at: new Date().toISOString() });
  } catch (error) {
    console.error('Failed to persist AI quota status:', error);
  }
};

async function fetchContent(type: string): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('content')
      .select('data')
      .eq('type', type)
      .single();

    if (error || !data) {
      console.warn(`[Supabase] Content type '${type}' not found, using default.`);
      return getDefaultContent(type);
    }

    return typeof data.data?.value === 'string' ? data.data.value : getDefaultContent(type);
  } catch (error) {
    console.error(`Error retrieving content type '${type}':`, error);
    return getDefaultContent(type);
  }
};


function getDefaultContent(type: string): string {
  switch (type) {
    case 'resume':
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
    case 'greeting':
      return `Greetings! I’m Scaeva, Nathan’s personal AI assistant. If you’re here to learn more about him, I’d be happy to help.`;
    case 'cv':
      return '/cv.pdf';
    default:
      return '';
  }
};
