// script.js//
// Validacija e-maila
// Validacija e-maila
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

// Validacija datuma rođenja
function validateDate(date) {
    const today = new Date();
    const dob = new Date(date);
    return dob <= today;
}

// Validacija lozinke i prikaz snage lozinke
document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const result = zxcvbn(password); // Koristi zxcvbn biblioteku
    const strengthText = result.score < 2 ? "Slaba" : result.score < 4 ? "Srednja" : "Jaka";
    document.getElementById('password-strength').innerText = "Snaga lozinke: " + strengthText;
});

// Event listener za submit forme
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const password = document.getElementById('password').value;

    // Validacija podataka
    if (!firstName || !lastName || !validateEmail(email) || !contact || password.length < 6) {
        document.getElementById('response-message').style.display = 'block';
        document.getElementById('response-message').innerText = 'Molimo popunite formu ispravno!';
        document.getElementById('response-message').style.backgroundColor = 'red';
        return;
    }

    //FormData 
    const formData = new FormData();
    formData.append('first-name', firstName);
    formData.append('last-name', lastName);
    formData.append('email', email);
    formData.append('contact', contact);
    formData.append('password', password);

    // AJAX zahtjev
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'server.php', true); // Server

    xhr.onload = function() {
        if (xhr.status === 200) {
            // Ako su podaci uspješno poslati, poruka o uspehu
            document.getElementById('response-message').style.display = 'block';
            document.getElementById('response-message').innerText = 'Forma je uspešno poslata!';
            document.getElementById('response-message').style.backgroundColor = 'green';
        } else {
            // Ako dođe do greške, poruka o grešci
            document.getElementById('response-message').style.display = 'block';
            document.getElementById('response-message').innerText = 'Došlo je do greške prilikom slanja podataka.';
            document.getElementById('response-message').style.backgroundColor = 'red';
        }
    };

    // Pošalji podatke
    xhr.send(formData);

    // Toastr obavještenje
    toastr.success('Uspešno ste se registrovali!');
});

// Primjer validacije forme sa toastr obaveštenjem
function validateForm() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const contact = document.getElementById('contact').value;

    if (!firstName || !lastName || !email || !password || !contact) {
        return false; 
    }

    return true; 
}

// Toastr konfiguracija
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right", // Pozicija u gornjem desnom kutu
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300", // Animacija trajanja
    "hideDuration": "1000", // Animacija nestajanja
    "timeOut": "5000", // Trajanje obaveštenja
    "extendedTimeOut": "1000"
};
