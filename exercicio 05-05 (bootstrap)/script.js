// Função para aplicar dark mode
function applyDarkMode(isDark) {
  if (isDark) {
    document.body.classList.add('dark-mode');

    document.querySelectorAll('.bg-light').forEach(el => {
      el.classList.remove('bg-light');
      el.classList.add('bg-dark');
    });
  } else {
    document.body.classList.remove('dark-mode');
    // Reverta para light mode
    document.querySelectorAll('.bg-dark').forEach(el => {
      el.classList.remove('bg-dark');
      el.classList.add('bg-light');
    });
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  const darkModeSwitch = document.getElementById('darkModeSwitch');
  
  const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
  
  applyDarkMode(darkModeEnabled);
  if (darkModeSwitch) darkModeSwitch.checked = darkModeEnabled;
  
  if (darkModeSwitch) {
    darkModeSwitch.addEventListener('change', function() {
      const isDark = this.checked;
      localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
      applyDarkMode(isDark);
    });
  }
});