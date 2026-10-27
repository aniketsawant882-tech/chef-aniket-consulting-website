/* ============================================
   CHEF ANIKET — WEBSITE CHAT ASSISTANT
   Self-contained site-knowledge chatbot
   (no API keys, no external services)
   ============================================ */

(function () {
  'use strict';

  const fab = document.getElementById('chatFab');
  const panel = document.getElementById('chatPanel');
  const body = document.getElementById('chatBody');
  const chipsEl = document.getElementById('chatChips');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatText');
  const closeBtn = document.getElementById('chatClose');

  if (!fab || !panel || !body || !form || !input) return;

  const WA_NUMBER = '918169640573';

  function waLink(message) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
  }

  /* ---------- Knowledge base (built from this website's content) ---------- */

  const GREET_CHIPS = ['Services', 'Pricing', 'Free Audit', 'Process', 'About Chef Aniket'];

  const KB = [
    {
      id: 'greeting',
      keywords: ['hi', 'hello', 'hey', 'hii', 'helo', 'namaste', 'good morning', 'good evening', 'good afternoon', 'salut', 'yo'],
      reply: "Namaste 🙏 I'm Chef Aniket's website assistant.\n\nI can answer anything about this site — services, pricing, packages, process and results. What would you like to know?",
      chips: GREET_CHIPS
    },
    {
      id: 'pricing',
      keywords: ['price', 'pricing', 'cost', 'costs', 'charge', 'charges', 'fee', 'fees', 'rate', 'rates', 'kitna', 'charges kya', 'budget', 'package', 'packages', 'plan', 'plans', 'rupee', 'rs', 'inr', '₹'],
      reply: "Here are the consultancy packages:\n\n🥉 Launch Foundation — ₹40,000/month\nBest for small cafés & cloud kitchens (menu up to 25 items, 3 days training)\n\n🥈 Growth & Scale — ₹75,000/month ⭐ Most popular\nFor standalone restaurants (menu up to 50 items, 7 days SOP training, weekly on-site visits)\n\n🥇 Aggressive Enterprise — ₹1,50,000/month\nFor fine-dining & multi-outlet brands (50+ items, continuous audits, franchise playbook)\n\nProject-based and fully custom plans are also available. Want a quote for your restaurant?",
      chips: ['Custom Plan', 'Free Audit', 'Process'],
      cta: { text: 'Get a Custom Quote →', msg: "Hello Chef Aniket, I'd like a custom quote for my restaurant. Here are my details:" }
    },
    {
      id: 'services',
      keywords: ['service', 'services', 'consulting', 'consultancy', 'help me', 'what do you do', 'what can you do', 'offering', 'offer', 'kya karte', 'kaam'],
      reply: "Chef Aniket works with restaurants across two divisions:\n\n1️⃣ Operations Consulting\n• Menu Engineering & Costing\n• Staff & Culinary Training\n• Kitchen Setup & Design\n\n2️⃣ Restaurant Marketing\n• Zomato & Swiggy Optimization\n• Google Ads for local search\n• Meta (Instagram/Facebook) Ads\n• Review & Reputation management\n\nWhich one should I explain?",
      chips: ['Menu & Costing', 'Staff Training', 'Kitchen Setup', 'Marketing', 'Pricing']
    },
    {
      id: 'menu',
      keywords: ['menu engineering', 'menu costing', 'food cost', 'menu design', 'margin', 'waste', 'menu price', 'dish price', 'menu'],
      reply: "Menu Engineering & Costing — designing high-margin, scalable menus that reduce food waste and captivate local palates. Chef Aniket re-engineers your menu so your best dishes earn the most profit.\n\nPart of the Operations Consulting division.",
      chips: ['Pricing', 'Free Audit']
    },
    {
      id: 'training',
      keywords: ['staff training', 'culinary training', 'training', 'train staff', 'chef training', 'sop', 'hygiene', 'recipe card', 'upskill'],
      reply: "Staff & Culinary Training — upskilling kitchen teams (from Head Chefs to S Scale) in consistency, hygiene, speed and precise recipe execution.\n\nStarter includes 3 days, Business includes 7 days of staff & SOP training, and Enterprise has continuous training & audits.",
      chips: ['Pricing', 'Kitchen Setup']
    },
    {
      id: 'kitchen',
      keywords: ['kitchen setup', 'kitchen design', 'layout', 'equipment', 'kitchen plan', 'new kitchen', 'open kitchen', 'open a restaurant', 'opening'],
      reply: "Kitchen Setup & Design — planning ergonomic, high-output kitchen layouts, choosing the right equipment, and streamlining the operational workflow.\n\nIncludes layout review & equipment checklist (Starter), detailed layout blueprint & vendor support (Business), and end-to-end kitchen design (Enterprise).",
      chips: ['Pricing', 'Free Audit']
    },
    {
      id: 'marketing',
      keywords: ['marketing', 'zomato', 'swiggy', 'google ads', 'meta ads', 'facebook ads', 'instagram ads', 'ads', 'advertising', 'delivery', 'online orders', 'online visibility', 'digital', 'promotion', 'promote'],
      reply: "Marketing That Fills Seats — a performance marketing system built for Indian restaurants:\n\n🍔 Zomato & Swiggy Optimization — optimized menus, bestsellers, platform ads & better visibility\n🔍 Google Ads — capture high-intent local searches\n📱 Meta Ads — visual ads for breakfast, lunch, dinner & late-night orders\n⭐ Review & Reputation — manage reviews, improve ratings, build trust\n\nRuns alongside Operations Consulting for complete growth.",
      chips: ['Pricing', 'Free Audit', 'Results']
    },
    {
      id: 'cloud',
      keywords: ['cloud kitchen', 'cloud', 'dark kitchen', 'home kitchen', 'tiffin', 'ghost kitchen'],
      reply: "Cloud kitchens are a core focus — Chef Aniket designs them for Indian delivery brands.\n\nThe Launch Foundation package (₹40,000/month) is built specifically for small cafés & cloud kitchens: menu up to 25 items, 3 days staff training, layout review, equipment checklist and recipe cards.",
      chips: ['Pricing', 'Free Audit']
    },
    {
      id: 'process',
      keywords: ['process', 'how it works', 'how do we start', 'start', 'begin', 'steps', 'onboard', 'onboarding', 'procedure', 'workflow'],
      reply: "A simple 5-step process:\n\n01 Free Audit — share your restaurant details\n02 Consultation — understand your goals\n03 Strategy Plan — customized solution & proposal\n04 Execution — on-site & online support\n05 Growth & Review — track results and scale\n\nIt starts with the free audit — no obligation.",
      chips: ['Free Audit', 'Pricing']
    },
    {
      id: 'about',
      keywords: ['about', 'who is', 'who are', 'aniket', 'chef aniket', 'experience', 'years', 'bio', 'background', 'qualification', 'expert', 'trust', 'why you', 'why aniket'],
      reply: "Chef Aniket is a Restaurant Consulting & Growth Expert with 10+ years of hotel-industry experience, focused on Indian restaurants & cloud kitchens.\n\n✅ End-to-end consulting & growth support\n✅ Practical, result-driven approach\n✅ Trusted by restaurants like LeanFuel (Tapout Fitness)\n\nYou can watch his introduction video on the homepage!",
      chips: ['Results', 'Services', 'Free Audit']
    },
    {
      id: 'results',
      keywords: ['results', 'results?', 'case study', 'success', 'success story', 'client', 'clients', 'portfolio', 'example', 'proof', 'leanfuel', 'tapout', 'testimonial', 'review i mean'],
      reply: "Client success story: LeanFuel by Tapout Fitness 💪\n\nWe helped LeanFuel grow their healthy-meal business — you can watch their story videos in the Client Success Story section of this site.\n\nAnd a client from Mumbai says: \"Chef Aniket helped us optimize our menu, train our staff and improve our Zomato orders. Our kitchen is now more organized and profitable.\"",
      chips: ['Free Audit', 'Pricing'],
      link: { text: '▶ Watch the success story', href: '#leanfuel' }
    },
    {
      id: 'audit',
      keywords: ['audit', 'free', 'consultation', 'consult', 'call', 'book', 'meeting', 'demo', 'contact', 'whatsapp', 'phone', 'number', 'reach', 'enquiry', 'inquiry', 'quote'],
      reply: "The Free Restaurant Growth Audit is a no-obligation review of your menu, kitchen, costs and online visibility.\n\nJust share your name, restaurant name and WhatsApp number on the site form — or tap the button below. Chef Aniket personally reviews every request and replies on WhatsApp.",
      chips: ['Pricing', 'Process'],
      cta: { text: '💬 Get Free Audit on WhatsApp', msg: "Hello Chef Aniket, I would like a Free Restaurant Growth Audit." }
    },
    {
      id: 'location',
      keywords: ['location', 'area', 'city', 'where', 'where are you', 'based', 'mumbai', 'india', 'online', 'remote', 'onsite', 'on site', 'on-site visit', 'travel'],
      reply: "Chef Aniket works with restaurants across India 🇮🇳\n\n• Consultations & marketing support run online\n• On-site visits for audits, training and execution are included in the plans (weekly in Business, 4 audits in Enterprise)",
      chips: ['Free Audit', 'Pricing']
    },
    {
      id: 'timing',
      keywords: ['timing', 'timings', 'hours', 'working hours', 'when', 'available', 'schedule', 'response time', 'reply time'],
      reply: "You can send an enquiry anytime — messages reach Chef Aniket directly on WhatsApp, and he replies as soon as possible, usually the same day.",
      chips: ['Free Audit', 'Contact']
    },
    {
      id: 'thanks',
      keywords: ['thanks', 'thank you', 'thankyou', 'dhanyavad', 'ok thanks', 'great', 'awesome', 'nice', 'cool', 'perfect'],
      reply: "Happy to help 😊 Whenever you're ready, Chef Aniket personally reviews every Free Audit — tap the button anytime!",
      chips: ['Free Audit']
    },
    {
      id: 'fallback',
      keywords: [],
      reply: "Hmm, I want to make sure you get the accurate answer 🤔\n\nI know everything about: services, pricing & packages, the 5-step process, cloud kitchens, marketing, the LeanFuel success story, and how to book a free audit.\n\nYou can also ask Chef Aniket directly on WhatsApp 🙂",
      chips: GREET_CHIPS,
      cta: { text: '💬 Ask on WhatsApp', msg: "Hello Chef Aniket, I have a question about your restaurant consulting services:" }
    }
  ];

  /* ---------- Intent matcher ---------- */

  function normalize(s) {
    return (s || '')
      .toLowerCase()
      .replace(/[^\w\s₹]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function findIntent(text) {
    const t = normalize(text);
    if (!t) return null;
    let best = null;
    let bestScore = 0;
    for (const item of KB) {
      let score = 0;
      for (const kw of item.keywords) {
        const k = normalize(kw);
        if (!k) continue;
        if (t === k) score += 6;                       // exact match
        else if (t.includes(' ' + k + ' ') || t.includes(' ' + k) || t.includes(k + ' ')) {
          score += Math.max(2, k.split(' ').length * 2); // phrase match
        }
      }
      if (score > bestScore) { bestScore = score; best = item; }
    }
    return bestScore >= 2 ? best : KB[KB.length - 1]; // fallback intent
  }

  /* ---------- UI rendering ---------- */

  let greeted = false;

  function scrollBottom() {
    body.scrollTop = body.scrollHeight;
  }

  function addMsg(text, who) {
    const div = document.createElement('div');
    div.className = 'chat-msg ' + who;
    div.textContent = text;
    body.appendChild(div);
    scrollBottom();
    return div;
  }

  function addCta(container, cta) {
    const a = document.createElement('a');
    a.className = 'chat-cta';
    a.href = waLink(cta.msg);
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = cta.text;
    container.appendChild(document.createElement('br'));
    container.appendChild(a);
  }

  function addJumpLink(container, link) {
    const a = document.createElement('a');
    a.className = 'chat-cta';
    a.href = link.href;
    a.style.background = 'var(--primary)';
    a.textContent = link.text;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      close();
      const target = document.querySelector(link.href);
      if (target) {
        setTimeout(function () {
          const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 250);
      }
    });
    container.appendChild(document.createElement('br'));
    container.appendChild(a);
  }

  function showChips(chips) {
    chipsEl.innerHTML = '';
    (chips || []).forEach(function (c) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chat-chip';
      b.textContent = c;
      b.addEventListener('click', function () { send(c); });
      chipsEl.appendChild(b);
    });
  }

  function botSay(item) {
    const typing = document.createElement('div');
    typing.className = 'chat-typing';
    typing.innerHTML = '<i></i><i></i><i></i>';
    body.appendChild(typing);
    scrollBottom();

    setTimeout(function () {
      typing.remove();
      const div = addMsg(item.reply, 'bot');
      if (item.cta) addCta(div, item.cta);
      if (item.link) addJumpLink(div, item.link);
      scrollBottom();
      showChips(item.chips);
    }, 550);
  }

  function send(text) {
    const t = (text || '').trim();
    if (!t) return;
    addMsg(t, 'user');
    chipsEl.innerHTML = '';
    input.value = '';
    botSay(findIntent(t));
  }

  /* ---------- Open / close ---------- */

  function open() {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    fab.classList.add('open');
    fab.setAttribute('aria-expanded', 'true');
    if (!greeted) {
      greeted = true;
      botSay(KB[0]);
    }
    setTimeout(function () { input.focus(); }, 320);
  }

  function close() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    fab.classList.remove('open');
    fab.setAttribute('aria-expanded', 'false');
  }

  fab.addEventListener('click', function () {
    panel.classList.contains('open') ? close() : open();
  });
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('open')) close();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    send(input.value);
  });

})();
