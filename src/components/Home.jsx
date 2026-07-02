import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initLandingPage, destroyLandingPage } from '../main.js';
import { companyData } from '../company-data.js';

function TeamCard({ member, featured }) {
  return (
    <article className={`team-card${featured ? ' featured' : ''}`} data-tilt>
      <div className="team-card-inner">
        <div className="team-card-glow" aria-hidden="true"></div>
        <div className="team-avatar">
          {member.photo
            ? <img src={member.photo} alt={member.name} className="team-avatar-img" />
            : <span className="team-avatar-monogram">{member.initials}</span>}
          <span className="team-avatar-ring" aria-hidden="true"></span>
        </div>
        <div className="team-role-tag">{member.role}</div>
        <h3 className="team-name">{member.name}</h3>
        <span className="team-tenure">{member.tenure}</span>
        <p className="team-bio">{member.bio}</p>
        <div className="team-links">
          <a href={member.links.linkedin} className="team-link" aria-label={`${member.name} on LinkedIn`}>in</a>
          <a href={member.links.x} className="team-link" aria-label={`${member.name} on X`}>X</a>
          <a href={member.links.email} className="team-link" aria-label={`Email ${member.name}`}>@</a>
        </div>
      </div>
    </article>
  );
}

function Home() {
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 600);
      }, 800);
    }

    initLandingPage();
    return () => {
      destroyLandingPage();
    };
  }, []);

  return (
    <div className="home-container">
      {/* Page Loading Preloader Animation */}
      <div id="preloader" className="preloader">
        <div className="preloader-content">
          <img src="/logo_white.jpg" alt="Vericode AI Symbol" className="preloader-logo" style={{ mixBlendMode: 'screen' }} />
          <div className="preloader-bar-wrap">
            <div className="preloader-bar" id="preloader-bar"></div>
          </div>
          <span className="preloader-text">INITIALIZING VERICODE AI...</span>
        </div>
      </div>

      {/* 1. Header & Navigation */}
      <header id="main-header" className="animate-in fade-in slide-in-from-top duration-300">
        <a href="#" className="logo-container" title="Vericode AI">
          <img src="/logo_white.jpg" alt="Vericode AI Logo" className="logo-img" style={{ mixBlendMode: 'screen' }} />
          <span className="logo-text">VERICODE AI</span>
        </a>
        
        <nav>
          <ul className="nav-menu">
            <li><a href="#hero" className="nav-link">Home</a></li>
            <li><a href="#integrations-sec" className="nav-link">Integrations</a></li>
            <li><a href="#roadmap-sec" className="nav-link">Secure IDE</a></li>
            <li><a href="#team-sec" className="nav-link">Team</a></li>
            <li><a href="#audience" className="nav-link">Audience</a></li>
            <li><Link to="/login" className="nav-link">Sign In</Link></li>
            <li><Link to="/login" className="cta-button secondary">Get Started</Link></li>
          </ul>
        </nav>
        <div className="scroll-indicator-wrap">
          <div className="scroll-indicator-bar" id="scroll-indicator"></div>
        </div>
      </header>

      {/* 2. Hero Section (Diagonal Split) */}
      <section className="hero" id="hero">
        <div className="hero-left">
          <div className="hero-badge animate-in fade-in slide-in-from-bottom duration-500 delay-100">
            <span>Built for how developers actually work</span>
          </div>
          <h1 className="animate-in fade-in slide-in-from-bottom duration-500 delay-200">
            Learn, practice,<br />and ship safer code<br />
            <span className="text-gradient">from one place.</span>
          </h1>
          <p className="animate-in fade-in slide-in-from-bottom duration-500 delay-300">
            Vericode AI keeps ChatGPT help, LeetCode problems, and GeeksforGeeks references in a single window. Spend your time solving the problem in front of you, and pick up safer coding habits along the way instead of bolting them on later.
          </p>
          <div className="hero-buttons animate-in fade-in slide-in-from-bottom duration-500 delay-400">
            <a href="#integrations-sec" className="cta-button primary">See how it works</a>
            <a href="#roadmap-sec" className="cta-button secondary">Where we are headed</a>
          </div>
        </div>
        
        <div className="hero-right">
          <div className="veo-container animate-in fade-in zoom-in-95 duration-500 delay-300">
            <div className="veo-prompt-overlay">Live preview — code being scanned in real time</div>
            <canvas id="veo-intro-canvas" className="veo-canvas"></canvas>
            <div className="veo-controls">
              <button className="veo-play-btn" id="veo-play-button" aria-label="Play/Pause Video">
                <svg className="icon-md" fill="currentColor" viewBox="0 0 24 24" id="veo-play-icon">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              <div className="veo-progress-container" id="veo-progress-container">
                <div className="veo-progress-bar" id="veo-progress-bar" style={{ width: '0%' }}></div>
              </div>
              <span className="veo-prompt-label">Veo Video Generation</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Immersive 3D Orbit Section */}
      <section className="scene-section" id="integrations-sec">
        <div className="three-fixed-container" id="canvas-container">
          <div id="three-target" className="three-canvas-target"></div>
        </div>
        
        <div className="scroll-overlays">
          <div className="overlay-trigger-panel" id="panel-chatgpt">
            <div className="glass-info-card" id="card-chatgpt">
              <div className="card-badge">ChatGPT Copilot</div>
              <h3>Answers that know what you are working on</h3>
              <p>
                Ask questions and get explanations right beside your code, without shuttling snippets between tabs. The assistant reads the problem you are on, so its feedback fits the task in front of you.
              </p>
              <ul>
                <li>Plain-language read on runtime errors and stack traces</li>
                <li>Test cases drafted for the edge cases you tend to miss</li>
                <li>Refactoring suggestions you can apply as you go</li>
              </ul>
            </div>
          </div>
          
          <div className="overlay-trigger-panel right-align" id="panel-leetcode">
            <div className="glass-info-card" id="card-leetcode">
              <div className="card-badge">LeetCode Challenge Sandbox</div>
              <h3>Practice until the patterns stick</h3>
              <p>
                Work through algorithm problems, tighten up your complexity, and run your solution against the test cases in a terminal that already sits next to your notes and the assistant.
              </p>
              <ul>
                <li>Compile and run against realistic test suites</li>
                <li>Compare time and space cost side by side</li>
                <li>Read through a cleaner solution once you are done</li>
              </ul>
            </div>
          </div>
          
          <div className="overlay-trigger-panel" id="panel-geeksforgeeks">
            <div className="glass-info-card" id="card-geeksforgeeks">
              <div className="card-badge">GeeksforGeeks Hub</div>
              <h3>The reading, right when you need it</h3>
              <p>
                Pull up the article, the data-structure diagram, or the syntax cheatsheet that maps to the problem you are stuck on, instead of digging through search results mid-task.
              </p>
              <ul>
                <li>Step-through visualizers for tree and graph traversals</li>
                <li>Quick syntax references for Python, C++, and Java</li>
                <li>Topics tied back to the interview problems they show up in</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Secure IDE Roadmap */}
      <section className="roadmap-section" id="roadmap-sec">
        <div className="roadmap-grid">
          <div className="roadmap-left">
            <div className="logo-container" title="Vericode AI" style={{ marginBottom: '24px' }}>
              <img src="/logo_white.jpg" alt="Vericode Symbol" style={{ height: '30px', mixBlendMode: 'screen' }} />
              <span className="logo-text" style={{ fontSize: '16px' }}>SECURE IDE ROADMAP</span>
            </div>
            <h2>Where secure coding goes next</h2>
            <p>
              Studying and practising get you the fundamentals. Shipping real code asks for more: guardrails that catch mistakes before they reach users. Here is how the workspace grows into a full desktop IDE from here.
            </p>
            
            <div className="roadmap-timeline">
              <div className="roadmap-step active" id="step-1">
                <div className="step-marker">01</div>
                <div className="step-content">
                  <h4>Phase 1: One web dashboard</h4>
                  <p>ChatGPT, LeetCode, and GeeksforGeeks sitting side by side in a layout that works on any screen. (Live now)</p>
                </div>
              </div>
              <div className="roadmap-step" id="step-2">
                <div className="step-marker">02</div>
                <div className="step-content">
                  <h4>Phase 2: Coding together</h4>
                  <p>Shared coding rooms, a chat history the whole room can see, and space to run mock reviews with a peer. (Being built)</p>
                </div>
              </div>
              <div className="roadmap-step" id="step-3">
                <div className="step-marker">03</div>
                <div className="step-content">
                  <h4>Phase 3: The Vericode Secure IDE</h4>
                  <p>A lightweight editor that checks for common weaknesses in the background (OWASP Top 10) and offers a fix on the spot. (Planned)</p>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>

      {/* 5. Team Section */}
      <section className="team-section" id="team-sec">
        <div className="section-intro">
          <div className="team-eyebrow">The people behind the work</div>
          <h2>Who builds Vericode AI</h2>
          <p>A small group carrying the whole thing — from the first line of the product strategy down to the last query that keeps it running. Here is who does what.</p>
        </div>

        <div className="team-tier-label">
          <span className="team-tier-line" aria-hidden="true"></span>
          <span>Leadership</span>
          <span className="team-tier-line" aria-hidden="true"></span>
        </div>
        <div className="team-grid team-grid-leadership">
          {companyData.team.leadership.map(member => (
            <TeamCard key={member.id} member={member} featured />
          ))}
        </div>

        <div className="team-tier-label">
          <span className="team-tier-line" aria-hidden="true"></span>
          <span>Engineering</span>
          <span className="team-tier-line" aria-hidden="true"></span>
        </div>
        <div className="team-grid team-grid-engineering">
          {companyData.team.engineering.map(member => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* 6. Audience Section */}
      <section className="audience-section" id="audience">
        <div className="section-intro">
          <h2>Made for students and small teams</h2>
          <p>Two ways of working, one workspace — whether you are studying for exams or shipping a product on a tight timeline.</p>
        </div>
        
        <div className="cards-container">
          <div className="audience-card">
            <div className="card-icon">
              <svg className="icon-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <h3>For students</h3>
            <p>Fewer tabs, fewer detours. Get through your computer science coursework and interview prep with the material and the practice sitting in the same place.</p>
            <ul>
              <li>A clear path through core data structures and algorithms</li>
              <li>Dense articles explained in language that makes sense</li>
              <li>Timed mock interviews with feedback afterwards</li>
            </ul>
          </div>
          
          <div className="audience-card">
            <div className="card-icon">
              <svg className="icon-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3>For small teams</h3>
            <p>Move quickly without letting security slip. Fold vulnerability checks into the way you already build, rather than treating them as a separate chore.</p>
            <ul>
              <li>Security checks that run before a change reaches staging</li>
              <li>Suggested fixes for the weaknesses that turn up</li>
              <li>A light sandbox to run code in without extra setup</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Footer Section */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo-container" title="Vericode AI" style={{ marginBottom: '10px' }}>
              <img src="/logo_white.jpg" alt="Vericode Logo" style={{ height: '32px', mixBlendMode: 'screen' }} />
              <span className="logo-text">VERICODE AI</span>
            </a>
            <p>Bringing the tools developers rely on into one place, so writing safe code feels like the default rather than the hard path.</p>
          </div>
          
          <div className="footer-links-col">
            <h5>Product</h5>
            <ul>
              <li><a href="#integrations-sec">How it works</a></li>
              <li><a href="#roadmap-sec">Roadmap</a></li>
              <li><a href="#team-sec">The team</a></li>
              <li><a href="#audience">Who it is for</a></li>
            </ul>
          </div>
          
          <div className="footer-links-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#hero">About Us</a></li>
              <li><a href="/logo_split.jpg" target="_blank">Brand Assets</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Vericode AI. All rights reserved.</p>
          <div className="social-links">
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">GitHub</a>
            <a href="#" className="social-link">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
