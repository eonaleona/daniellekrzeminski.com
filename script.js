(function(){
    var root = document.documentElement;
    var names = {a:"Monochrome", b:"Ember", c:"Hot Pink", d:"Hacker Green"};
    var swatches = document.querySelectorAll('.rev-swatch');
    var faviconLink = document.getElementById('favicon');

    function updateFavicon(){
        if (!faviconLink) return;
        var styles = getComputedStyle(root);
        var bg = styles.getPropertyValue('--bg').trim();
        var accent = styles.getPropertyValue('--accent').trim();
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -10 200 180">'
            + '<rect fill="' + bg + '" height="160" rx="32" width="160"/>'
            + '<path d="m18 32h32l-22-32z" fill="' + bg + '"/>'
            + '<path d="m142 32h-32l22-32z" fill="' + bg + '"/>'
            + '<circle cx="50" cy="90" fill="' + accent + '" r="24"/>'
            + '<circle cx="110" cy="90" fill="' + accent + '" r="24"/>'
            + '<circle cx="50" cy="90" fill="' + bg + '" r="8"/>'
            + '<circle cx="110" cy="90" fill="' + bg + '" r="8"/>'
            + '<g stroke="' + accent + '" stroke-linecap="round" stroke-width="1.5">'
            + '<path d="m-10 110 35-4"/><path d="m-10 122h35"/><path d="m135 106 35 4"/><path d="m135 122h35"/></g></svg>';
        faviconLink.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
    }

    function applyRev(rev, persist){
        root.setAttribute('data-rev', rev);
        swatches.forEach(function(s){
            s.setAttribute('aria-pressed', s.dataset.swatch === rev ? 'true' : 'false');
        });
        updateFavicon();
        if (persist){
            try{ localStorage.setItem('dk-rev', rev); }catch(e){}
        }
    }
    swatches.forEach(function(s){
        s.addEventListener('click', function(){ applyRev(s.dataset.swatch, true); });
    });
    var saved = null;
    try{ saved = localStorage.getItem('dk-rev'); }catch(e){}
    applyRev(saved && names[saved] ? saved : 'a', false);

    // nav dropdown toggle
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('siteNav');
    if (toggle && nav){
        toggle.addEventListener('click', function(e){
            e.stopPropagation();
            var open = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
            nav.classList.toggle('open', !open);
        });
        nav.querySelectorAll('a').forEach(function(a){
            a.addEventListener('click', function(){
                toggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('open');
            });
        });
        document.addEventListener('click', function(e){
            if (!nav.contains(e.target) && e.target !== toggle){
                toggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('open');
            }
        });
        document.addEventListener('keydown', function(e){
            if (e.key === 'Escape'){
                toggle.setAttribute('aria-expanded', 'false');
                nav.classList.remove('open');
            }
        });
    }

    // reveal-on-scroll
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fades = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window && !reduceMotion){
        var io = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if (entry.isIntersecting){
                    entry.target.classList.add('in-view');
                    io.unobserve(entry.target);
                }
            });
        }, {threshold:0.1});
        fades.forEach(function(f){ io.observe(f); });
    } else {
        fades.forEach(function(f){ f.classList.add('in-view'); });
    }

    // scattered starfield
    var field = document.getElementById('starfield');
    if (field){
        var frag = document.createDocumentFragment();
        var count = reduceMotion ? 40 : 90;
        for (var i=0; i<count; i++){
            var el = document.createElement('div');
            var isShape = Math.random() < 0.1;
            el.className = 'star ' + (isShape ? 'shape' : 'dot');
            var size = isShape ? (8 + Math.random()*12) : (1.3 + Math.random()*2.2);
            el.style.width = size + 'px';
            el.style.height = size + 'px';
            el.style.left = (Math.random()*100) + '%';
            el.style.top = (Math.random()*100) + '%';
            if (reduceMotion){
                el.style.opacity = (0.25 + Math.random()*0.25).toFixed(2);
            } else {
                var dur = 3 + Math.random()*5;
                el.style.animationDuration = dur + 's';
                el.style.animationDelay = (-Math.random()*dur) + 's';
                el.style.setProperty('--min-op', (0.08 + Math.random()*0.12).toFixed(2));
                el.style.setProperty('--max-op', (0.45 + Math.random()*0.3).toFixed(2));
            }
            frag.appendChild(el);
        }
        field.appendChild(frag);
    }
})();