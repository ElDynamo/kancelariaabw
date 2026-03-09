// Plik: public/admin-button.js
// Wstrzykiwany na stronę /keystatic przez vite inject

(function () {
    function injectButton() {
        if (document.getElementById('back-to-admin-btn')) return;
        if (!window.location.pathname.startsWith('/keystatic')) return;

        const btn = document.createElement('a');
        btn.id = 'back-to-admin-btn';
        btn.href = '/admin';
        btn.textContent = '← Panel Admin';
        btn.style.cssText = [
            'position:fixed',
            'bottom:20px',
            'left:20px',
            'z-index:2147483647',
            'background:#0f2540',
            'color:#c9a84c',
            'border:1px solid rgba(201,168,76,0.4)',
            'padding:0.5rem 1rem',
            'border-radius:8px',
            'font-family:system-ui,sans-serif',
            'font-size:0.8rem',
            'font-weight:600',
            'text-decoration:none',
            'letter-spacing:0.05em',
            'box-shadow:0 4px 20px rgba(0,0,0,0.4)',
            'transition:all 0.2s'
        ].join(';');

        btn.addEventListener('mouseenter', () => {
            btn.style.background = '#c9a84c';
            btn.style.color = '#0f2540';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = '#0f2540';
            btn.style.color = '#c9a84c';
        });

        document.body.appendChild(btn);
    }

    // Uruchom od razu i obserwuj zmiany DOM (Keystatic to SPA)
    document.addEventListener('DOMContentLoaded', injectButton);
    setTimeout(injectButton, 500);
    setTimeout(injectButton, 1500);

    const observer = new MutationObserver(injectButton);
    document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, { childList: true, subtree: false });
    });
})();
