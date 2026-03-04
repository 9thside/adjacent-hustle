// ── Sticky nav ──────────────────────────────────────────────────
const nav = document.getElementById('nav')
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

// ── Active nav link ──────────────────────────────────────────────
const path = window.location.pathname
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href')
  if ((path === '/' && href === '/') ||
      (path !== '/' && href !== '/' && path.includes(href.replace('.html', ''))))
    a.classList.add('active')
})

// ── Split text word reveal ────────────────────────────────────────
export function splitText(el, baseDelay = 0) {
  const words = el.textContent.trim().split(/\s+/)
  el.setAttribute('aria-label', el.textContent)
  el.innerHTML = words.map((w, i) =>
    `<span class="word-wrap"><span class="word" style="animation-delay:${(baseDelay + i * 0.07).toFixed(2)}s">${w}</span></span>`
  ).join(' ')
}

// Run on all [data-split] elements immediately (hero is visible on load)
document.querySelectorAll('[data-split]').forEach(el => {
  const delay = parseFloat(el.dataset.splitDelay || 0)
  splitText(el, delay)
})

// ── Scroll reveal ─────────────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target) }
  })
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' })

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el))

// ── Parallax orbs on hero ────────────────────────────────────────
const heroOrbs = document.querySelectorAll('.orb')
if (heroOrbs.length) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY
    heroOrbs.forEach((orb, i) => {
      const speed = [0.12, 0.18, 0.10, 0.14][i] || 0.12
      orb.style.transform = `translateY(${y * speed}px)`
    })
  }, { passive: true })
}

// ── Magnetic buttons ─────────────────────────────────────────────
document.querySelectorAll('.btn-magnetic').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transition = 'transform 0.08s linear, background 0.3s ease, box-shadow 0.3s ease'
  })
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.18
    const y = (e.clientY - r.top - r.height / 2) * 0.18
    btn.style.transform = `translate(${x}px, ${y}px)`
  })
  btn.addEventListener('mouseleave', () => {
    btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease, box-shadow 0.3s ease'
    btn.style.transform = ''
  })
})

// ── Counter animation (stats) ────────────────────────────────────
function animateCount(el, end, suffix = '') {
  const duration = 1800
  const t0 = performance.now()
  const tick = now => {
    const p = Math.min((now - t0) / duration, 1)
    const e = 1 - Math.pow(1 - p, 4)
    el.textContent = Math.round(end * e) + suffix
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

const statsEl = document.querySelector('.stats-bar')
if (statsEl) {
  const nums = statsEl.querySelectorAll('.stat-num')
  const data = [['15','+'], ['6','+'], ['95','%'], ['7','']]
  new IntersectionObserver(([entry], obs) => {
    if (entry.isIntersecting) {
      nums.forEach((el, i) => setTimeout(() => animateCount(el, +data[i][0], data[i][1]), i * 130))
      obs.disconnect()
    }
  }, { threshold: 0.5 }).observe(statsEl)
}

// ── Contact form ─────────────────────────────────────────────────
const form = document.querySelector('form[data-contact]')
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault()
    const btn = form.querySelector('.btn-submit')
    btn.textContent = '✓ Message sent — we\'ll be in touch soon.'
    btn.style.background = '#16a34a'
    btn.disabled = true
    setTimeout(() => {
      btn.textContent = 'Send Message →'; btn.style.background = ''; btn.disabled = false; form.reset()
    }, 5000)
  })
}
