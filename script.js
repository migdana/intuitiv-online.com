(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('#main-nav');

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Deschide meniul' : 'Închide meniul');
    mainNav?.classList.toggle('is-open', !isOpen);
  });

  mainNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.setAttribute('aria-label', 'Deschide meniul');
    });
  });

  const quiz = document.querySelector('#intuition-quiz');
  const quizResult = document.querySelector('#quiz-result');
  const reflections = {
    body: 'Poate fi util să notezi ce observi în corp și să revii la decizie după un moment de liniște.',
    thought: 'Analiza îți poate oferi structură. Observă și ce simți când compari opțiunile.',
    rush: 'Graba poate apărea când tensiunea e mare. O pauză scurtă te poate ajuta să vezi mai clar.'
  };

  quiz?.addEventListener('submit', (event) => {
    event.preventDefault();
    const answer = new FormData(quiz).get('answer');
    if (quizResult && answer) {
      quizResult.textContent = `${reflections[answer]} Acesta este un punct de pornire pentru reflecție, nu o evaluare.`;
    }
  });

  const contactForm = document.querySelector('#contact-form');
  const formResult = document.querySelector('#form-result');
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    if (formResult) {
      formResult.textContent = 'Mulțumim, am primit mesajul și îți răspundem pe e-mail.';
    }
    contactForm.reset();
  });

  const cookieBanner = document.querySelector('#cookie-banner');
  const cookieChoiceKey = 'intuitiv-online-cookie-choice';
  try {
    if (!localStorage.getItem(cookieChoiceKey) && cookieBanner) cookieBanner.hidden = false;
    cookieBanner?.querySelectorAll('[data-cookie]').forEach((button) => {
      button.addEventListener('click', () => {
        localStorage.setItem(cookieChoiceKey, button.dataset.cookie);
        cookieBanner.hidden = true;
      });
    });
  } catch {
    // Cookie preferences stay optional when browser storage is unavailable.
  }

  document.querySelectorAll('a[href="#legal"]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });
})();
