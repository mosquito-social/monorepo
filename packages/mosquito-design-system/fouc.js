export const foucSnippet = `
  (function() {
    try {
      var match = document.cookie.match(/(?:^|; )colorScheme=([^;]+)/);
      var cookieTheme = match ? match[1] : null;
      if (cookieTheme === 'dark' || cookieTheme === 'light') {
        document.documentElement.classList.add(cookieTheme);
      }
    } catch (e) {}
  })();
`;
