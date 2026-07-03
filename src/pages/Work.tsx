import React from 'react';
import AnimatedEntry from '../components/AnimatedEntry';
import SectionHeader from '../components/SectionHeader';
import { ArrowRight, ArrowUpRight, Code, Cpu } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { workProjects } from '../data/work';

const Work: React.FC = () => {
  const featured = workProjects.filter(p => p.type === 'featured');
  const concepts = workProjects.filter(p => p.type === 'concept');
  const openSource = workProjects.filter(p => p.type === 'open-source');

  return (
    <div className="page-wrapper">
      {/* 1. Introduction */}
      <section className="section" style={{ paddingTop: '160px', paddingBottom: '40px' }}>
        <div className="container">
          <SectionHeader 
            label="Work"
            title="Engineered for scale."
            description="We build software that solves hard business problems. Explore our portfolio of custom platforms, experimental AI concepts, and open source contributions."
          />
        </div>
      </section>

      {/* 2. Featured Projects */}
      <section className="section bg-elevated section-border">
        <div className="container">
          <AnimatedEntry direction="up">
            <h2 className="section-heading" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Code size={24} className="text-accent" /> Featured Projects
            </h2>
          </AnimatedEntry>
          
          <div className="grid-2" style={{ marginTop: '3rem', gap: '2rem' }}>
            {featured.map((project, idx) => (
              <AnimatedEntry direction="up" delay={0.1 * idx} key={project.id}>
                <div style={{ backgroundColor: 'var(--color-bg)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--color-border)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>{project.client}</span>
                    <h3 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginTop: '0.5rem', fontFamily: 'var(--font-heading)' }}>{project.title}</h3>
                  </div>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, flexGrow: 1, marginBottom: '2rem' }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{ fontSize: 'var(--text-xs)', padding: '0.25rem 0.75rem', backgroundColor: 'var(--color-surface)', borderRadius: '99px', color: 'var(--color-text)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </AnimatedEntry>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Concept Projects */}
      <section className="section">
        <div className="container">
          <AnimatedEntry direction="up">
            <h2 className="section-heading" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Cpu size={24} className="text-accent" /> Concept Labs
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', marginBottom: '3rem' }}>
              Internal R&D projects where we explore bleeding-edge architectures, primarily focusing on agentic workflows and edge computing.
            </p>
          </AnimatedEntry>

          <div className="grid-2" style={{ gap: '2rem' }}>
            {concepts.map((project, idx) => (
              <AnimatedEntry direction="up" delay={0.1 * idx} key={project.id}>
                <div style={{ backgroundColor: 'var(--color-elevated)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--color-border)', height: '100%' }}>
                  <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: '1rem' }}>{project.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>{project.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{ fontSize: 'var(--text-xs)', padding: '0.25rem 0.5rem', border: '1px solid var(--color-border)', borderRadius: '4px', color: 'var(--color-text-dim)' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </AnimatedEntry>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Open Source */}
      <section className="section bg-secondary section-border">
        <div className="container">
          <AnimatedEntry direction="up">
            <h2 className="section-heading" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
              <FaGithub size={24} className="text-accent" /> Open Source
            </h2>
          </AnimatedEntry>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {openSource.map((project, idx) => (
              <AnimatedEntry direction="up" delay={0.1 * idx} key={project.id}>
                <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '12px', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s' }} className="hover-border-accent">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>{project.title}</h3>
                    <ArrowUpRight size={18} className="text-muted" />
                  </div>
                  <p style={{ color: 'var(--color-text-secondary)' }}>{project.description}</p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-dim)' }}>{tag}</span>
                    ))}
                  </div>
                </a>
              </AnimatedEntry>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Development Approach */}
      <section className="section">
        <div className="container">
          <AnimatedEntry direction="up">
            <h2 className="section-heading text-center" style={{ marginBottom: '3rem' }}>Our Approach</h2>
          </AnimatedEntry>
          <div className="grid-3" style={{ gap: '2rem' }}>
            <AnimatedEntry direction="up" delay={0.1}>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-text)' }}>1. Discovery & Architecture</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>We don't write a single line of code until the database schema, API contracts, and core architecture are explicitly defined and validated.</p>
            </AnimatedEntry>
            <AnimatedEntry direction="up" delay={0.2}>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-text)' }}>2. Iterative Sprints</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>We build in fast, 2-week sprints. You get continuous access to a staging environment to see progress in real-time, not just on a slide deck.</p>
            </AnimatedEntry>
            <AnimatedEntry direction="up" delay={0.3}>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-text)' }}>3. Resilient Deployment</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>CI/CD pipelines, automated testing, and secure containerization ensure that when we push to production, the system stays up.</p>
            </AnimatedEntry>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="section section-border bg-elevated cta-section">
        <div className="container">
          <div className="cta-banner" style={{ textAlign: 'center' }}>
            <AnimatedEntry direction="up">
              <h2 className="cta-banner__title" style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>Want to see what we can build for you?</h2>
              <p className="cta-banner__desc" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>Our engineering team is ready to review your requirements.</p>
              <Link to="/contact" className="btn btn-accent">
                Start a conversation
                <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </Link>
            </AnimatedEntry>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
