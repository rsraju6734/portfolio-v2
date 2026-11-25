/* =====================================================================
   SITE CONTENT — EDIT EVERYTHING HERE
   ---------------------------------------------------------------------
   This one file holds all the text, links, projects, skills and services
   shown on the website. You never need to touch the components to update
   your content.

   Tips for beginners:
   • Keep the quotes "..." around text values.
   • Keep the comma , at the end of each line inside { } and [ ].
   • To hide a link, set it to an empty string: ''
   • Images go in the  public/images/  folder. Refer to them as
     'images/your-file.jpg'  (no leading slash).
   ===================================================================== */

export const profile = {
  name: 'MD Raju Howlader',
  firstName: 'Raju',
  shortName: 'Raju Howlader',
  initials: 'RH',

  // Main title used in the hero, browser tab and search results
  title: 'Founder of Khoka Tech | AI-Assisted Developer | Web Developer | Digital Entrepreneur',
  subtitle: 'AI-Assisted Developer | Web Research Specialist | Digital Problem Solver',
  tagline: 'Building Digital Experiences. Empowering Businesses with Technology.',

  // Hero headline (two lines)
  headline: ['Building Digital Experiences.', 'Creating Intelligent Solutions.'],

  location: 'Narayanganj, Bangladesh',
  timezone: 'Asia/Dhaka', // used for the live "local time" clock
  email: 'rsraju673@gmail.com',

  // WhatsApp — international format without "+" or spaces. Set to '' to hide.
  whatsapp: '8801719531952',
  whatsappDisplay: '01719531952',

  available: true, // shows the "Available for projects" badge

  // Your photo: save your picture as  public/images/profile.jpg
  // (square, at least 900x900). It is used automatically.
  // Until that file exists, the photo from your previous portfolio is shown.
  photo: 'images/profile.jpg',
  photoFallback: 'https://rsraju6734.github.io/portfolio/assets/profile.jpg',
  photoAlt: 'Portrait of MD Raju Howlader',

  // Transparent cutout shown floating in the hero (made with tools/cutout.py).
  // Set to '' to use the round photo instead.
  portraitCutout: 'images/portrait-cutout.webp',

  roles: [
    'AI-Assisted Web Developer',
    'Web Research Specialist',
    'Data Entry Specialist',
    'Lead Generation Specialist',
    'Virtual Assistant',
    'AI Chatbot Developer',
    'Creative Digital Solution Builder',
  ],
}

/* ---------------------------------------------------------------------
   EDITORIAL HEADLINES (the big statements on each section)
   In every headline, `lead` is shown in cream and `accent` in red.
   --------------------------------------------------------------------- */
export const editorial = {
  heroWord: 'RAJU',                       // giant red name in the hero
  heroStack: ['Web.', 'Data.', 'Research.', 'AI.'],  // small stacked words (last one is red)
  heroNote: 'Founder of Khoka Tech',
  heroProof: '8 research projects · 600+ records',

  approach: { label: 'The approach', lead: "Websites aren't about", accent: 'code.', sub: "It's about what they do for your business.", side: 'Research first. Build second. Deliver something useful and honest.' },
  founder: { label: 'Khoka Tech', lead: "I don't just build websites.", accent: 'I built Khoka Tech.', tags: ['Websites', 'AI Chatbots', 'Business Sites', 'Digital Services'] },
  services: { label: 'What I do', lead: 'Services that', accent: 'move work forward.' },
  difference: { label: 'The difference', top: 'You have a business.', big: 'Good.', accent: 'Now get it working online.', quote: ["I don't just collect data.", 'I turn it into', 'something you can use.'], tags: ['Research', 'Web', 'AI', 'Data'], footnote: 'Because a website alone is the bare minimum.' },
  skills: { label: 'The toolkit', lead: 'Skills built on', accent: 'real work.' },
  work: { label: 'Selected work', lead: 'Things I', accent: 'have built.' },
  research: { label: 'Data research', lead: 'Research that', accent: 'delivers.' },
  method: { label: 'The method', quote: ['You bring the idea.', "I'll bring the solution."] },
  proof: { label: 'The proof', lead: "Don't take my word", accent: 'for it.', sub: 'See the work, the profiles and the projects for yourself.' },
  contact: { label: "Let's talk", lead: "Let's build something", accent: 'useful.' },
}

/* ---------------------------------------------------------------------
   ABOUT
   --------------------------------------------------------------------- */
export const about = {
  intro:
    "I'm MD Raju Howlader, founder of Khoka Tech, based in Narayanganj, Bangladesh. I combine careful online research, organized data work and AI-assisted development to solve practical business problems.",
  paragraphs: [
    'My work started with data: business data collection, Google Maps and Yellow Pages research, Amazon and eBay product research, and keeping large spreadsheets clean, consistent and ready to use.',
    'From there I moved into building things — responsive websites, AI chatbot concepts with Python and Flask, and digital solutions for small businesses. I use AI tools as a working partner for planning, research and development, and I am still actively growing my Python, Flask and AI skills.',
    'My approach is simple: understand the problem, research it properly, then use technology and creativity to deliver something useful and honest.',
  ],
  goals: [
    'Build modern, fast websites for businesses',
    'Create AI-powered tools and chatbots that save time',
    'Design simple business automation systems',
    'Provide reliable, affordable digital services through Khoka Tech',
  ],
  // Interactive journey timeline. No dates are shown on purpose —
  // add a `when` value (e.g. '2025') to any step if you want one displayed.
  journey: [
    {
      title: 'Data entry & online research',
      text: 'Started with data entry, web research and spreadsheet work — learning accuracy, consistency and following exact client formats.',
      when: '',
    },
    {
      title: 'Research & lead generation projects',
      text: 'Completed 8 data collection and research projects using Yellow Pages, Google Maps, LinkedIn, Amazon, eBay, Alibaba and Etsy.',
      when: '',
    },
    {
      title: 'AI-assisted web development',
      text: 'Began building responsive websites with HTML, CSS and JavaScript, using AI tools for planning and development support.',
      when: '',
    },
    {
      title: 'Python, Flask & chatbots',
      text: 'Built the AI Shop Chatbot concept with Python and Flask — still learning and improving these skills every week.',
      when: '',
    },
    {
      title: 'Founded Khoka Tech',
      text: 'Launched Khoka Tech, my own technology and digital services brand for modern, affordable business solutions.',
      when: '',
    },
    {
      title: 'Now',
      text: 'Building websites, AI-powered tools and automation ideas for businesses — and learning something new on every project.',
      when: '',
    },
  ],
}

/* ---------------------------------------------------------------------
   VERIFIED NUMBERS ONLY — these are animated counters.
   Only add numbers you can honestly back up.
   --------------------------------------------------------------------- */
export const stats = [
  { value: 8, suffix: '', label: 'Data research projects completed' },
  { value: 600, suffix: '+', label: 'Data records collected & organized' },
  { value: 7, suffix: '', label: 'Online sources researched' },
]

/* ---------------------------------------------------------------------
   KHOKA TECH — your company
   --------------------------------------------------------------------- */
export const khokaTech = {
  name: 'Khoka Tech',
  role: 'Founder & Owner',
  // Put your logo at public/images/khoka-tech-logo.png and write the path
  // here. Leave '' to show the built-in placeholder monogram.
  logo: '',
  website: 'https://rsraju6734.github.io/khoka-tech/',
  facebook: 'https://www.facebook.com/profile.php?id=61596665769551',
  intro:
    'Khoka Tech is my own technology and digital services brand. I started it to give businesses — especially small and growing ones — access to modern websites and practical AI-powered tools without the complexity or cost they usually come with.',
  vision:
    'Modern and affordable digital solutions for every business. Technology should be something a local shop can use as easily as a large company — clear, useful, and built honestly.',
  pillars: [
    { title: 'Professional Websites', text: 'Responsive, fast business websites that look modern on every device.' },
    { title: 'AI-Powered Solutions', text: 'Chatbots and AI-assisted tools that help businesses answer, sell and organize.' },
    { title: 'Business Websites', text: 'Clear online presence for shops, restaurants and service providers.' },
    { title: 'Digital Services', text: 'Research, data management and digital support to keep work moving.' },
  ],
}

/* ---------------------------------------------------------------------
   SKILLS
   level: 'core' = strongest, 'growing' = currently learning
   --------------------------------------------------------------------- */
export const skillGroups = [
  {
    id: 'data',
    title: 'Data & Research',
    icon: 'search',
    blurb: 'Finding, verifying and structuring information from the web.',
    level: 'core',
    skills: [
      'Data Entry', 'Web Research', 'Online Research', 'Lead Generation', 'Data Collection',
      'Data Cleaning', 'Google Maps Research', 'Business Research', 'Amazon Product Research',
      'eBay Product Research',
    ],
  },
  {
    id: 'tools',
    title: 'Productivity Tools',
    icon: 'grid',
    blurb: 'Spreadsheets and documents that stay organized and easy to use.',
    level: 'core',
    skills: [
      'Microsoft Excel', 'Google Sheets', 'Google Docs', 'Microsoft Word', 'PDF to Excel',
      'Data Organization', 'Administrative Support',
    ],
  },
  {
    id: 'dev',
    title: 'Development',
    icon: 'code',
    blurb: 'Responsive websites and small web apps.',
    level: 'growing',
    skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'Flask', 'Responsive Web Design', 'Git', 'GitHub'],
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    icon: 'spark',
    blurb: 'Using AI as a practical partner — still learning and growing here.',
    level: 'growing',
    skills: [
      'AI-Assisted Development', 'AI Chatbot Development', 'AI Website Planning',
      'Business Automation Concepts', 'AI-Assisted Research', 'Conversational Chatbot Systems',
    ],
  },
]

/* ---------------------------------------------------------------------
   PROJECTS
   status: 'Completed' | 'Live' | 'Demo' | 'In Development' | 'Coming Soon'
   image:  optional screenshot path, e.g. 'images/projects/dineflow.jpg'
           (leave '' to show the built-in animated artwork)
   theme:  colours for the artwork  [from, to]
   links:  any link left as '' is hidden automatically
   --------------------------------------------------------------------- */
export const projects = [
  {
    id: 'khoka-tech',
    number: '01',
    title: 'Khoka Tech',
    category: 'Brand & Business Website',
    status: 'Live',
    featured: true,
    summary: 'My own technology and web development service brand — professional websites, AI-powered solutions and digital services.',
    description:
      'Khoka Tech is the digital services brand I founded. The website presents the brand, its services and how businesses can get in touch for websites and AI-assisted solutions.',
    focus: ['Professional website development', 'AI-powered solutions', 'Business websites', 'Digital services'],
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    image: '',
    theme: ['#c41e24', '#ff5a4f'],
    motif: 'brand',
    links: { live: 'https://rsraju6734.github.io/khoka-tech/', code: '', extra: { label: 'Facebook Page', url: 'https://www.facebook.com/profile.php?id=61596665769551' } },
  },
  {
    id: 'ai-shop-chatbot',
    number: '02',
    title: 'AI Shop Chatbot',
    category: 'AI Chatbot · Python / Flask',
    status: 'Demo',
    summary: 'An AI-assisted shopping chatbot concept that helps customers explore products, check prices and stock, and interact with an online shop.',
    description:
      'A shopping assistant concept built with Python and Flask. Customers can ask about products, prices and stock availability through a conversational interface on top of a simple online shop.',
    focus: ['Product exploration', 'Price checks', 'Stock availability', 'Conversational shop interface'],
    tech: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript'],
    image: '',
    theme: ['#8f1218', '#e8e2d6'],
    motif: 'chat',
    links: { live: '', code: 'https://github.com/rsraju6734/ai-shop-chatbot' },
  },
  {
    id: 'shikbolab',
    number: '03',
    title: 'ShikboLab',
    category: 'Education Platform',
    status: 'Live',
    summary: 'An educational digital learning platform with chapter-based lessons and a student-friendly, interactive experience.',
    description:
      'ShikboLab is an educational platform focused on making learning approachable — content organized by chapter, interactive learning elements, and an interface designed for students.',
    focus: ['Educational content', 'Chapter-based learning', 'Interactive learning experience', 'Student-friendly interface'],
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: '',
    theme: ['#c41e24', '#e8e2d6'],
    motif: 'learn',
    links: { live: 'https://rsraju6734.github.io/shikbolab/science_lab', code: '' },
  },
  {
    id: 'dineflow',
    number: '04',
    title: 'DineFlow',
    category: 'Restaurant Solution',
    status: 'Demo',
    summary: 'A modern restaurant management and digital ordering solution concept.',
    description:
      'DineFlow explores how a restaurant can run its website, digital menu and incoming orders from one modern interface.',
    focus: ['Restaurant website', 'Digital menu', 'Order management', 'Restaurant business solutions'],
    tech: ['Web App', 'Render'],
    image: '',
    theme: ['#ff3b30', '#8f1218'],
    motif: 'menu',
    note: 'Hosted on a free Render plan — the first load can take up to a minute while the server wakes up.',
    links: { live: 'https://dineflow-ljlx.onrender.com/', code: '' },
  },
  {
    id: 'infinite-ticking',
    number: '05',
    title: 'Infinite Ticiking',
    category: 'E-commerce · AI Chatbot',
    status: 'Demo',
    summary: 'An e-commerce watch shop concept with an AI shopping chatbot for product information and customer interaction.',
    description:
      'A watch store concept that pairs a product showcase with a shopping chatbot, so customers can ask about watches and get product information conversationally.',
    focus: ['Watch product showcase', 'Shopping chatbot', 'Product information', 'Customer interaction'],
    tech: ['Web App', 'Vercel'],
    image: '',
    theme: ['#e8e2d6', '#c41e24'],
    motif: 'watch',
    links: { live: 'https://infinite-ticking.vercel.app/', code: '' },
  },
  {
    id: 'glowcare-ai',
    number: '06',
    title: 'GlowCare AI',
    category: 'Beauty · AI Website',
    status: 'Coming Soon',
    summary: 'A beauty and skincare website concept with AI-assisted features and a modern responsive design.',
    description:
      'GlowCare AI is a beauty-focused website concept exploring AI-assisted features for skincare shoppers. It is currently in progress — a live link will be added here soon.',
    focus: ['Beauty-focused website experience', 'AI-assisted features', 'Modern responsive design'],
    tech: ['In planning'],
    image: '',
    theme: ['#ff5a4f', '#5a0b0f'],
    motif: 'glow',
    links: { live: '', code: '' }, // add the demo URL here when ready
  },
]

/* ---------------------------------------------------------------------
   DATA RESEARCH CASE STUDIES (from your completed work)
   columns: the spreadsheet headers shown in the preview.
   The preview shows STRUCTURE ONLY — no real client data is displayed.
   --------------------------------------------------------------------- */
export const research = {
  intro:
    'Real research and data collection work, delivered as clean, structured spreadsheets in Excel and Google Sheets.',
  tools: ['Microsoft Excel', 'Google Sheets'],
  cases: [
    {
      title: 'US Restaurant Business Records',
      source: 'Yellow Pages',
      records: '250+',
      type: 'Business data collection',
      columns: ['Business Name', 'Category', 'Phone', 'Address', 'City', 'State', 'Website'],
    },
    {
      title: 'US Restaurant Research',
      source: 'Google Maps',
      records: '100',
      type: 'Local business research',
      columns: ['Restaurant', 'Rating', 'Reviews', 'Phone', 'Address', 'Website'],
    },
    {
      title: 'Clothing Product Research',
      source: 'Amazon',
      records: '50',
      type: 'Product research',
      columns: ['Product Title', 'Brand', 'Price', 'Rating', 'Reviews', 'Product URL'],
    },
    {
      title: 'Laptop Product Research',
      source: 'eBay',
      records: '50',
      type: 'Product research',
      columns: ['Listing Title', 'Brand', 'Condition', 'Price', 'Seller', 'Listing URL'],
    },
    {
      title: 'Smart Watch & Fitness Gadgets',
      source: 'Alibaba',
      records: '50',
      type: 'Product research',
      columns: ['Product', 'Supplier', 'Price Range', 'MOQ', 'Product URL'],
    },
    {
      title: 'Beauty Product Sellers',
      source: 'Amazon',
      records: '50',
      type: 'Seller business research',
      columns: ['Seller Name', 'Store URL', 'Business Name', 'Address', 'Category'],
    },
    {
      title: 'Real Estate Decision Makers',
      source: 'LinkedIn',
      records: '50',
      type: 'Lead generation',
      columns: ['Company', 'Decision Maker', 'Job Title', 'Location', 'LinkedIn URL'],
    },
    {
      title: 'Jewelry Shop Research',
      source: 'eBay & Etsy',
      records: '',
      type: 'Shop research',
      columns: ['Shop Name', 'Platform', 'Location', 'Shop URL', 'Category'],
    },
  ],
}

/* ---------------------------------------------------------------------
   SERVICES — icon names: keyboard, globe, target, database, sheet,
   cart, bot, layout, spark
   --------------------------------------------------------------------- */
export const services = [
  { title: 'Professional Data Entry', icon: 'keyboard', text: 'Accurate entry into spreadsheets, documents and systems — in exactly the format you need.', more: 'Typing from documents, PDF to Excel conversion, CRM and sheet updates, with consistency checks before delivery.' },
  { title: 'Web & Online Research', icon: 'globe', text: 'Finding and verifying information from reliable sources online.', more: 'Company details, contact information, market lists and fact-checking, organized so it is easy to use.' },
  { title: 'Lead Generation', icon: 'target', text: 'Targeted lists of businesses and decision makers for your outreach.', more: 'Names, job titles, websites, phone numbers and emails collected from sources like LinkedIn, Google Maps and directories.' },
  { title: 'Business Data Collection', icon: 'database', text: 'Structured business data from directories, maps and websites.', more: 'Yellow Pages, Google Maps and website research delivered as clean, de-duplicated sheets.' },
  { title: 'Excel & Google Sheets Management', icon: 'sheet', text: 'Clean, organized, well-formatted spreadsheets that stay consistent.', more: 'Data cleaning, formatting, sorting, removing duplicates and preparing sheets for sharing.' },
  { title: 'Amazon & eBay Product Research', icon: 'cart', text: 'Product, price and seller information from major marketplaces.', more: 'Titles, brands, prices, ratings, sellers and URLs from Amazon, eBay, Alibaba and Etsy.' },
  { title: 'AI Chatbot Development', icon: 'bot', text: 'Conversational chatbots that help customers find answers and products.', more: 'Python / Flask chatbot concepts for shops and businesses — built step by step with AI-assisted development.' },
  { title: 'Responsive Website Development', icon: 'layout', text: 'Modern websites that look right on phones, tablets and desktops.', more: 'Business websites, landing pages and portfolios built with HTML, CSS and JavaScript, hosted for free on GitHub Pages where possible.' },
  { title: 'AI-Assisted Digital Solutions', icon: 'spark', text: 'Practical ways AI can support your everyday business workflow.', more: 'Website planning, research support and simple automation ideas using AI tools — honestly scoped.' },
]

/* ---------------------------------------------------------------------
   WORK PROCESS
   --------------------------------------------------------------------- */
export const process = [
  { title: 'Understand Client Requirements', text: 'I read your brief carefully and confirm the goal, sources, format and deadline before starting.' },
  { title: 'Research & Planning', text: 'I research the problem, plan the structure and choose the right tools for the job.' },
  { title: 'Design & Development', text: 'I collect, organize or build — keeping you updated as the work takes shape.' },
  { title: 'Testing & Improvement', text: 'I check accuracy, test on real devices and refine anything that is not right.' },
  { title: 'Final Delivery', text: 'You receive clean, ready-to-use results, with support for any follow-up changes.' },
]

/* ---------------------------------------------------------------------
   SOCIAL & PROFESSIONAL LINKS
   Set url to '' to hide an item. `note` shows a small label under it.
   icon names: github, linkedin, facebook, fiverr, upwork, pph, whatsapp,
               email, instagram, youtube, globe
   --------------------------------------------------------------------- */
export const socials = [
  { name: 'GitHub', icon: 'github', handle: 'rsraju6734', url: 'https://github.com/rsraju6734' },
  { name: 'LinkedIn', icon: 'linkedin', handle: 'Raju Howlader', url: 'https://www.linkedin.com/in/raju-howlader-a96208433' },
  { name: 'Fiverr', icon: 'fiverr', handle: 'rsraju741', url: 'https://www.fiverr.com/rsraju741' },
  { name: 'Upwork', icon: 'upwork', handle: 'Freelancer profile', url: 'https://www.upwork.com/freelancers/~0130d25dc418abd345?mp_source=share' },
  // Replace with your PeoplePerHour seller profile when you have it,
  // and remove the `note`.
  { name: 'PeoplePerHour', icon: 'pph', handle: 'Referral program link', note: 'Referral link', url: 'https://www.peopleperhour.com/referral-program?ref=topmenu_loggedin' },
  { name: 'Facebook', icon: 'facebook', handle: 'rs.raju', url: 'https://www.facebook.com/rs.raju.247439' },
  { name: 'Khoka Tech Page', icon: 'facebook', handle: 'Facebook business page', url: 'https://www.facebook.com/profile.php?id=61596665769551' },
  { name: 'WhatsApp', icon: 'whatsapp', handle: '01719531952', url: 'https://wa.me/8801719531952' },
  { name: 'Email', icon: 'email', handle: 'rsraju673@gmail.com', url: 'mailto:rsraju673@gmail.com' },
  { name: 'Old Portfolio', icon: 'globe', handle: 'Previous version', url: 'https://rsraju6734.github.io/portfolio/#home' },
  // Add these when ready (leave '' to keep hidden):
  { name: 'Instagram', icon: 'instagram', handle: '', url: '' },
  { name: 'YouTube', icon: 'youtube', handle: '', url: '' },
]

/* ---------------------------------------------------------------------
   CONTACT FORM
   The site has no server, so by default the form runs in DEMO MODE:
   it does NOT send messages. Instead it offers to open the visitor's
   email app with the message filled in.

   To receive messages for free, create a form at https://formspree.io,
   then paste your form endpoint below, e.g.
     formEndpoint: 'https://formspree.io/f/abcdwxyz'
   (This is a public URL, not a secret — it is safe to put here.)
   --------------------------------------------------------------------- */
export const contact = {
  formEndpoint: '',
  heading: "Let's build something useful.",
  text: 'Have a website, chatbot, research or data project in mind? Tell me what you need and I will reply as soon as I can.',
}

/* ---------------------------------------------------------------------
   SEO — used in the page <head> (also edit index.html for crawlers)
   --------------------------------------------------------------------- */
export const seo = {
  siteUrl: 'https://rsraju6734.github.io/portfolio-v2/',
}
