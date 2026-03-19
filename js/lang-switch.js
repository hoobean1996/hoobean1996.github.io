// Language switcher - auto-generates links based on current URL
(function () {
  var langs = [
    { code: 'zh', label: '中文' },
    { code: 'en', label: 'EN' },
    { code: 'jp', label: '日本語' }
  ];

  var path = window.location.pathname;
  var currentLang = 'zh';
  var match = path.match(/^\/(zh|en|jp)(\/|$)/);
  if (match) {
    currentLang = match[1];
  }

  var nav = document.querySelector('header nav');
  if (!nav) return;

  var switcher = document.createElement('div');
  switcher.className = 'lang-switch';

  langs.forEach(function (lang, i) {
    if (lang.code === currentLang) {
      var span = document.createElement('span');
      span.className = 'lang-current';
      span.textContent = lang.label;
      switcher.appendChild(span);
    } else {
      var a = document.createElement('a');
      a.href = path.replace(/^\/(zh|en|jp)(\/|$)/, '/' + lang.code + '$2');
      a.textContent = lang.label;
      switcher.appendChild(a);
    }
    if (i < langs.length - 1) {
      var sep = document.createTextNode(' | ');
      switcher.appendChild(sep);
    }
  });

  nav.appendChild(switcher);
})();
