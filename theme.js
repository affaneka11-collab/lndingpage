// theme.js
function setTheme(theme) {
    const root = document.documentElement;
    if (theme === 'light') {
        root.style.setProperty('--bg-color', '#ffffff');
        root.style.setProperty('--text-color', '#333');
        root.style.setProperty('--nav-bg', 'rgba(255, 255, 255, 0.9)');
        root.style.setProperty('--card-bg', '#fff');
        root.style.setProperty('--modal-bg', 'rgba(255, 255, 255, 0.9)');
        root.style.setProperty('--container-bg', 'rgba(255, 255, 255, 0.9)');
        root.style.setProperty('--accent-color', '#007bff');
    } else if (theme === 'dark') {
        root.style.setProperty('--bg-color', '#333');
        root.style.setProperty('--text-color', '#fff');
        root.style.setProperty('--nav-bg', 'rgba(51, 51, 51, 0.9)');
        root.style.setProperty('--card-bg', '#444');
        root.style.setProperty('--modal-bg', '#444');
        root.style.setProperty('--container-bg', 'rgba(68, 68, 68, 0.9)');
        root.style.setProperty('--accent-color', '#ffa500');
    } else if (theme === 'blue') {
        root.style.setProperty('--bg-color', '#e3f2fd');
        root.style.setProperty('--text-color', '#0d47a1');
        root.style.setProperty('--nav-bg', 'rgba(227, 242, 253, 0.9)');
        root.style.setProperty('--card-bg', '#bbdefb');
        root.style.setProperty('--modal-bg', '#bbdefb');
        root.style.setProperty('--container-bg', 'rgba(187, 222, 251, 0.9)');
        root.style.setProperty('--accent-color', '#1976d2');
    }

window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'light';
    setTheme(savedTheme);
});
