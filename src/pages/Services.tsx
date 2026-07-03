import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Cpu, Code, Zap, PenTool,
  Database, Cloud, Server, Users, Settings, Lock,
  Globe, Layers
} from 'lucide-react';

import SectionHeader from '../components/SectionHeader';
import Accordion from '../components/Accordion';
import FlowingMenu from '../components/FlowingMenu';
import { services } from '../data/services';
import './Services.css';

const compassItems = [
  {
    id: "custom-software",
    angle: 0,
    direction: "N",
    title: "Custom Software",
    desc: "End-to-end bespoke software systems designed to solve operational bottlenecks and scale with your user base.",
    subServices: ["Enterprise CRM/ERP", "SaaS Architectures", "Custom Databases"],
    image: "/images/service_backend.png"
  },
  {
    id: "ai-solutions",
    angle: 45,
    direction: "NE",
    title: "AI Solutions",
    desc: "Deploy custom LLMs, autonomous agent systems, and secure semantic search algorithms mapped to your business data.",
    subServices: ["Generative AI & LLMs", "Retrieval-Augmented Gen (RAG)", "Autonomous Agents"],
    image: "/images/service_ai.png"
  },
  {
    id: "cloud-solutions",
    angle: 90,
    direction: "E",
    title: "Cloud & DevOps",
    desc: "Scalable cloud infrastructures, automated Kubernetes clustering, and zero-downtime deployment pipelines.",
    subServices: ["AWS / Azure / GCP Migration", "Kubernetes & Docker", "CI/CD Orchestration"],
    image: "/images/service_cloud.png"
  },
  {
    id: "business-automation",
    angle: 135,
    direction: "SE",
    title: "Business Automation",
    desc: "Maximize operational efficiency by connecting disparate toolkits with advanced workflows and custom middleware APIs.",
    subServices: ["n8n Integration Pipelines", "Custom API Webhooks", "Data Sync Automation"],
    image: "/images/service_automation.png"
  },
  {
    id: "ui-ux-design",
    angle: 180,
    direction: "S",
    title: "UI/UX Design",
    desc: "Craft premium digital products, structured design libraries, and intuitive visual hierarchies that convert visitors.",
    subServices: ["High-Fidelity Mockups", "Structured Figma Systems", "Interactive Prototyping"],
    image: "/images/service_uiux.png"
  },
  {
    id: "mobile-development",
    angle: 225,
    direction: "SW",
    title: "Mobile Development",
    desc: "High-fidelity, responsive mobile applications for iOS and Android built on native and cross-platform foundations.",
    subServices: ["React Native & Flutter", "iOS / Android Native SDKs", "App Store Publishing"],
    image: "/images/proj_ecommerce.png"
  },
  {
    id: "web-development",
    angle: 270,
    direction: "W",
    title: "Web Development",
    desc: "Super-fast, SEO-optimized business websites and admin hubs built utilizing cutting-edge Next.js and React frameworks.",
    subServices: ["Next.js & React Frameworks", "Core Web Vitals Tuning", "Headless CMS Integration"],
    image: "/images/service_frontend.png"
  },
  {
    id: "cybersecurity",
    angle: 315,
    direction: "NW",
    title: "Cybersecurity",
    desc: "Enterprise-grade penetration auditing, compliance preparation, and military-grade encryption systems.",
    subServices: ["Vulnerability Auditing", "Compliance Verification", "End-to-End Encryption"],
    image: "/images/ind_saas.png"
  }
];

const features = [
  { title: "Experienced Team", desc: "Senior engineers with decades of combined experience building resilient systems.", image: "/images/ind_healthcare.png" },
  { title: "Agile Development", desc: "Iterative sprints ensuring continuous delivery and rapid adaptation to requirements.", image: "/images/proj_dashboard.png" },
  { title: "Scalable Solutions", desc: "Cloud-native architectures designed to grow seamlessly with your user base.", image: "/images/proj_microservices.png" },
  { title: "Security First", desc: "Enterprise-grade security practices embedded in every stage of the SDLC.", image: "/images/ind_saas.png" },
  { title: "Continuous Support", desc: "Dedicated maintenance and monitoring to ensure 99.9% uptime.", image: "/images/ind_logistics.png" },
  { title: "Innovation Driven", desc: "Proactively integrating the latest AI and cloud advancements to give you an edge.", image: "/images/proj_ai.png" }
];

const processSteps = [
  { title: "Discovery", desc: "We align on your business goals, technical constraints, and user needs through deep dive sessions." },
  { title: "Strategy & Architecture", desc: "Designing robust system architectures, selecting the optimal stack, and planning the data models." },
  { title: "Design", desc: "Creating intuitive, high-fidelity user interfaces and comprehensive design systems." },
  { title: "Development", desc: "Iterative, test-driven engineering executing against the strategic roadmap." },
  { title: "Testing", desc: "Rigorous QA, security auditing, and performance stress-testing across all environments." },
  { title: "Deployment", desc: "Zero-downtime releases utilizing automated CI/CD pipelines to secure cloud infrastructure." },
  { title: "Support", desc: "Ongoing monitoring, optimization, and feature iterations to scale the product." }
];

const faqs = [
  { question: "How do you price your custom software projects?", answer: "We offer flexible pricing models based on the project scope. For well-defined MVPs, we can provide fixed-bid estimates. For complex, ongoing development, we operate on a dedicated team or time-and-materials basis. We always prioritize transparency." },
  { question: "Will we own the intellectual property?", answer: "Absolutely. Upon project completion and final payment, you retain 100% ownership of the custom source code and all associated intellectual property." },
  { question: "How long does a typical project take?", answer: "Timelines vary wildly based on complexity. A straightforward web application might take 6-8 weeks, while an enterprise AI integration or complex SaaS platform can take 4-6 months for an initial v1 release." },
  { question: "Do you provide ongoing support and maintenance?", answer: "Yes. The vast majority of our clients retain us for ongoing support, feature enhancements, and infrastructure management long after the initial launch." },
  { question: "Can you rescue an existing project that went off track?", answer: "Yes. We frequently perform technical audits on existing codebases, stabilize the infrastructure, and take over development to get projects back on track." }
];

const industryItems = [
  { link: '#', text: 'Healthcare Tech', image: '/images/ind_healthcare.png' },
  { link: '#', text: 'Fintech & Banking', image: '/images/ind_fintech.png' },
  { link: '#', text: 'Manufacturing', image: '/images/ind_manufacturing.png' },
  { link: '#', text: 'Retail & E-Commerce', image: '/images/ind_ecommerce.png' },
  { link: '#', text: 'Logistics', image: '/images/ind_logistics.png' },
  { link: '#', text: 'Real Estate', image: '/images/ind_proptech.png' }
];

const rotatingPhrases = [
  "Intelligent Digital Solutions",
  "Scalable Cloud Architectures",
  "Enterprise-Grade Software",
  "Next-Gen AI Integrations",
  "High-Performance Web Platforms"
];

// Helper to map icon names from data to Lucide components
const getIcon = (name: string) => {
  switch(name) {
    case 'Cpu': return <Cpu size={24} />;
    case 'Code': return <Code size={24} />;
    case 'Layout': return <Globe size={24} />;
    case 'Zap': return <Zap size={24} />;
    case 'PenTool': return <PenTool size={24} />;
    default: return <Settings size={24} />;
  }
};

const serviceImageMap: Record<string, string> = {
  'ai-solutions': '/images/service_ai.png',
  'custom-software': '/images/service_backend.png',
  'web-development': '/images/service_frontend.png',
  'business-automation': '/images/service_automation.png',
  'ui-ux-design': '/images/service_uiux.png',
  'cloud-solutions': '/images/service_cloud.png',
  'mobile-development': '/images/proj_ecommerce.png',
  'cybersecurity': '/images/ind_saas.png'
};

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [activeCompassIndex, setActiveCompassIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Expand services data with a few more to match the user request if needed.
  // We will combine the existing 5 with some newly requested ones.
  const allServices = [
    ...services,
    {
      id: 'cloud-solutions',
      title: 'Cloud & DevOps Solutions',
      shortDesc: 'Scalable cloud architectures and automated deployment pipelines.',
      iconName: 'Settings',
      subServices: ['AWS/Azure', 'CI/CD Pipelines', 'Containerization', 'Serverless']
    },
    {
      id: 'mobile-development',
      title: 'Mobile App Development',
      shortDesc: 'Native and cross-platform mobile applications for iOS and Android.',
      iconName: 'Smartphone',
      subServices: ['React Native', 'Flutter', 'iOS Native', 'Android Native']
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      shortDesc: 'Enterprise-grade security audits and implementation.',
      iconName: 'Shield',
      subServices: ['Penetration Testing', 'Compliance', 'Data Encryption', 'Access Control']
    }
  ];

  return (
    <div className="services-page">
      {/* 1. Hero Section */}
      <section className="hero">
        <div className="hero-grid-bg"></div>
        <div className="hero-glow"></div>
        
        <div className="container hero__container">
          <div className="hero__content">
            <h1 className="hero__title">
              <span className="hero__title-static">Transforming Ideas into </span>
              <span className="rotating-text-wrapper">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={phraseIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="rotating-text"
                  >
                    {rotatingPhrases[phraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <motion.p 
              className="hero__subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              We engineer custom software, integrate cutting-edge AI, and build scalable cloud architectures that serve as the backbone for modern enterprises and fast-growing startups.
            </motion.p>
            <motion.div 
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <Link to="/contact" className="btn btn-accent">
                Schedule a Consultation
              </Link>
              <a href="#expertise" className="btn btn-ghost">
                Explore Solutions
              </a>
            </motion.div>
          </div>
          {/* Visual placeholder to ensure exact grid alignment matching homepage */}
          <div className="hero__visual" style={{ display: 'block' }}></div>
        </div>
      </section>

      {/* 2. Compass Overview Section */}
      <section className="section compass-section">
        <div className="container">
          <SectionHeader 
            label="Capabilities Map"
            title="Navigating Your Digital Growth"
            description="Explore our technical focus points. Hover over or tap the directional nodes around the high-tech dial to interact with our capabilities compass."
            align="center"
          />

          <div className="compass-layout" style={{ marginTop: 'var(--space-12)' }}>
            {/* The Compass Dial Column */}
            <div className="compass-dial-container">
              <div className="compass-dial">
                {/* Central Ring & Compass Ticks */}
                <div className="compass-dial__ring-outer"></div>
                <div className="compass-dial__ring-inner"></div>
                
                {/* Needle pointer */}
                <div 
                  className="compass-needle" 
                  style={{ transform: `translate(-50%, -50%) rotate(${compassItems[activeCompassIndex].angle}deg)` }}
                >
                  <div className="compass-needle__pointer"></div>
                  <div className="compass-needle__glow"></div>
                </div>

                {/* Radar Ripple Effect */}
                <div className="compass-radar-ripple"></div>

                {/* Direction Nodes */}
                {compassItems.map((item, idx) => {
                  const angleRad = (item.angle * Math.PI) / 180;
                  const isActive = idx === activeCompassIndex;
                  return (
                    <button
                      key={item.id}
                      className={`compass-node ${isActive ? 'is-active' : ''}`}
                      style={{
                        left: `calc(50% + ${Math.sin(angleRad) * 40}%)`,
                        top: `calc(50% - ${Math.cos(angleRad) * 40}%)`,
                      }}
                      onMouseEnter={() => setActiveCompassIndex(idx)}
                      onClick={() => setActiveCompassIndex(idx)}
                      aria-label={`Select ${item.title}`}
                    >
                      <span className="compass-node__direction">{item.direction}</span>
                      <span className="compass-node__label">{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Compass Details Panel Column */}
            <div className="compass-details-panel">
              <div className="compass-details-card">
                <div className="compass-details-card__img-container">
                  <img 
                    src={compassItems[activeCompassIndex].image} 
                    alt={compassItems[activeCompassIndex].title} 
                    className="compass-details-card__img" 
                  />
                  <div className="compass-details-card__badge">
                    Compass Point: {compassItems[activeCompassIndex].direction}
                  </div>
                </div>
                
                <div className="compass-details-card__body">
                  <h3 className="compass-details-card__title">
                    {compassItems[activeCompassIndex].title}
                  </h3>
                  <p className="compass-details-card__desc">
                    {compassItems[activeCompassIndex].desc}
                  </p>
                  
                  <div className="compass-details-card__subservices">
                    <span className="compass-details-card__tag-label">Includes:</span>
                    <div className="compass-details-card__tags">
                      {compassItems[activeCompassIndex].subServices.map((tag, i) => (
                        <span key={i} className="compass-details-card__tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <Link 
                    to={`/services/${compassItems[activeCompassIndex].id}`}
                    className="btn btn-accent compass-details-card__btn"
                  >
                    View Service Details <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Grid */}

      {/* 2. Services Grid */}
      <section id="expertise" className="section services-grid-section">
        <div className="container">
          <SectionHeader 
            label="Expertise"
            title="Comprehensive Technical Capabilities"
            description="Our engineering teams possess the deep domain expertise required to build resilient, scalable systems across the entire technology stack."
            align="center"
          />
          
          <div className="grid-3" style={{ marginTop: 'var(--space-12)' }}>
            {allServices.map((svc, idx) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => navigate(svc.id ? `/services/${svc.id}` : '/contact')}
              >
                <div 
                  className="service-card"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                  }}
                >
                  <div className="service-card__img-container">
                    <img 
                      src={serviceImageMap[svc.id] || '/images/proj_dashboard.png'} 
                      alt={svc.title} 
                      className="service-card__img" 
                    />
                  </div>
                  <h3 className="service-card__title">
                    {svc.title}
                  </h3>
                  <p className="service-card__desc">
                    {svc.shortDesc}
                  </p>
                  <div className="service-card__tags">
                    {svc.subServices.slice(0, 3).map((tag, i) => (
                      <span key={i} className="service-card__tag">{tag}</span>
                    ))}
                    {svc.subServices.length > 3 && (
                      <span className="service-card__tag">+{svc.subServices.length - 3}</span>
                    )}
                  </div>
                  <span className="service-card__link">
                    Learn More <ArrowRight size={16} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Process Section */}
      <section className="section" style={{ background: 'var(--color-bg-elevated)' }}>
        <div className="container">
          <SectionHeader 
            label="Workflow"
            title="Our Engineering Process"
            description="A rigorous, transparent, and iterative approach to software development."
            align="center"
          />
          
          <div className="process-timeline" style={{ marginTop: 'var(--space-16)' }}>
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                className="timeline-item"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-step">0{idx + 1}</span>
                  <h4 className="timeline-title">{step.title}</h4>
                  <p className="timeline-desc">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background: 'var(--color-bg-elevated)' }}>
        <div className="container">
          <SectionHeader 
            label="Differentiators"
            title="Why Partner With Us"
            description="We are not just a vendor; we act as an extension of your internal engineering and product teams."
            align="center"
          />
          
          <div className="grid-3" style={{ marginTop: 'var(--space-12)' }}>
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="feature-card">
                  <div className="feature-card__img-container">
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="feature-card__img" 
                    />
                  </div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Industries We Serve */}
      <section className="section" style={{ paddingLeft: 0, paddingRight: 0, overflow: 'hidden' }}>
        <div className="container">
          <SectionHeader 
            label="Domains"
            title="Industries We Serve"
            description="Delivering specialized software solutions tailored to complex regulatory and operational environments."
            align="center"
          />
        </div>
        <div style={{ height: '400px', width: '100%', position: 'relative', marginTop: 'var(--space-8)' }}>
          <FlowingMenu 
            items={industryItems} 
            bgColor="var(--color-bg)"
            marqueeBgColor="var(--color-accent)"
            marqueeTextColor="#ffffff"
            textColor="var(--color-text-secondary)"
            borderColor="var(--color-border)"
          />
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div>
              <SectionHeader 
                label="FAQ"
                title="Common Questions"
                description="Everything you need to know about our engagement models, processes, and deliverables."
              />
            </div>
            <div>
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="final-cta">
        <div className="services-hero__bg" style={{ opacity: 0.5 }}>
          <div className="services-hero__orb services-hero__orb--1" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px' }}></div>
        </div>
        <div className="container final-cta__content">
          <motion.h2 
            className="final-cta__title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Build Something Exceptional?
          </motion.h2>
          <motion.div 
            className="final-cta__actions"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className="btn btn-primary" style={{ padding: 'var(--space-4) var(--space-8)' }}>
              Start Your Project
            </Link>
            <Link to="/contact" className="btn btn-ghost" style={{ padding: 'var(--space-4) var(--space-8)' }}>
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
