// Funkcija za promenu teme
function changeTheme(theme) {
    var body = document.body;
    
    // Uklanjanje prethodnih tema
    body.classList.remove('light-theme', 'dark-theme');
    
    // Dodavanje nove teme
    if (theme === 'light') {
        body.classList.add('light-theme');
    } else if (theme === 'dark') {
        body.classList.add('dark-theme');
    }
}

// Funkcija za promenu veličine fonta
function changeFontSize(size) {
    var body = document.body;
    
    // Uklanjanje prethodnih veličina fonta
    body.classList.remove('small-font', 'large-font');
    
    // Dodavanje nove veličine fonta
    if (size === 'small') {
        body.classList.add('small-font');
    } else if (size === 'large') {
        body.classList.add('large-font');
    }
}

