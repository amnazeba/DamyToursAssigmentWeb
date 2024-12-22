//za ponude
//za ponude promjena za github 
document.addEventListener('DOMContentLoaded', function() {
    const offersContainer = document.getElementById('offersContainer');
  
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
            displayOffer(offer);
          });
        } else {
          offersContainer.innerHTML = '<p>Trenutno nema dostupnih ponuda.</p>';
        }
      })
      .catch(error => {
        console.error('Greška prilikom učitavanja ponuda:', error);
        offersContainer.innerHTML = '<p>Neuspješno učitavanje ponuda. Pokušajte ponovo kasnije.</p>';
      });
  
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
  });
  

