export const foucSnippet = `
  (function() {
    try {
      var match = document.cookie.match(/(?:^|; )colorScheme=([^;]+)/);
      var cookieTheme = match ? match[1] : null;
      var theme = (cookieTheme === 'dark' || cookieTheme === 'light')
        ? cookieTheme
        : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.classList.add(theme);
    } catch (e) {}
  })();
`;
