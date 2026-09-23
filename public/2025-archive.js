(() => {
  const FAQS = {
    "What is Hack the Ridge?": `Hack The Ridge is a 12-hour innovation challenge at Iroquois Ridge High School where students tackle real-world problems through technology. Join us on December 06th, 2025, for hands-on workshops, inspiring speakers, and collaborative problem-solving. Work solo or in teams of up to four to build creative solutions aligned with our theme.\n\nSince 2015, we've grown from 50 to 200+ hackers annually, creating lasting impact in our community. Join us for workshops, mentorship, prizes, and the chance to build something amazing!`,
    "Who can participate?": `Anyone with a passion for technology and innovation! We welcome:\n\n• Students (high and elementary school)\n• Designers and creators\n• First-time hackers\n• Experienced builders\n\nNo prior hackathon experience required. We provide mentorship and workshops to help everyone succeed, regardless of skill level.`,
    "How much does it cost?": `Hack the Ridge is completely FREE to participate!\n\nWe provide:\n• Free meals throughout the event\n• Swag and merchandise\n• Workspace and WiFi\n• Mentorship and workshops\n• Prizes for winners\n• Networking opportunities\n\nOur amazing sponsors make this possible, ensuring cost is never a barrier to innovation.`,
    "What should I bring?": `Essential items for the hackathon:\n\n• Laptop and chargers\n• Any hardware you want to use\n• Water bottle and snacks\n• Positive attitude and creativity!\n\nWe'll provide food, drinks, workspace, and WiFi. Just bring yourself and your ideas!`,
    "Do I need a team?": `Teams are optional but recommended! You can:\n\n• Come with a pre-formed team (max 4 people)\n• Join our team formation session at the start\n• Work solo if you prefer\n\nTeams of 2-4 people tend to be most successful, allowing for diverse skills and shared workload. Don't worry if you don't have a team - we'll help you find amazing teammates!`,
    "What are the prizes?": `Coming soon! We're working on securing amazing prizes and will announce details closer to the event. Stay tuned for updates!`,
    "What's the schedule?": `Coming soon! We're finalizing the detailed schedule and will share it closer to the event. Stay tuned for updates!`
  };

  const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));

  function addBackButton() {
    if (document.querySelector('.htr-archive-back')) return;
    const a = document.createElement('a');
    a.className = 'htr-archive-back';
    a.href = '/';
    a.setAttribute('aria-label', 'Back to Hack The Ridge 2026');
    a.innerHTML = '<span aria-hidden="true">←</span><span>Back to 2026</span>';
    document.body.appendChild(a);
  }

  function localizeNavigation() {
    document.querySelectorAll('a[href^="https://hacktheridge.ca/#"]').forEach((a) => {
      try {
        const u = new URL(a.href);
        if (u.hash) a.setAttribute('href', u.hash);
      } catch (_) {}
    });

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (event) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', id);
        document.querySelector('.htr-archive-mobile-menu')?.classList.remove('is-open');
      });
    });
  }

  function restoreCounters() {
    document.querySelectorAll('span[aria-label]').forEach((span) => {
      const label = span.getAttribute('aria-label') || '';
      if (/^\$?[0-9][0-9,+]*\+?$/.test(label)) span.textContent = label;
    });

    const team = document.getElementById('team');
    if (team) {
      [...team.querySelectorAll('div')].forEach((div) => {
        const text = div.textContent || '';
        if (text.includes('WEEKS OF PLANNING')) {
          const span = div.querySelector(':scope > span');
          if (span && span.textContent?.trim() === '0') span.textContent = '77';
        }
        if (text.trim().endsWith('RAISED') && text.includes('$0')) {
          const spans = div.querySelectorAll('span');
          for (const span of spans) {
            if (span.textContent?.trim() === '$0') { span.textContent = '$5,212'; break; }
          }
        }
      });
    }
  }

  function restoreCarousel() {
    const next = document.querySelector('button[aria-label="Next image"]');
    const prev = document.querySelector('button[aria-label="Previous image"]');
    if (!next || !prev) return;
    const root = next.parentElement;
    if (!root) return;
    const track = [...root.querySelectorAll('div')].find((el) => (el.getAttribute('style') || '').includes('translateX(0%)'));
    if (!track) return;
    const slides = [...track.children];
    const dots = [...root.querySelectorAll('button[aria-label^="Go to image "]')];
    let index = 0;
    let timer;

    const render = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => {
        dot.style.width = i === index ? '2rem' : '.25rem';
        dot.style.backgroundColor = i === index ? '#fff' : 'rgba(255,255,255,.5)';
      });
    };
    const go = (n) => { index = (n + slides.length) % slides.length; render(); restart(); };
    const restart = () => {
      clearInterval(timer);
      timer = setInterval(() => go(index + 1), 5500);
    };
    next.addEventListener('click', () => go(index + 1));
    prev.addEventListener('click', () => go(index - 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => go(i)));
    render();
    restart();
  }

  function restoreFAQ() {
    const faq = document.getElementById('faq');
    if (!faq) return;
    const code = faq.querySelector('pre code');
    if (!code) return;
    const buttons = [...faq.querySelectorAll('button')].filter((b) => FAQS[b.textContent.trim()]);

    const show = (question, button) => {
      const answer = FAQS[question];
      buttons.forEach((b) => b.classList.remove('htr-faq-active'));
      button?.classList.add('htr-faq-active');
      code.innerHTML = `
        <div class="htr-faq-command">hacker@hacktheridge:~/faq$ cat ${escapeHtml(slugify(question))}.txt</div>
        <div class="htr-faq-question">${escapeHtml(question)}</div>
        <div class="htr-faq-answer">${escapeHtml(answer)}</div>
        <div class="htr-faq-command" style="margin-top:.55rem">hacker@hacktheridge:~/faq$ <span class="animate-pulse">█</span></div>`;
    };

    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        show(button.textContent.trim(), button);
      });
    });
  }

  function restoreMobileMenu() {
    const toggle = document.querySelector('button[aria-label="Toggle mobile menu"]');
    const nav = document.querySelector('nav');
    if (!toggle || !nav) return;
    const menu = document.createElement('div');
    menu.className = 'htr-archive-mobile-menu';
    menu.setAttribute('aria-label', 'Mobile navigation');
    menu.innerHTML = [
      ['ABOUT', '#about'], ['SPONSORS', '#sponsors'], ['REGISTER', '#register'], ['TEAM', '#team'], ['FAQ', '#faq']
    ].map(([name, href]) => `<a href="${href}">${name}</a>`).join('');
    document.body.appendChild(menu);
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => menu.classList.remove('is-open')));
  }

  function makeTeamCardsKeyboardFriendly() {
    document.querySelectorAll('#team [role="button"]').forEach((card) => {
      if (!card.hasAttribute('tabindex')) card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') card.click();
      });
    });
  }

  function init() {
    addBackButton();
    localizeNavigation();
    restoreCounters();
    restoreCarousel();
    restoreFAQ();
    restoreMobileMenu();
    makeTeamCardsKeyboardFriendly();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
