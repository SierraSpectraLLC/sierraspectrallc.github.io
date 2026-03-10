/**
 * Sierra Spectra — Shared component loader
 * Injects nav and footer fragments into every page.
 * Also highlights the active nav link based on the current URL.
 */
(function () {
    var components = ['nav', 'footer'];

    components.forEach(function (id) {
        var el = document.getElementById(id + '-root');
        if (!el) return;

        fetch('/components/' + id + '.html')
            .then(function (r) { return r.text(); })
            .then(function (html) {
                el.innerHTML = html;

                // After nav is injected, highlight the active link
                if (id === 'nav') {
                    var path = window.location.pathname.replace(/\/$/, '') || '/';
                    var links = el.querySelectorAll('.nav-links a, .mobile-menu a');
                    links.forEach(function (link) {
                        var href = link.getAttribute('href').replace(/\/$/, '') || '/';
                        // Match exact path or treat /blog/posts/* as /blog
                        if (href === path || (href === '/blog' && path.startsWith('/blog'))) {
                            link.classList.add('active');
                        }
                    });
                }
            })
            .catch(function (err) {
                console.warn('Could not load component: ' + id, err);
            });
    });
})();
