// Shared data for DE-MAIZE website

export const services = [
  {
    id: 'web-development',
    icon: 'Globe',
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
    fullDescription: `Our web development services deliver cutting-edge solutions that drive business growth. We specialize in creating responsive, fast-loading websites and web applications using the latest technologies including React, Next.js, and Node.js.

Our team follows industry best practices for SEO, accessibility, and performance optimization to ensure your website not only looks great but also ranks well and converts visitors into customers.`,
    features: [
      'Custom website design and development',
      'E-commerce solutions with secure payment integration',
      'Progressive Web Apps (PWA) development',
      'Content Management System (CMS) integration',
      'API development and third-party integrations',
      'Performance optimization and SEO',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'mobile-apps',
    icon: 'Smartphone',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications that deliver seamless experiences across all devices.',
    fullDescription: `We build mobile applications that users love. Whether you need a native iOS app, Android app, or a cross-platform solution, our expert developers create intuitive, high-performance mobile experiences.

From concept to launch, we handle every aspect of mobile app development including UI/UX design, backend development, API integration, and app store deployment.`,
    features: [
      'Native iOS and Android development',
      'Cross-platform apps with React Native',
      'UI/UX design optimized for mobile',
      'Push notifications and real-time features',
      'Offline functionality and data sync',
      'App Store and Play Store deployment',
    ],
    technologies: ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Firebase', 'GraphQL'],
  },
  {
    id: 'digital-marketing',
    icon: 'Megaphone',
    title: 'Digital Marketing',
    description: 'Strategic marketing campaigns that drive traffic, generate leads, and increase brand awareness.',
    fullDescription: `Our digital marketing strategies are data-driven and results-focused. We help businesses reach their target audience through carefully crafted campaigns across multiple channels including search engines, social media, and email.

We continuously analyze and optimize campaigns to maximize ROI, ensuring every marketing dollar works harder for your business.`,
    features: [
      'Search Engine Optimization (SEO)',
      'Pay-Per-Click (PPC) advertising',
      'Social media marketing and management',
      'Email marketing campaigns',
      'Content marketing strategy',
      'Analytics and performance reporting',
    ],
    technologies: ['Google Ads', 'Meta Ads', 'Google Analytics', 'SEMrush', 'HubSpot', 'Mailchimp'],
  },
  {
    id: 'software-solutions',
    icon: 'Code',
    title: 'Software Solutions',
    description: 'Custom software development tailored to your business needs, from MVPs to enterprise systems.',
    fullDescription: `We develop custom software solutions that solve complex business challenges. Our agile development process ensures rapid delivery while maintaining the highest quality standards.

From startup MVPs to enterprise-grade systems, we have the expertise to build scalable, secure, and maintainable software that grows with your business.`,
    features: [
      'Custom enterprise software development',
      'SaaS product development',
      'Legacy system modernization',
      'Cloud-native application development',
      'Microservices architecture',
      'DevOps and CI/CD implementation',
    ],
    technologies: ['Python', 'Java', 'Go', 'Docker', 'Kubernetes', 'Azure'],
  },
  {
    id: 'ui-ux-design',
    icon: 'Palette',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive designs that enhance user engagement and create memorable digital experiences.',
    fullDescription: `Great design is at the heart of every successful digital product. Our UI/UX design team creates visually stunning interfaces backed by solid user research and usability testing.

We believe in design that not only looks beautiful but also drives business results by improving user satisfaction, engagement, and conversion rates.`,
    features: [
      'User research and persona development',
      'Information architecture and wireframing',
      'Visual design and brand identity',
      'Interactive prototyping',
      'Usability testing and iteration',
      'Design system creation',
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer'],
  },
  {
    id: 'data-analytics',
    icon: 'BarChart3',
    title: 'Data Analytics',
    description: 'Transform your data into actionable insights with our advanced analytics and visualization solutions.',
    fullDescription: `Data is the new oil, and we help you refine it. Our data analytics services turn raw data into actionable insights that drive smarter business decisions.

From setting up data infrastructure to building custom dashboards and predictive models, we provide end-to-end analytics solutions tailored to your needs.`,
    features: [
      'Business intelligence dashboards',
      'Custom reporting solutions',
      'Predictive analytics and ML models',
      'Data warehouse design',
      'ETL pipeline development',
      'Real-time analytics systems',
    ],
    technologies: ['Python', 'Tableau', 'Power BI', 'Snowflake', 'Apache Spark', 'TensorFlow'],
  },
]

export const projects = [
  {
    id: 'agritech-platform',
    title: 'AgriTech Platform',
    category: 'Web Design',
    description: 'A comprehensive agricultural management system',
    fullDescription: `We developed a comprehensive agricultural management platform that helps farmers and agribusinesses optimize their operations. The system includes crop monitoring, inventory management, and market price tracking.

The platform processes real-time data from IoT sensors to provide actionable insights on soil conditions, weather patterns, and optimal harvest times.`,
    image: '/images/hero-maize.png',
    client: 'GreenFields Agriculture',
    duration: '6 months',
    results: ['40% increase in crop yield', '30% reduction in water usage', '25% decrease in operational costs'],
    technologies: ['Next.js', 'Python', 'PostgreSQL', 'IoT Sensors', 'Machine Learning'],
  },
  {
    id: 'ecommerce-solution',
    title: 'E-Commerce Solution',
    category: 'Web Design',
    description: 'Modern online store with seamless checkout',
    fullDescription: `We built a high-performance e-commerce platform that handles thousands of transactions daily. The solution includes advanced product filtering, personalized recommendations, and a streamlined checkout process.

The platform integrates with multiple payment gateways and shipping providers, offering customers a seamless shopping experience across all devices.`,
    gradient: 'from-primary/80 to-accent/60',
    client: 'Fashion Forward Retail',
    duration: '4 months',
    results: ['200% increase in online sales', '45% improvement in conversion rate', '60% reduction in cart abandonment'],
    technologies: ['React', 'Node.js', 'Stripe', 'Redis', 'Elasticsearch'],
  },
  {
    id: 'finance-dashboard',
    title: 'Finance Dashboard',
    category: 'Mobile Apps',
    description: 'Real-time financial tracking application',
    fullDescription: `We created a sophisticated financial dashboard that provides real-time insights into business finances. The application aggregates data from multiple sources to give executives a complete picture of their financial health.

Features include customizable KPI tracking, automated report generation, and predictive cash flow analysis.`,
    gradient: 'from-accent/80 to-primary/60',
    client: 'Capital Investments Ltd',
    duration: '5 months',
    results: ['50% faster financial reporting', '35% improvement in budget accuracy', 'Real-time visibility across 12 departments'],
    technologies: ['React Native', 'Python', 'PostgreSQL', 'Power BI', 'Plaid API'],
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    category: 'Branding',
    description: 'Complete brand redesign for tech startup',
    fullDescription: `We executed a complete brand transformation for a growing tech startup. The project included new visual identity, brand guidelines, marketing collateral, and digital presence overhaul.

The new brand positioning helped the client stand out in a crowded market and attract both customers and investors.`,
    gradient: 'from-primary/60 to-secondary',
    client: 'TechNova Innovations',
    duration: '3 months',
    results: ['150% increase in brand recognition', '80% more investor inquiries', '3x social media engagement'],
    technologies: ['Figma', 'Adobe Creative Suite', 'Motion Graphics', 'Brand Strategy'],
  },
  {
    id: 'marketing-campaign',
    title: 'Marketing Campaign',
    category: 'Marketing',
    description: 'Multi-channel digital marketing strategy',
    fullDescription: `We designed and executed a comprehensive digital marketing campaign spanning search, social, email, and content marketing channels.

The data-driven approach allowed us to continuously optimize campaigns, resulting in exceptional ROI and sustainable growth in customer acquisition.`,
    gradient: 'from-secondary to-accent/40',
    client: 'HealthPlus Supplements',
    duration: '12 months',
    results: ['300% increase in qualified leads', '45% reduction in cost per acquisition', '500K+ organic website visits'],
    technologies: ['Google Ads', 'Meta Ads', 'HubSpot', 'SEMrush', 'Google Analytics'],
  },
  {
    id: 'healthcare-app',
    title: 'Healthcare App',
    category: 'Mobile Apps',
    description: 'Patient management mobile application',
    fullDescription: `We developed a HIPAA-compliant mobile application that revolutionizes patient care management. The app enables patients to schedule appointments, access medical records, and communicate with healthcare providers.

The solution also includes a provider portal for managing patient information and automating administrative tasks.`,
    gradient: 'from-accent/60 to-primary/40',
    client: 'MedCare Hospital Network',
    duration: '8 months',
    results: ['60% reduction in no-show appointments', '90% patient satisfaction rating', '40% decrease in administrative workload'],
    technologies: ['React Native', 'Node.js', 'MongoDB', 'HIPAA Compliance', 'Twilio'],
  },
]

export const blogPosts = [
  {
    id: 'future-of-digital-marketing-2026',
    title: 'The Future of Digital Marketing in 2026',
    excerpt: 'Explore the emerging trends and technologies shaping the future of digital marketing strategies.',
    content: `The digital marketing landscape is evolving at an unprecedented pace. As we move through 2026, several key trends are reshaping how businesses connect with their audiences.

## AI-Powered Personalization

Artificial intelligence has moved beyond simple automation to enable hyper-personalized customer experiences. Machine learning algorithms now analyze customer behavior in real-time, delivering tailored content, product recommendations, and messaging that resonates on an individual level.

## Voice and Visual Search

With the proliferation of smart devices and improved image recognition technology, voice and visual search have become mainstream. Brands are optimizing their content for conversational queries and ensuring their products are discoverable through image searches.

## Privacy-First Marketing

As data privacy regulations tighten globally, marketers are adapting to a cookieless future. First-party data strategies and contextual advertising are becoming essential skills for modern marketers.

## Interactive and Immersive Content

Augmented reality, virtual reality, and interactive content formats are creating more engaging brand experiences. From virtual product try-ons to interactive storytelling, these technologies are bridging the gap between digital and physical worlds.

## Sustainability Marketing

Consumers increasingly favor brands that demonstrate genuine commitment to sustainability. Green marketing and transparent communication about environmental practices have become competitive advantages.

The marketers who thrive in 2026 will be those who embrace these changes while maintaining focus on delivering genuine value to their audiences.`,
    category: 'Marketing',
    date: 'May 28, 2026',
    readTime: '5 min read',
    gradient: 'from-primary/60 to-accent/40',
    author: 'Sarah Johnson',
    authorRole: 'Marketing Director',
  },
  {
    id: 'building-scalable-web-applications',
    title: 'Building Scalable Web Applications',
    excerpt: 'Best practices for creating web applications that can handle growth and maintain performance.',
    content: `Scalability is one of the most critical considerations when building modern web applications. A system that works perfectly for 100 users may completely fail under the load of 10,000 users.

## Architecture Matters

The foundation of any scalable application is its architecture. Microservices architecture allows different parts of your application to scale independently based on demand. This approach provides flexibility and resilience that monolithic applications simply cannot match.

## Database Optimization

Database performance is often the first bottleneck as applications grow. Implementing proper indexing, query optimization, and caching strategies can dramatically improve performance. Consider using read replicas for read-heavy workloads and implementing database sharding for horizontal scaling.

## Caching Strategies

Implementing multi-layer caching significantly reduces database load and improves response times. Use CDNs for static assets, Redis for session and data caching, and application-level caching for computed values.

## Asynchronous Processing

Move time-consuming operations to background queues. Email sending, image processing, and report generation should never block user requests. Tools like Redis Queue, RabbitMQ, or cloud-native solutions make this straightforward.

## Monitoring and Observability

You cannot optimize what you cannot measure. Implement comprehensive logging, metrics collection, and distributed tracing from day one. This visibility is essential for identifying bottlenecks before they become critical.

## Infrastructure as Code

Use tools like Terraform or Pulumi to define your infrastructure. This ensures consistency across environments and enables rapid scaling when needed.

Building for scale from the start is always more cost-effective than retrofitting scalability into an existing system.`,
    category: 'Development',
    date: 'May 22, 2026',
    readTime: '7 min read',
    gradient: 'from-accent/60 to-primary/40',
    author: 'Michael Chen',
    authorRole: 'Lead Developer',
  },
  {
    id: 'ui-ux-trends-drive-conversions',
    title: 'UI/UX Trends That Drive Conversions',
    excerpt: 'Design principles and trends that help convert visitors into customers effectively.',
    content: `In the competitive digital landscape, exceptional user experience is no longer optional—it is the primary differentiator between success and failure.

## Minimalist Design with Purpose

The trend toward minimalism continues, but with a crucial evolution: every element must serve a clear purpose. Whitespace is used strategically to guide attention, and visual hierarchy clearly communicates what actions users should take.

## Micro-interactions

Small, delightful animations that respond to user actions create a sense of responsiveness and polish. From button hover states to loading animations, these details significantly impact perceived quality and user satisfaction.

## Dark Mode and Accessibility

Dark mode has moved from trend to expectation. But beyond aesthetics, the focus on accessibility has intensified. Designs must work for users with various abilities, including those using screen readers, keyboard navigation, or dealing with color blindness.

## Personalized User Journeys

One-size-fits-all interfaces are giving way to adaptive designs that change based on user behavior, preferences, and context. This personalization extends to content, layout, and even functionality.

## Trust Indicators

With increasing online fraud, users need reassurance. Effective designs prominently feature security badges, customer reviews, clear return policies, and transparent pricing. These trust signals directly impact conversion rates.

## Mobile-First is Non-Negotiable

With mobile traffic dominating most industries, mobile-first design is no longer optional. Touch-friendly interfaces, fast load times, and thumb-zone optimization are essential for conversion.

The most successful designs balance aesthetics with function, creating experiences that are both beautiful and effortlessly usable.`,
    category: 'Design',
    date: 'May 15, 2026',
    readTime: '4 min read',
    gradient: 'from-primary/40 to-accent/60',
    author: 'Emily Rodriguez',
    authorRole: 'Design Lead',
  },
]

export const categories = ['All', 'Web Design', 'Mobile Apps', 'Branding', 'Marketing']
