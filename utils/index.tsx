// icons
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiEnvelope,
} from 'react-icons/hi2';

import {
  RiInstagramLine,
  RiFacebookBoxLine,
  RiTwitterXLine,
  RiGithubLine,
  RiLinkedinLine,
} from 'react-icons/ri';

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaWordpress,
  FaFigma,
} from 'react-icons/fa';

import {
  SiNextdotjs,
  SiFramer,
  SiAdobexd,
  SiAdobephotoshop,
} from 'react-icons/si';

import {
  RxCrop,
  RxPencil2,
  RxDesktop,
  RxReader,
  RxRocket,
} from "react-icons/rx";

import {
  NavDataProps,
  SocialDataProps,
  AboutDataProps,
  DefaultBreakpointsProps,
  ServicesDataProps,
  WorkDataProps,
} from '@interfaces';

// bgm data
export const playlist = [
  { title: 'I Don’t Wan’t To See Tomorrow - Nat King Cole', src: '/bgm/i-dont-want-to-see-tomorrow.mp3' },
  { title: 'The Mamas & The Papas - California Dreamin', src: '/bgm/california-dreamin.mp3' },
];

// nav data
export const navData: NavDataProps[] = [
  { name: 'home', path: '/', icon: <HiHome /> },
  { name: 'about', path: '/about', icon: <HiUser /> },
  { name: 'services', path: '/services', icon: <HiRectangleGroup /> },
  { name: 'work', path: '/work', icon: <HiViewColumns /> },
  {
    name: 'contact',
    path: '/contact',
    icon: <HiEnvelope />,
  },
];

// social data
export const socialData: SocialDataProps[] = [
  { link: 'https://www.instagram.com/darth.nathan/', style: 'hover:text-accent transition-all duration-300', icon: <RiInstagramLine /> },
  { link: 'https://www.facebook.com/i.am.ye.xiu', style: 'hover:text-accent transition-all duration-300', icon: <RiFacebookBoxLine /> },
  { link: 'https://twitter.com/DBAnathan', style: 'hover:text-accent transition-all duration-300', icon: <RiTwitterXLine /> },
  { link: 'https://github.com/jvconcepcion', style: 'hover:text-accent transition-all duration-300', icon: <RiGithubLine /> },
  { link: 'https://www.linkedin.com/in/jvconcepcion/', style: 'hover:text-accent transition-all duration-300', icon: <RiLinkedinLine /> },
];

//  about data
export const aboutData: AboutDataProps[] = [
  {
    title: 'skills',
    info: [
      {
        knowledge: [
          { value: 'Adobe Photoshop', iconID: 'adobephotoshop', count: 20, color: '#31A8FF', url: 'https://www.adobe.com/products/photoshop.html' },
          { value: 'HTML5', iconID: 'html5', count: 33, color: '#E34F26', url: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5' },
          { value: 'BEM', iconID: 'bem', count: 10, color: '#000000', url: 'https://getbem.com/' },
          { value: 'CSS3', iconID: 'css3', count: 20, color: '#1572B6', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
          { value: 'SASS', iconID: 'sass', count: 18, color: '#CC6699', url: 'https://sass-lang.com/' },
          { value: 'Tailwind CSS', iconID: 'tailwindcss', count: 28, color: '#06B6D4', url: 'https://tailwindcss.com/' },
          { value: 'Framer Motion', iconID: 'framer', count: 22, color: '#0055FF', url: 'https://www.framer.com/motion/' },
          { value: 'Vercel', iconID: 'vercel', count: 25, color: '#000000', url: 'https://vercel.com/' },
          { value: 'Firebase', iconID: 'firebase', count: 18, color: '#FFCA28', url: 'https://firebase.google.com/' },
          { value: 'Javascript', iconID: 'javascript', count: 38, color: '#F7DF1E', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
          { value: 'Typescript', iconID: 'typescript', count: 30, color: '#3178C6', url: 'https://www.typescriptlang.org/' },
          { value: 'React', iconID: 'react', count: 35, color: '#61DAFB', url: 'https://react.dev/' },
          { value: 'Next.JS', iconID: 'nextdotjs', count: 32, color: '#000000', url: 'https://nextjs.org/' },
          { value: 'Node.JS', iconID: 'nodedotjs', count: 28, color: '#339933', url: 'https://nodejs.org/' },
          { value: 'Postman', iconID: 'postman', count: 20, color: '#FF6C37', url: 'https://www.postman.com/' },
          { value: 'Express', iconID: 'express', count: 25, color: '#000000', url: 'https://expressjs.com/' },
          { value: 'Loopback', iconID: 'loopback', count: 15, color: '#3E75C3', url: 'https://loopback.io/' },
          { value: 'NestJS', iconID: 'nestjs', count: 22, color: '#E0234E', url: 'https://nestjs.com/' },
          { value: 'Mysql', iconID: 'mysql', count: 27, color: '#4479A1', url: 'https://www.mysql.com/' },
          { value: 'SQLITE', iconID: 'sqlite', count: 10, color: '#003B57', url: 'https://www.sqlite.org/' },
          { value: 'Jira', iconID: 'jira', count: 18, color: '#0052CC', url: 'https://www.atlassian.com/software/jira' },
          { value: 'MongoDB', iconID: 'mongodb', count: 22, color: '#47A248', url: 'https://www.mongodb.com/' },
          { value: 'Nginx', iconID: 'nginx', count: 17, color: '#009639', url: 'https://nginx.org/' },
          { value: 'GraphQL', iconID: 'graphql', count: 18, color: '#F6009B', url: 'https://graphql.org/' },
        ]            
      },
    ],
  },
  {
    title: 'experience',
    info: [
      {
        company: 'Sutherland Global Service',
        stage: '11/2014 - 03/2015',
        location: 'P. Burgos St, Tarlac City, Tarlac',
        occupations: [{
          title: 'MS Consultant & Lenovo IT Helpdesk Support',
          description: [
            'User Support and Troubleshooting: Delivered exceptional service and support to end-users through automated call distribution phone software, utilizing remote connections, ticketing systems, and internet communication to resolve technical issues efficiently.',
            'Technical Diagnosis and Resolution: Expertly diagnosed and resolved a wide range of technical hardware and software issues.',
            'Email Clients: Assisted users with configuration and troubleshooting for Office 365 and Outlook email clients.',
            'Security Software: Provided support for antivirus solutions, specifically Norton AV, ensuring users maintained optimal security protocols.',
            'Hardware Support: Addressed laptop-related issues, ensuring smooth operation and minimal downtime for users.',
            'Priority Issue Management: Identified and escalated priority issues according to client specifications, ensuring prompt resolution and adherence to service-level agreements (SLAs).',
            'Documentation and Reporting: Maintained detailed documentation of support interactions and resolutions, contributing to the knowledge base for future reference and improving team efficiency.',
            'Collaboration and Communication: Worked closely with other IT teams and stakeholders to ensure seamless support and enhance the overall user experience.',
          ],
        }],
        banner: {
          desktop: '',
          mobile: '',
        }
      },
      {
        company: 'Philweb Corporation',
        stage: '06/2015 - 03/2018',
        location: '20th Floor, Alphaland Southgate Tower, 2258 Chino Roces Avenue corner EDSA, Makati City, Metro Manila, Philippines',
        occupations: [
          {
            title: 'Application Support Engineer',
            description: [
              'Comprehensive Software Support: Deliver end-to-end support and maintenance for various software platforms, including Philweb Web Tool, e-Games Web Portal, and Online Casino Client & Games, ensuring full functionality across both front-end and back-end after rigorous testing.',
              'Efficient Issue Management: Oversee support requests through phone and ticketing systems, keeping users and stakeholders informed on progress, troubleshooting outcomes, and time-to-resolution.',
              'Project-Based Application Development: Independently design, code, and debug custom applications in C#.NET, VB.NET, and PHP, and work within CMS frameworks such as Joomla and WordPress to meet specific project requirements.',
              'User-Focused Troubleshooting: Provide technical support to business users by investigating and resolving application errors, SQL data discrepancies, and other functional issues, delivering a high standard of support.',
              'Technical Documentation and Communication: Document workflows, solution processes, and resolutions to maintain a robust knowledge base. Actively participate in user meetings, clearly presenting issues and solutions in written and verbal formats.',
              'System Administrator Support: Assist in system administration tasks, including installing and configuring VMware ESXi on bare-metal servers, executing Linux server backups, and managing environments (e.g., AX Dynamics, VMHost) with Symantec Exec 15.',
              'Proactive Monitoring and Network Oversight: Continuously monitor network health across company branches, tracking bandwidth, primary and backup connections, and detecting intermittent issues. Maintain the database and API statuses with real-time monitoring via Nagios.',
              'New Site Deployment and Monitoring: Integrate new company sites into the Nagios monitoring suite, configuring and updating system parameters through Linux commands to ensure robust network oversight.',
            ],
          },
          {
            title: 'Application Developer',
            description: [
              'SDLC-Driven Development: Design and develop scalable applications that align with each phase of the software development life cycle (SDLC), ensuring reliability, security, and adaptability.',
              'Responsive UI/UX Design: Create user-centric, responsive web layouts with HTML, CSS, and JavaScript/jQuery, leveraging frameworks like Bootstrap and W3.CSS for efficient, standardized front-end development.',
              'Technical Proficiency: Advanced expertise in PHP, C#, Yii, Laravel, and relational databases (MSSQL, MySQL), with deep experience in developing and integrating RESTful API\s to streamline backend processes.',
              'Code Quality and Development Tools: Consistently produce efficient, testable code adhering to best practices, utilizing IDEs and tools such as NetBeans, Sublime Text, Atom, Notepad++, Visual Studio, and Adobe Dreamweaver to maintain high development standards.',
              'Application Maintenance and Testing: Manage updates for web applications, conduct thorough usability testing, and ensure compliance with the company\’s security and functionality standards.',
              'Database Management and Optimization: Handle data collection and performance monitoring using MSSQL Server and MySQL, with experience utilizing MySQL Query Browser for efficient SQL management and optimization.',
              'Collaborative Project Execution: Work in tandem with database administrators and application support engineers to architect and maintain optimal database structures, ensuring seamless support and operational efficiency across applications.',
            ],
          }
        ],
        banner: {
          desktop: '',
          mobile: '',
        }
      },
      {
        company: 'Rappler Inc.',
        stage: '04/2018 - 09/2022',
        location: 'Unit B, 3/F, North Wing Estancia Offices, Capitol Commons, Ortigas Center, Pasig City 1605',
        occupations: [
          {
            title: 'Software Quality Assurance',
            description: [
              'Field incoming help requests from end users via Chat (Slack/Google Chat), Tickets (Zendesk) and work orders in a courteous manner.',
              'Experience with AWS (invalidation of path, cloudwatch & cloudfront, WAF & Shield) and Mailchimp (By assisting our authors on sending their individual newsletters).',
              'Document all pertinent end user identification information, including name, department, contact information, and nature of problem or issue.',
              'Prioritize and schedule problems. Escalate problems (when required) to the appropriately experienced dev.',
              'Prepare reports to communicate outcomes of quality activities.',
              'Identify training needs and organize training interventions to meet quality standards.',
              'Responsible for bug management systems (JIRA).',
              'Perform related duties consistent with the scope and intent of the position.',
              'Execute API tests using Postman and browser tests using GI(Ghost Inspector).',
            ],
          },
          {
            title: 'Front-End Developer',
            description: [
              'Maintain and Optimize Websites: Ensure websites meet modern web standards, including accessibility, security, and performance.',
              'Develop and Maintain Web Applications: Build scalable, efficient applications tailored to user and business needs.',
              'Front-End Proficiency: Strong command of React JS (React/Next.js), Redux, HTML5, CSS3, and jQuery, with an emphasis on responsive and cross-platform design.',
              'AMP and SEO: Experienced in creating AMP (Accelerated Mobile Pages) for optimized mobile performance. Collaborate with SEO advisors to integrate metadata, structured data, and extensible schemas for better search visibility.',
              'JavaScript & TypeScript: Proficient in JavaScript, with exposure to TypeScript for large-scale applications.',
              'RDBMS and Data Management: Proficient in open-source RDBMS (e.g., MySQL, PostgreSQL) and familiar with NoSQL databases (e.g., MongoDB, Firebase).',
              'Cloud Services: Hands-on experience with AWS and GCP for deployment, hosting, and scaling applications. (Basic only)',
              'DevOps and Version Control: Proficient with Git/GitHub for version control and collaborative development.',
              'UI/UX Collaboration: Collaborate with designers using Photoshop and Figma to implement user-friendly, visually compelling interfaces.',
              'Reusable, Modular Code: Build and document reusable components and modules to streamline development and future scalability.',
              'API Integration: Work closely with back-end engineers to integrate front-end components with RESTful.',
              'Collaboration and Communication: Partner with team members and stakeholders to ensure project alignment, troubleshoot issues, and refine requirements.',
            ],
          }
        ],
        banner: {
          desktop: '',
          mobile: '',
        }
      },
      {
        company: 'Vertere Global INC. - Metrobank (Client)',
        stage: '09/2022 - 03/2025',
        location: '25th floor, 8th Avenue corner 36th Street, Bonifacio Global City, Taguig',
        occupations: [
          {
            title: 'Programmer Analyst S3/Web Programmer',
            description: [
              'Internal Web Application (Metrobank Command Center): Develop and maintain the Metrobank Command Center, a web application that provides essential tools and resources for internal staff and partners, streamlining operations and enhancing customer service.',
              'Backend and API Engineering: Design secure and scalable backend solutions using Node.js and LoopBack.io, implementing authentication through Keycloak and ensuring data protection with SSL. Conduct thorough API testing using Postman and cURL for secure integrations.',
              'Frontend Development: Build dynamic user interfaces with Next.js and React.js, ensuring a responsive and engaging user experience that meets the high standards of the banking sector.',
              'Data Management and Search: Utilize MongoDB for robust data management and Elasticsearch for efficient data retrieval and indexing, optimizing performance across applications.',
              'Quality Assurance and Testing: Ensure high code quality using SonarQube and perform unit testing with frameworks such as Mocha and Jest to maintain reliable, bug-free applications.',
              'Project Management and Collaboration: Utilize Jira for effective project management and workflow tracking, ensuring alignment and collaboration across development teams. Employ WinSCP for secure file transfers and version control through GitHub/GitLab for collaborative coding efforts.',
            ],
          },
        ],
        banner: {
          desktop: '',
          mobile: '',
        }
      },

    ],
  },
  {
    title: 'education',
    info: [
      {
        school: 'College of the Holy Spirit | 2007 - 2008',
        course: 'Bachelor of Science in Nursing',
        location: 'F. Tanedo St. Poblacion, Tarlac City',
        geoLocation: {
          loc: 'College of the Holy Spirit',
          lat: 15.473289897681566,
          lng: 120.60510090279645,
        },
      },
      {
        school: 'AMA Computer College | 2010 - 2014',
        course: 'Bachelor of Science in Information Technology',
        location: 'Zamora St., San Roque, Tarlac City',
        geoLocation: {
          loc: 'AMA Computer College',
          lat: 15.483517473362491,
          lng: 120.59107342922043,
        },
      },
    ],
  },
];

// (services, work) slider/swiper data

export const defaultBreakpoints: DefaultBreakpointsProps = {
  320: {
    slidesPerView: 1,
    spaceBetween: 15,
  },
  640: {
    slidesPerView: 3,
    spaceBetween: 15,
  }
};

export const serviceData: ServicesDataProps[] = [
  {
    icon: <RxDesktop />,
    title: 'Development',
    description: 'Transform your ideas into responsive, high-performance web applications using the latest technologies like React JS, Next JS, Node.js, LoopBack 4 and MongoDB.',
  },
  {
    icon: <RxPencil2 />,
    title: 'Design',
    description: 'Craft visually stunning and user-friendly designs with expertise in Photoshop and Figma. I bring your vision to life, creating intuitive interfaces that captivate users and enhance their experience.',
  },
  {
    icon: <RxCrop />,
    title: 'Branding',
    description: 'Elevate your brand with a cohesive and compelling digital presence. From logo design to complete brand identity, I help you establish a strong, memorable brand that resonates with your target audience.',
  },
];

export const workData: WorkDataProps = {
  slides: [
    {
      images: [
        {
          title: 'Weather Forecast',
          path: '/proj-weather-forcecast.jpg',
          siteLink: 'https://github.com/jvconcepcion/weather-forecast',
          gitLink: 'https://github.com/jvconcepcion/weather-forecast'
        },
        {
          title: 'Meme Generator',
          path: '/proj-meme.jpg',
          siteLink: 'https://github.com/jvconcepcion/meme-generator',
          gitLink: 'https://github.com/jvconcepcion/meme-generator'
        },
        {
          title: 'Rappler',
          path: '/proj-rappler.jpg',
          siteLink: 'https://www.rappler.com',
          gitLink: ''
        },
        {
          title: 'Rappler Election 2022',
          path: '/proj-rappler-election.jpg',
          siteLink: 'https://ph.rappler.com',
          gitLink: ''
        }
      ],
    },
    {
      images: [
        {
          title: 'Metrobank Command Center',
          path: '/mbcc.jpg',
          siteLink: 'https://onlinebanking.metrobank.com.ph/signin',
          gitLink: ''
        },
        {
          title: 'Metrobank Online Banking',
          path: '/mbo.jpg',
          siteLink: 'https://onlinebanking.metrobank.com.ph/signin',
          gitLink: ''
        },
        {
          title: 'My Portfolio',
          path: '/portfolio.jpg',
          siteLink: 'https://my-portfolio-jonathan-vidad-concepcions-projects.vercel.app',
          gitLink: 'https://github.com/jvconcepcion/my-portfolio'
        },
        {
          title: 'Classpass Clone',
          path: '/proj-classpass-clone.jpg',
          siteLink: 'https://my-class-pass.vercel.app',
          gitLink: 'https://github.com/jvconcepcion/my-class-pass'
        }
      ],
    },
    {
      images: [
        {
          title: 'NovaVision',
          path: '/proj-nova-vission.jpg',
          siteLink: 'https://nova-vision.vercel.app',
          gitLink: 'https://github.com/jvconcepcion/nova-vision'
        },
        {
          title: 'Ai Image Generator',
          path: '/proj-ai-image-gen.jpg',
          siteLink: 'https://github.com/jvconcepcion/ai-image-generator',
          gitLink: 'https://github.com/jvconcepcion/ai-image-generator'
        },
        {
          title: 'Chinese Poetry App',
          path: '/proj-poetry.jpg',
          siteLink: 'https://github.com/jvconcepcion/chinese-poetry-app',
          gitLink: 'https://github.com/jvconcepcion/chinese-poetry-app'
        },
      ],
    },
  ],
};