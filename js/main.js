  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  // Scroll reveal
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('is-visible'));
  }

  // Simulated reservation confirmation
  const form = document.getElementById('reservaForm');
  const confirmBox = document.getElementById('confirmBox');
  const confirmCode = document.getElementById('confirmCode');
  const confirmText = document.getElementById('confirmText');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const nombre = document.getElementById('nombre').value.trim();
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const personas = document.getElementById('personas').value;

    const code = 'MK-' + Math.floor(1000 + Math.random() * 9000);
    const fechaFmt = fecha ? new Date(fecha + 'T00:00:00').toLocaleDateString('es-UY', { day: 'numeric', month: 'long' }) : '';

    confirmCode.textContent = code;
    confirmText.textContent = `${nombre}, tu mesa para ${personas} está anotada para el ${fechaFmt} a las ${hora}.`;
    confirmBox.classList.remove('show');
    void confirmBox.offsetWidth;
    confirmBox.classList.add('show');
    confirmBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });