//pitanja
document.addEventListener('DOMContentLoaded', function () {
  // Provjera da li su svi potrebni elementi prisutni
  const offersContainer = document.getElementById('offersContainer');
  const questionForm = document.getElementById('questionForm');
  const userQuestion = document.getElementById('userQuestion');
  const successButton = document.getElementById('success');
  const questionsContainer = document.getElementById('questionsContainer');

  if (!offersContainer || !questionForm || !userQuestion || !successButton || !questionsContainer) {
    console.error('Neki od potrebnih elemenata nisu pronađeni!');
    return; 
  }

  // Učitavanje ponuda
  fetch('ponude.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP greška! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(offers => {
      if (offers.length > 0) {
        offers.forEach(offer => {
          if (!isOfferExist(offer)) {
            displayOffer(offer);
          }
        });
      } else {
        offersContainer.innerHTML = '<p>Trenutno nema dostupnih ponuda.</p>';
      }
    })
    .catch(error => {
      console.error('Greška prilikom učitavanja ponuda:', error);
      offersContainer.innerHTML = '<p>Neuspješno učitavanje ponuda. Pokušajte ponovo kasnije.</p>';
    });

  // Funkcija za provjeru postojanja ponude
  function isOfferExist(offer) {
    const existingOffers = offersContainer.querySelectorAll('.offer-card');
    for (let card of existingOffers) {
      const title = card.querySelector('h3').textContent;
      if (title === offer.title) {
        return true;
      }
    }
    return false;
  }

  // Funkcija za prikaz ponude
  function displayOffer(offer) {
    const offerCard = document.createElement('div');
    offerCard.classList.add('offer-card');
    offerCard.innerHTML = `
      <h3>${offer.title}</h3>
      <p><strong>Destinacija:</strong> ${offer.destination}</p>
      <p><strong>Cijena:</strong> ${offer.price} KM</p>
      <p><strong>Opis:</strong> ${offer.description}</p>
    `;
    offersContainer.appendChild(offerCard);
  }

  // Event listener za slanje pitanja
  successButton.addEventListener('click', () => {
    const questionText = userQuestion.value.trim();

    if (questionText !== '') {
      const newQuestion = { id: Date.now(), text: questionText };
      if (!isQuestionExist(newQuestion)) {
        showQuestion(newQuestion);
        userQuestion.value = '';
      } else {
        displaySuccessMessage('Ovo pitanje je već postavljeno!');
      }
    } else {
      displaySuccessMessage('Pitanje ne može biti prazno!');
    }
  });

  // Funkcija za provjeru postojanja pitanja
  function isQuestionExist(newQuestion) {
    const existingQuestions = questionsContainer.querySelectorAll('.question-container');
    for (let question of existingQuestions) {
      const text = question.querySelector('.question-text').textContent;
      if (text === newQuestion.text) {
        return true;
      }
    }
    return false;
  }

  // Funkcija za prikazivanje pitanja
  function showQuestion(question) {
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');
    questionContainer.setAttribute('data-id', question.id);

    const questionText = document.createElement('div');
    questionText.textContent = question.text;
    questionText.classList.add('question-text');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      userQuestion.value = question.text;
      if (questionsContainer.contains(questionContainer)) {
        questionsContainer.removeChild(questionContainer);
      }
      displaySuccessMessage('Pitanje je uspješno uređeno!');
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete'; 
    deleteButton.addEventListener('click', () => {
      if (questionsContainer.contains(questionContainer)) {
        questionsContainer.removeChild(questionContainer);
        displaySuccessMessage('Pitanje je uspješno obrisano!');
      } else {
        console.error('Pitanje nije pronađeno za brisanje.');
      }
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    questionContainer.appendChild(questionText);
    questionContainer.appendChild(buttonContainer);

    questionsContainer.appendChild(questionContainer);
  }

  // Funkcija za prikazivanje poruke o uspjehu
  function displaySuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.textContent = message;
    successMessage.classList.add('success-message');
    questionForm.appendChild(successMessage);

    setTimeout(() => {
      if (questionForm.contains(successMessage)) {
        questionForm.removeChild(successMessage);
      }
    }, 2000);
  }
});

