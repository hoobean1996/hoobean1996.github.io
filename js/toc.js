// Auto-generate sidebar TOC from h3 headings in .post-content
(function () {
    var article = document.querySelector('.post-content');
    if (!article) return;

    var headings = article.querySelectorAll('h3');
    if (headings.length < 3) return; // Not worth showing for short posts

    // Add IDs to headings
    var links = [];
    headings.forEach(function (h, i) {
        var id = 'section-' + i;
        h.id = id;
        links.push({ id: id, text: h.textContent });
    });

    // Build TOC
    var toc = document.createElement('nav');
    toc.className = 'toc';
    toc.innerHTML = '<div class="toc-title">Contents</div>';
    links.forEach(function (link) {
        var a = document.createElement('a');
        a.href = '#' + link.id;
        a.textContent = link.text;
        toc.appendChild(a);
    });
    document.body.appendChild(toc);

    // Highlight active section on scroll
    var tocLinks = toc.querySelectorAll('a');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                tocLinks.forEach(function (a) { a.classList.remove('active'); });
                var active = toc.querySelector('a[href="#' + entry.target.id + '"]');
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '0px 0px -70% 0px', threshold: 0 });

    headings.forEach(function (h) { observer.observe(h); });

    // Smooth scroll on click
    tocLinks.forEach(function (a) {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', this.getAttribute('href'));
            }
        });
    });
})();
