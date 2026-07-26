-- Tables and seed data for the About page (skills, experience, education).
-- Run once in the Supabase SQL editor.

CREATE TABLE skills (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  value       text NOT NULL,
  icon_id     text NOT NULL,
  count       integer NOT NULL,
  color       text NOT NULL,
  url         text NOT NULL,
  sort_order  integer NOT NULL DEFAULT 0
);

CREATE TABLE experience (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company     text NOT NULL,
  stage       text NOT NULL,
  location    text NOT NULL,
  occupations jsonb NOT NULL DEFAULT '[]'::jsonb,  -- [{ title: string, description: string[] }]
  sort_order  integer NOT NULL DEFAULT 0
);

CREATE TABLE education (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school       text NOT NULL,
  course       text NOT NULL,
  location     text NOT NULL,
  geo_location jsonb NOT NULL DEFAULT '{}'::jsonb, -- { loc?: string, lat: number, lng: number }
  sort_order   integer NOT NULL DEFAULT 0
);

CREATE INDEX idx_skills_sort_order     ON skills (sort_order);
CREATE INDEX idx_experience_sort_order ON experience (sort_order);
CREATE INDEX idx_education_sort_order  ON education (sort_order);

INSERT INTO skills (value, icon_id, count, color, url, sort_order) VALUES
  ('Adobe Photoshop', 'adobephotoshop', 20, '#31A8FF', 'https://www.adobe.com/products/photoshop.html', 0),
  ('HTML5', 'html5', 33, '#E34F26', 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5', 1),
  ('BEM', 'bem', 10, '#000000', 'https://getbem.com/', 2),
  ('CSS3', 'css3', 20, '#1572B6', 'https://developer.mozilla.org/en-US/docs/Web/CSS', 3),
  ('SASS', 'sass', 18, '#CC6699', 'https://sass-lang.com/', 4),
  ('Tailwind CSS', 'tailwindcss', 28, '#06B6D4', 'https://tailwindcss.com/', 5),
  ('Framer Motion', 'framer', 22, '#0055FF', 'https://www.framer.com/motion/', 6),
  ('Vercel', 'vercel', 25, '#000000', 'https://vercel.com/', 7),
  ('Firebase', 'firebase', 18, '#FFCA28', 'https://firebase.google.com/', 8),
  ('Javascript', 'javascript', 38, '#F7DF1E', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', 9),
  ('Typescript', 'typescript', 30, '#3178C6', 'https://www.typescriptlang.org/', 10),
  ('React', 'react', 35, '#61DAFB', 'https://react.dev/', 11),
  ('Next.JS', 'nextdotjs', 32, '#000000', 'https://nextjs.org/', 12),
  ('Node.JS', 'nodedotjs', 28, '#339933', 'https://nodejs.org/', 13),
  ('Postman', 'postman', 20, '#FF6C37', 'https://www.postman.com/', 14),
  ('Express', 'express', 25, '#000000', 'https://expressjs.com/', 15),
  ('Loopback', 'loopback', 15, '#3E75C3', 'https://loopback.io/', 16),
  ('NestJS', 'nestjs', 22, '#E0234E', 'https://nestjs.com/', 17),
  ('Mysql', 'mysql', 27, '#4479A1', 'https://www.mysql.com/', 18),
  ('SQLITE', 'sqlite', 10, '#003B57', 'https://www.sqlite.org/', 19),
  ('Jira', 'jira', 18, '#0052CC', 'https://www.atlassian.com/software/jira', 20),
  ('MongoDB', 'mongodb', 22, '#47A248', 'https://www.mongodb.com/', 21),
  ('Nginx', 'nginx', 17, '#009639', 'https://nginx.org/', 22),
  ('GraphQL', 'graphql', 18, '#F6009B', 'https://graphql.org/', 23),
  ('Supabase', 'supabase', 15, '#3ECF8E', 'https://supabase.com/', 24);

INSERT INTO experience (company, stage, location, occupations, sort_order) VALUES
  (
    'Sutherland Global Service',
    '11/2014 - 03/2015',
    'P. Burgos St, Tarlac City, Tarlac',
    '[{"title":"MS Consultant & Lenovo IT Helpdesk Support","description":["User Support and Troubleshooting: Delivered exceptional service and support to end-users through automated call distribution phone software, utilizing remote connections, ticketing systems, and internet communication to resolve technical issues efficiently.","Technical Diagnosis and Resolution: Expertly diagnosed and resolved a wide range of technical hardware and software issues.","Email Clients: Assisted users with configuration and troubleshooting for Office 365 and Outlook email clients.","Security Software: Provided support for antivirus solutions, specifically Norton AV, ensuring users maintained optimal security protocols.","Hardware Support: Addressed laptop-related issues, ensuring smooth operation and minimal downtime for users.","Priority Issue Management: Identified and escalated priority issues according to client specifications, ensuring prompt resolution and adherence to service-level agreements (SLAs).","Documentation and Reporting: Maintained detailed documentation of support interactions and resolutions, contributing to the knowledge base for future reference and improving team efficiency.","Collaboration and Communication: Worked closely with other IT teams and stakeholders to ensure seamless support and enhance the overall user experience."]}]'::jsonb,
    0
  ),
  (
    'Philweb Corporation',
    '06/2015 - 03/2018',
    '20th Floor, Alphaland Southgate Tower, 2258 Chino Roces Avenue corner EDSA, Makati City, Metro Manila, Philippines',
    '[{"title":"Application Support Engineer","description":["Comprehensive Software Support: Deliver end-to-end support and maintenance for various software platforms, including Philweb Web Tool, e-Games Web Portal, and Online Casino Client & Games, ensuring full functionality across both front-end and back-end after rigorous testing.","Efficient Issue Management: Oversee support requests through phone and ticketing systems, keeping users and stakeholders informed on progress, troubleshooting outcomes, and time-to-resolution.","Project-Based Application Development: Independently design, code, and debug custom applications in C#.NET, VB.NET, and PHP, and work within CMS frameworks such as Joomla and WordPress to meet specific project requirements.","User-Focused Troubleshooting: Provide technical support to business users by investigating and resolving application errors, SQL data discrepancies, and other functional issues, delivering a high standard of support.","Technical Documentation and Communication: Document workflows, solution processes, and resolutions to maintain a robust knowledge base. Actively participate in user meetings, clearly presenting issues and solutions in written and verbal formats.","System Administrator Support: Assist in system administration tasks, including installing and configuring VMware ESXi on bare-metal servers, executing Linux server backups, and managing environments (e.g., AX Dynamics, VMHost) with Symantec Exec 15.","Proactive Monitoring and Network Oversight: Continuously monitor network health across company branches, tracking bandwidth, primary and backup connections, and detecting intermittent issues. Maintain the database and API statuses with real-time monitoring via Nagios.","New Site Deployment and Monitoring: Integrate new company sites into the Nagios monitoring suite, configuring and updating system parameters through Linux commands to ensure robust network oversight."]},{"title":"Application Developer","description":["SDLC-Driven Development: Design and develop scalable applications that align with each phase of the software development life cycle (SDLC), ensuring reliability, security, and adaptability.","Responsive UI/UX Design: Create user-centric, responsive web layouts with HTML, CSS, and JavaScript/jQuery, leveraging frameworks like Bootstrap and W3.CSS for efficient, standardized front-end development.","Technical Proficiency: Advanced expertise in PHP, C#, Yii, Laravel, and relational databases (MSSQL, MySQL), with deep experience in developing and integrating RESTful APIs to streamline backend processes.","Code Quality and Development Tools: Consistently produce efficient, testable code adhering to best practices, utilizing IDEs and tools such as NetBeans, Sublime Text, Atom, Notepad++, Visual Studio, and Adobe Dreamweaver to maintain high development standards.","Application Maintenance and Testing: Manage updates for web applications, conduct thorough usability testing, and ensure compliance with the company''s security and functionality standards.","Database Management and Optimization: Handle data collection and performance monitoring using MSSQL Server and MySQL, with experience utilizing MySQL Query Browser for efficient SQL management and optimization.","Collaborative Project Execution: Work in tandem with database administrators and application support engineers to architect and maintain optimal database structures, ensuring seamless support and operational efficiency across applications."]}]'::jsonb,
    1
  ),
  (
    'Rappler Inc.',
    '04/2018 - 09/2022',
    'Unit B, 3/F, North Wing Estancia Offices, Capitol Commons, Ortigas Center, Pasig City 1605',
    '[{"title":"Software Quality Assurance","description":["Field incoming help requests from end users via Chat (Slack/Google Chat), Tickets (Zendesk) and work orders in a courteous manner.","Experience with AWS (invalidation of path, cloudwatch & cloudfront, WAF & Shield) and Mailchimp (By assisting our authors on sending their individual newsletters).","Document all pertinent end user identification information, including name, department, contact information, and nature of problem or issue.","Prioritize and schedule problems. Escalate problems (when required) to the appropriately experienced dev.","Prepare reports to communicate outcomes of quality activities.","Identify training needs and organize training interventions to meet quality standards.","Responsible for bug management systems (JIRA).","Perform related duties consistent with the scope and intent of the position.","Execute API tests using Postman and browser tests using GI(Ghost Inspector)."]},{"title":"Front-End Developer","description":["Maintain and Optimize Websites: Ensure websites meet modern web standards, including accessibility, security, and performance.","Develop and Maintain Web Applications: Build scalable, efficient applications tailored to user and business needs.","Front-End Proficiency: Strong command of React JS (React/Next.js), Redux, HTML5, CSS3, and jQuery, with an emphasis on responsive and cross-platform design.","AMP and SEO: Experienced in creating AMP (Accelerated Mobile Pages) for optimized mobile performance. Collaborate with SEO advisors to integrate metadata, structured data, and extensible schemas for better search visibility.","JavaScript & TypeScript: Proficient in JavaScript, with exposure to TypeScript for large-scale applications.","RDBMS and Data Management: Proficient in open-source RDBMS (e.g., MySQL, PostgreSQL) and familiar with NoSQL databases (e.g., MongoDB, Firebase).","Cloud Services: Hands-on experience with AWS and GCP for deployment, hosting, and scaling applications. (Basic only)","DevOps and Version Control: Proficient with Git/GitHub for version control and collaborative development.","UI/UX Collaboration: Collaborate with designers using Photoshop and Figma to implement user-friendly, visually compelling interfaces.","Reusable, Modular Code: Build and document reusable components and modules to streamline development and future scalability.","API Integration: Work closely with back-end engineers to integrate front-end components with RESTful.","Collaboration and Communication: Partner with team members and stakeholders to ensure project alignment, troubleshoot issues, and refine requirements."]}]'::jsonb,
    2
  ),
  (
    'Vertere Global INC. - Metrobank (Client)',
    '09/2022 - 03/2025',
    '25th floor, 8th Avenue corner 36th Street, Bonifacio Global City, Taguig',
    '[{"title":"Programmer Analyst S3/Web Programmer","description":["Internal Web Application (Metrobank Command Center): Develop and maintain the Metrobank Command Center, a web application that provides essential tools and resources for internal staff and partners, streamlining operations and enhancing customer service.","Backend and API Engineering: Design secure and scalable backend solutions using Node.js and LoopBack.io, implementing authentication through Keycloak and ensuring data protection with SSL. Conduct thorough API testing using Postman and cURL for secure integrations.","Frontend Development: Build dynamic user interfaces with Next.js and React.js, ensuring a responsive and engaging user experience that meets the high standards of the banking sector.","Data Management and Search: Utilize MongoDB for robust data management and Elasticsearch for efficient data retrieval and indexing, optimizing performance across applications.","Quality Assurance and Testing: Ensure high code quality using SonarQube and perform unit testing with frameworks such as Mocha and Jest to maintain reliable, bug-free applications.","Project Management and Collaboration: Utilize Jira for effective project management and workflow tracking, ensuring alignment and collaboration across development teams. Employ WinSCP for secure file transfers and version control through GitHub/GitLab for collaborative coding efforts."]}]'::jsonb,
    3
  );

INSERT INTO education (school, course, location, geo_location, sort_order) VALUES
  (
    'College of the Holy Spirit | 2007 - 2008',
    'Bachelor of Science in Nursing',
    'F. Tanedo St. Poblacion, Tarlac City',
    '{"loc":"College of the Holy Spirit","lat":15.473289897681566,"lng":120.60510090279645}'::jsonb,
    0
  ),
  (
    'AMA Computer College | 2010 - 2014',
    'Bachelor of Science in Information Technology',
    'Zamora St., San Roque, Tarlac City',
    '{"loc":"AMA Computer College","lat":15.483517473362491,"lng":120.59107342922043}'::jsonb,
    1
  );
