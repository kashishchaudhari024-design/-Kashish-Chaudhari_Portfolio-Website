(() => {
  const data = window.portfolio;
  data.projects = window.projects || [];
  const app = document.querySelector('#app');
  const safe = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const isUrl = value => /^https?:\/\//i.test(value || '');
  const ico = (name, size = 17) => {
    const paths = {
      arrow:'<path d="M7 17 17 7M7 7h10v10"/>', down:'<path d="M12 5v14m-7-7 7 7 7-7"/>',
      code:'<path d="m16 18 6-6-6-6M8 6l-6 6 6 6m6-16-4 20"/>', github:'<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
      linkedin:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
      mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
      sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m17.07 7.07-1.41-1.41M6.34 6.34 4.93 4.93m14.14 0-1.41 1.41M6.34 17.66l-1.41 1.41"/>',
      moon:'<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6.5 6.5 0 0 0 8.268 8.268c.344-.215.825-.003.803.401"/>',
      menu:'<path d="M4 7h16M4 12h16M4 17h16"/>', close:'<path d="m18 6-12 12M6 6l12 12"/>',
      copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
      check:'<path d="m5 12 4 4L19 6"/>', sparkle:'<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/>',
      work:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>',
      cap:'<path d="m22 10-10-5-10 5 10 5 10-5Zm-16 3v5c4 3 8 3 12 0v-5m4-3v6"/>', pin:'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
      phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.35 1.9.68 2.8a2 2 0 0 1-.45 2.11L8.07 9.93a16 16 0 0 0 6 6l1.3-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.68A2 2 0 0 1 22 16.92Z"/>'
    };
    return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.arrow}</svg>`;
  };
  const social = (url, label) => isUrl(url) ? `<a class="social-link" href="${safe(url)}" target="_blank" rel="noreferrer" aria-label="${label}">${ico(label.toLowerCase())}</a>` : '';
  const tagList = items => (items || []).map(item => `<span>${safe(item)}</span>`).join('');
  const heading = (eyebrow, title, note = '') => `<div class="section-heading"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2></div>${note ? `<p>${note}</p>` : ''}</div>`;
  const projectUrl = project => `#/projects/${encodeURIComponent(project.slug)}`;
  const projectVisual = (project, large = false) => {
    const number = String(data.projects.indexOf(project) + 1).padStart(2, '0');
    return `<div class="project-visual ${large ? 'project-visual-large' : ''} ${project.image ? 'has-image' : ''}">${project.image ? `<img class="project-photo" src="${safe(project.image)}" alt="Project screenshot: ${safe(project.title)}" loading="lazy">` : ''}<div class="visual-toolbar"><span></span><span></span><span></span><i>${safe(project.slug)}.project</i></div><div class="mockup-content"><div class="mockup-nav"><b>${safe(project.title.split(' ')[0])}<span>Â®</span></b><span>PRODUCTSã€€ ABOUTã€€ CONTACT</span></div><div class="mockup-main"><span class="mockup-overline">PROJECT PREVIEW</span><strong>${safe(project.title)}<br><em>thoughtfully built.</em></strong><div class="mockup-shape"><span></span><span></span><span></span></div></div><div class="mockup-footer"><span>DESIGN / DEVELOPMENT</span>${ico('arrow', 15)}</div></div><span class="visual-project-num">PROJECT / ${number}</span></div>`;
  };
  const projectActions = project => `<div class="project-actions">${isUrl(project.github) ? `<a class="project-action" href="${safe(project.github)}" target="_blank" rel="noreferrer">${ico('github',15)} GitHub</a>` : `<span class="project-action is-disabled" aria-disabled="true" title="GitHub URL has not been added">${ico('github',15)} GitHub unavailable</span>`}${isUrl(project.liveDemo) ? `<a class="project-action" href="${safe(project.liveDemo)}" target="_blank" rel="noreferrer">${ico('arrow',15)} Live demo</a>` : `<span class="project-action is-disabled" aria-disabled="true" title="Live demo URL has not been added">${ico('arrow',15)} Demo unavailable</span>`}</div>`;
  const projectCard = project => `<article class="project-card"><a href="${projectUrl(project)}" class="project-image-link" aria-label="View details for ${safe(project.title)}">${projectVisual(project)}<span class="card-arrow">${ico('arrow',18)}</span></a><div class="project-meta"><span>${safe(project.category)}</span><span>${project.technologies.length ? safe(project.technologies.slice(0,2).join(' Â· ')) : 'STACK DETAILS TO BE ADDED'}</span></div><div class="project-title-row"><h3><a href="${projectUrl(project)}">${safe(project.title)}</a></h3><a class="arrow-inline" href="${projectUrl(project)}" aria-label="View project details">${ico('arrow',18)}</a></div><p>${safe(project.description)}</p><div class="skill-tags">${tagList(project.technologies)}</div>${projectActions(project)}<a class="text-link" href="${projectUrl(project)}">View project ${ico('arrow',15)}</a></article>`;

  function home() {
    const p = data.personal;
    const featured = data.projects.find(project => project.featured) || data.projects[0];
    const resumeAvailable = Boolean(p.resume && p.resume.trim());
    const resumeLink = resumeAvailable ? `<a class="resume-link" href="${safe(p.resume)}" target="_blank" rel="noreferrer">Resume ${ico('arrow',14)}</a>` : `<span class="resume-link is-disabled" aria-disabled="true" title="Add a resume PDF to enable this link">Resume <small>soon</small></span>`;
    const educationCards = data.education.map((item,index) => `<article class="education-card timeline-card"><span class="timeline-dot"></span><div class="timeline-date">0${index+1} / ${item.status ? safe(item.status) : 'COMPLETED'}</div><div>${ico('cap',24)}<h3>${safe(item.degree)}</h3><p>${safe(item.institution)}</p><small>${safe(item.location)}</small></div></article>`).join('');
    return `<header class="header"><div class="nav-wrap"><a class="brand" href="#home" aria-label="Kashish home"><span class="brand-mark">K.</span><span class="brand-name">KASHISH</span></a><nav class="nav-links" id="main-nav" aria-label="Main navigation"><a href="#home">Home</a><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#education">Education</a><a href="#services">Services</a><a href="#contact">Contact</a></nav><div class="nav-actions">${resumeLink}${social(data.social.github,'GitHub')}${social(data.social.linkedin,'LinkedIn')}<button class="icon-button theme-button" type="button" aria-label="Switch theme">${ico('sun')}</button></div><button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false">${ico('menu')}</button></div></header>
    <main><section class="hero shell" id="home"><div class="hero-copy"><div class="availability"><span class="status-dot"></span> CSE STUDENT / DEVELOPER</div><p class="hero-kicker">HELLO, I'M</p><h1>${safe(p.name)}<span class="hero-period">.</span></h1><div class="hero-role">COMPUTER SCIENCE ENGINEERING STUDENT<br>&amp; FULL STACK WEB DEVELOPER</div><p class="hero-intro">${safe(p.bio)}</p><p class="hero-location">${ico('pin',15)} ${safe(p.location)}</p><div class="hero-ctas"><a class="button" href="#projects">VIEW MY PROJECTS ${ico('arrow')}</a>${resumeAvailable ? `<a class="text-link" href="${safe(p.resume)}" download>DOWNLOAD RESUME ${ico('arrow',15)}</a>` : `<span class="text-link is-disabled" title="Resume PDF will be added here">DOWNLOAD RESUME Â· SOON</span>`}</div><div class="hero-socials"><span>FIND ME HERE</span>${social(data.social.github,'GitHub')}${social(data.social.linkedin,'LinkedIn')}<a class="social-link" href="mailto:${safe(p.email)}" aria-label="Email Kashish">${ico('mail')}</a></div></div><div class="hero-art" aria-label="Abstract developer-inspired illustration"><div class="art-top"><span>PORTFOLIO / 2026</span><span>SURAT / INDIA</span></div><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="art-core"><div class="core-glow"></div><span class="core-monogram">K</span><span class="core-caption">COMPUTER SCIENCE<br>IN PROGRESS</span></div><span class="art-star">âœ³</span><span class="art-label label-a">DESIGN<br>WITH INTENT</span><span class="art-label label-b">BUILD<br>WITH CARE</span><div class="art-bottom"><span>STUDENT / DEVELOPER</span><span>SCROLL TO EXPLORE â†“</span></div></div><a class="scroll-indicator" href="#about"><span>SCROLL TO DISCOVER</span>${ico('down',14)}</a></section>
    <div class="marquee"><div>${Array.from({length:4},()=>'<span>COMPUTER SCIENCE <i>âœ³</i> DIGITAL CRAFT <i>âœ³</i> BUILT WITH INTENTION <i>âœ³</i> ').join('')}</div></div>
    <section class="section shell" id="about">${heading('ABOUT KASHISH','Curious mind.<br><em>Thoughtful builder.</em>','Computer Science Engineering student based in Surat, Gujarat.')}<div class="about-grid"><div class="about-visual"><div class="portrait-placeholder">${p.profileImage ? `<img class="profile-photo" src="${safe(p.profileImage)}" alt="Portrait of Kashish" loading="lazy">` : `<div class="portrait-lines"></div>${ico('sparkle',22)}<span class="portrait-initial">K</span><span class="portrait-caption">KASHISH<br>SURAT, INDIA</span>`}</div><div class="visual-index">01 <span>â€”</span> THE PERSON BEHIND THE PIXELS</div></div><div class="about-copy"><p class="lead">${safe(p.bio)}</p><p>Iâ€™m currently pursuing a B.Tech in Computer Science and Engineering at AMTICS, Uka Tarsadia University. Before that, I completed a Diploma in ICT at Dr. S. &amp; S.S. Gandhi College.</p><p>My interests include web development, full stack development, e-commerce, databases, and modern UI/UX.</p><div class="fact-grid"><div class="fact"><span>Based in</span><strong>${safe(p.location)}</strong></div><div class="fact"><span>Current study</span><strong>B.Tech in CSE</strong></div><div class="fact"><span>Focus</span><strong>Full Stack Web Development</strong></div><div class="fact"><span>Career interests</span><strong>${safe(data.interests.join(" · "))}</strong></div></div><a class="text-link" href="#education">Explore my education ${ico('arrow',15)}</a></div></div></section>
    <section class="section section-muted" id="skills"><div class="shell">${heading('SKILLS &amp; TECHNOLOGIES','Tools for building<br><em>useful experiences.</em>','A practical toolkit across frontend, backend, programming and product development.')}<div class="skills-grid">${data.skills.map((group,index)=>`<article class="skill-card"><div class="skill-card-top"><span class="skill-number">0${index+1}</span>${ico('code',18)}</div><h3>${safe(group.category)}</h3><div class="skill-tags">${tagList(group.items)}</div></article>`).join('')}</div><div class="skills-note"><span class="status-dot"></span> Learning through coursework and hands-on projects.</div></div></section>
    ${featured ? `<section class="section shell featured-section"><div class="featured-kicker"><span class="eyebrow">FEATURED PROJECT</span><span>PROJECT / 01</span></div><div class="featured-grid"><a href="${projectUrl(featured)}" class="featured-image" aria-label="View ${safe(featured.title)} details">${projectVisual(featured,true)}</a><div class="featured-info"><span class="eyebrow">E-COMMERCE / FEATURED WORK</span><h3>${safe(featured.title)}</h3><p class="lead">${safe(featured.description)}</p><div class="feature-detail"><span>THE PROBLEM</span><p>${safe(featured.problem)}</p></div><div class="feature-detail"><span>THE SOLUTION</span><p>${safe(featured.solution)}</p></div><div class="skill-tags">${featured.technologies.length ? tagList(featured.technologies) : '<span>Technology details to be added</span>'}</div>${projectActions(featured)}<a class="button button-dark" href="${projectUrl(featured)}">View project details ${ico('arrow',16)}</a></div></div></section>` : ''}
    <section class="section section-muted" id="projects"><div class="shell">${heading('SELECTED PROJECTS','Building for<br><em>everyday needs.</em>','Project previews are illustrative. Add screenshots and confirmed technology details in projects.js.')}<div class="filter-row" role="group" aria-label="Filter projects">${['All','E-Commerce','Full Stack','Web Development'].map((filter,index)=>`<button class="filter-button ${index===0?'active':''}" type="button" data-filter="${filter}">${filter}<span>${filter==='All'?data.projects.length:data.projects.filter(project=>(project.categories||[project.category]).includes(filter)).length}</span></button>`).join('')}</div><div class="project-grid" id="project-grid">${data.projects.map(projectCard).join('')}</div></div></section>
    <section class="section shell" id="experience">${heading('EXPERIENCE','Learning through<br><em>building and practice.</em>','No professional experience has been added yet.') }<div class="empty-state"><div class="empty-icon">${ico('work')}</div><div><span class="eyebrow">CURRENTLY BUILDING</span><h3>Developing practical experience through projects.</h3><p>Currently building practical experience through academic projects, personal development and web application development.</p></div><span class="empty-count">01 <i>â€”</i> NOW</span></div></section>
    <section class="section section-muted" id="education"><div class="shell">${heading('EDUCATION','Foundations for<br><em>whatâ€™s next.</em>','Learning in information and communication technology and computer science.')}<div class="education-timeline">${educationCards}</div></div></section>
    <section class="section shell" id="services">${heading('SERVICES','Ideas into<br><em>useful experiences.</em>','Ways I can contribute to a thoughtful digital product.')}<div class="services-grid">${data.services.map((service,index)=>`<article class="service-card"><span class="service-index">0${index+1}</span>${ico(['code','work','sparkle'][index%3],23)}<h3>${safe(service.title)}</h3><p>${safe(service.description)}</p>${ico('arrow',17)}</article>`).join('')}</div></section>
    <section class="section section-muted" id="certifications"><div class="shell">${heading('CERTIFICATIONS','Continued<br><em>learning.</em>')}<div class="education-placeholder">${ico('cap',24)}<div><span class="eyebrow">CERTIFICATIONS</span><h3>Certifications will be added soon.</h3><p>No certifications have been provided yet.</p></div></div></div></section>
    ${data.achievements.length ? `<section class="section shell" id="achievements">${heading('ACHIEVEMENTS','Milestones')}<div class="cert-grid">${data.achievements.map(item=>`<article class="cert-card"><h3>${safe(item.title)}</h3><p>${safe(item.description)}</p></article>`).join('')}</div></section>` : ''}
    <section class="resume-cta"><div class="shell resume-cta-inner"><div><span class="eyebrow">RESUME</span><h2>Want to know<br><em>more about me?</em></h2><p>${resumeAvailable ? 'View or download my resume.' : 'My resume PDF will be available here soon.'}</p></div><div class="resume-buttons">${resumeAvailable ? `<a class="button button-dark" href="${safe(p.resume)}" target="_blank" rel="noreferrer">View resume ${ico('arrow')}</a><a class="text-link" href="${safe(p.resume)}" download>Download resume ${ico('down',15)}</a>` : '<span class="button button-disabled" aria-disabled="true">Resume coming soon</span><span class="resume-hint">Add your PDF at /assets/resume.pdf</span>'}</div></div></section>
    <section class="section contact-section" id="contact"><div class="shell"><div class="contact-header"><div><span class="eyebrow">LETâ€™S CONNECT</span><h2>Letâ€™s make<br><em>something matter.</em></h2></div><div class="contact-big-arrow">${ico('arrow',42)}</div></div><div class="contact-grid"><div class="contact-copy"><p>Have an opportunity, an idea, or just want to say hello? Iâ€™d love to hear from you.</p><a class="email-copy" href="mailto:${safe(p.email)}"><span>${safe(p.email)}</span>${ico('mail')}</a><a class="email-copy" href="tel:${safe(p.phone)}"><span>${safe(p.phone)}</span>${ico('phone')}</a><p class="copy-feedback">${safe(p.location)}</p><div class="contact-socials">${social(data.social.github,'GitHub')}${social(data.social.linkedin,'LinkedIn')}</div></div><form class="contact-form" novalidate><label>Your name<input name="name" required placeholder="Name" autocomplete="name"></label><label>Email address<input name="email" type="email" required placeholder="you@example.com" autocomplete="email"></label><label>Subject<input name="subject" required placeholder="What would you like to talk about?"></label><label>Message<textarea name="message" required rows="3" placeholder="A little context goes a long way..."></textarea></label><button class="button button-dark" type="submit">Send a message ${ico('arrow',15)}</button><p class="form-status" aria-live="polite">This form opens your email app to send the message.</p></form></div></div></section></main>
    <footer class="footer"><div class="shell footer-main"><a class="brand" href="#home"><span class="brand-mark">K.</span><span class="brand-name">KASHISH</span></a><p>Computer Science Engineering Student<br>&amp; Full Stack Web Developer</p><div class="footer-links"><a href="#home">Home</a><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#education">Education</a><a href="#contact">Contact</a>${social(data.social.github,'GitHub')}${social(data.social.linkedin,'LinkedIn')}<a href="mailto:${safe(p.email)}">Email ${ico('mail',13)}</a></div><a class="back-top" href="#home">BACK TO TOP ${ico('arrow',14)}</a></div><div class="shell footer-bottom"><span>Â© 2026 Kashish. All rights reserved.</span><span>DESIGNED WITH INTENTION Â· BUILT WITH CARE</span><a href="#home">â†‘</a></div></footer><button class="scroll-top" type="button" aria-label="Scroll to top">â†‘</button>`;
  }

  function projectDetail(slug) {
    const project = data.projects.find(item => item.slug === slug);
    if (!project) return `<main class="shell not-found"><span class="eyebrow">404 / NOT FOUND</span><h1>That project<br><em>isnâ€™t here.</em></h1><a class="button button-dark" href="#projects">${ico('down',16)} Back to projects</a></main>`;
    const related = data.projects.filter(item => item.slug !== slug);
    return `<main class="project-detail shell"><a class="back-link" href="#projects">â† All projects</a><div class="detail-heading"><span class="eyebrow">${safe(project.category)} / SELECTED WORK</span><h1>${safe(project.title)}<span class="hero-period">.</span></h1><p>${safe(project.description)}</p><div class="skill-tags">${project.technologies.length ? tagList(project.technologies) : '<span>Technology details to be added</span>'}</div></div><div class="detail-hero">${projectVisual(project,true)}</div><div class="detail-columns"><div><span class="eyebrow">OVERVIEW</span><h2>A considered<br><em>shopping experience.</em></h2></div><div><p class="lead">${safe(project.solution)}</p><p>${safe(project.problem)}</p></div></div><div class="detail-columns detail-border"><div><span class="eyebrow">FEATURES</span><h2>Designed around<br><em>the shopping flow.</em></h2></div><div><ul class="feature-list">${project.features.map((feature,index)=>`<li><span>0${index+1}</span>${safe(feature)}${ico('arrow',15)}</li>`).join('')}</ul></div></div><div class="detail-columns detail-border"><div><span class="eyebrow">PROJECT LINKS</span><h2>Explore the<br><em>implementation.</em></h2></div><div>${projectActions(project)}</div></div>${related.length ? `<div class="related-projects">${heading('RELATED PROJECTS','More selected work')}<div class="project-grid">${related.map(projectCard).join('')}</div></div>` : ''}</main><footer class="footer"><div class="shell footer-bottom"><span>Â© 2026 Kashish. All rights reserved.</span><a href="#projects">Back to projects â†‘</a></div></footer>`;
  }

  function currentRoute() { const match = location.hash.match(/^#\/projects\/([^/?]+)/); return match ? decodeURIComponent(match[1]) : null; }
  function render() {
    const slug = currentRoute();
    app.innerHTML = slug ? projectDetail(slug) : home();
    const activeProject = slug && data.projects.find(project => project.slug === slug);
    document.title = activeProject ? `${activeProject.title} | Kashish` : data.personal.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = data.personal.bio;
    bind();
    if (!slug && location.hash && !location.hash.startsWith('#/')) requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
    else window.scrollTo(0, 0);
  }
  function bind() {
    const themeButton = document.querySelector('.theme-button');
    let savedTheme = null;
    try { savedTheme = localStorage.getItem('portfolio-theme'); } catch { /* Use system preference when storage is unavailable. */ }
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const setTheme = dark => {
      document.documentElement.dataset.theme = dark ? 'dark' : 'light';
      try { localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light'); } catch { /* Theme still applies for this visit. */ }
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0c0d0e' : '#f5f5f1');
      if (themeButton) {
        themeButton.innerHTML = ico(dark ? 'sun' : 'moon');
        themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
      }
    };
    setTheme(savedTheme ? savedTheme === 'dark' : systemDark);
    themeButton?.addEventListener('click', () => setTheme(document.documentElement.dataset.theme !== 'dark'));

    const header = document.querySelector('.header');
    const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', updateHeader, { passive:true }); updateHeader();
    const scrollTop = document.querySelector('.scroll-top');
    const updateScrollTop = () => scrollTop?.classList.toggle('is-visible', window.scrollY > 550);
    window.addEventListener('scroll', updateScrollTop, { passive:true }); updateScrollTop();
    scrollTop?.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
    const menu = document.querySelector('.menu-toggle'), nav = document.querySelector('.nav-links');
    menu?.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      menu.innerHTML = ico(open ? 'close' : 'menu'); nav.classList.toggle('nav-open', open);
    });
    nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('nav-open'); menu?.setAttribute('aria-expanded','false'); menu.innerHTML=ico('menu'); }));
    if (nav && 'IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        nav.querySelectorAll('a').forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
        });
      }), { rootMargin:'-25% 0px -65% 0px' });
      nav.querySelectorAll('a[href^="#"]').forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) sectionObserver.observe(section);
      });
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      }), { threshold:0.08 });
      document.querySelectorAll('main section, .project-card, .education-card').forEach(element => { element.classList.add('reveal'); observer.observe(element); });
    }

    const projectGrid = document.querySelector('#project-grid');
    document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item === button));
      const filter = button.dataset.filter;
      projectGrid.innerHTML = data.projects.filter(project => filter === 'All' || (project.categories || [project.category]).includes(filter)).map(projectCard).join('');
    }));

    document.querySelector('.contact-form')?.addEventListener('submit', event => {
      event.preventDefault();
      const form = event.currentTarget;
      const status = form.querySelector('.form-status');
      if (!form.reportValidity()) { status.textContent = 'Please complete each field with a valid email address.'; status.classList.add('form-error'); return; }
      status.classList.remove('form-error');
      const button = form.querySelector('button[type="submit"]');
      const original = button.innerHTML;
      button.disabled = true; button.innerHTML = 'Preparing message...';
      status.textContent = 'Preparing your email...';
      const values = new FormData(form);
      const subject = encodeURIComponent(values.get('subject'));
      const body = encodeURIComponent(`Hi ${data.personal.name},\n\n${values.get('message')}\n\nFrom: ${values.get('name')} (${values.get('email')})`);
      window.setTimeout(() => {
        status.textContent = 'Thank you for contacting me. I will get back to you soon. Your email app is ready; send the message there to complete delivery.';
        button.disabled = false; button.innerHTML = original;
        window.location.href = `mailto:${data.personal.email}?subject=${subject}&body=${body}`;
      }, 450);
    });
  }

  window.addEventListener('hashchange', render);
  render();
  if (!data.personal.resume && data.personal.resumePath && 'fetch' in window) {
    const path = new URL(data.personal.resumePath.replace(/^\//, ''), document.baseURI).href;
    fetch(path, { method:'HEAD' }).then(response => {
      if (response.ok) { data.personal.resume = data.personal.resumePath; render(); }
    }).catch(() => {});
  }
})();

