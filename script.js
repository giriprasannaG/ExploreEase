// Dark Mode Toggle
const darkModeBtn = document.getElementById('darkModeToggle');
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// AOS initialization
AOS.init();

// Trip Planner
const form = document.getElementById('tripForm');
const result = document.getElementById('result');

const images = {
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
  mountain: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
  adventure: 'https://images.unsplash.com/photo-1499696010181-efc66c95f6f6'
};

const itineraries = {
  beach: ["Sunrise at Beach", "Surfing Lesson", "Beachside Dinner"],
  mountain: ["Hiking Trail", "Mountain Viewpoint", "Local Cafe"],
  adventure: ["Rafting", "Zipline", "Campfire Night"]
};

form.addEventListener('submit', async function(e){
  e.preventDefault();
  const destination = document.getElementById('destination').value;
  const start = document.getElementById('start').value;
  const end = document.getElementById('end').value;
  const type = document.getElementById('type').value;

  // Weather API
  const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=YOUR_API_KEY&units=metric`);
  const weatherData = await weatherRes.json();
  const weather = weatherData.main ? `${weatherData.main.temp}°C, ${weatherData.weather[0].description}` : 'Weather not found';

  // Currency conversion (dummy example)
  const tripCost = Math.floor(Math.random() * 1000 + 500);

  result.innerHTML = `
    <div class="card">
      <h3>Plan for ${destination}</h3>
      <p><strong>Dates:</strong> ${start} to ${end}</p>
      <p><strong>Trip Type:</strong> ${type}</p>
      <p><strong>Weather:</strong> ${weather}</p>
      <p><strong>Estimated Cost:</strong> $${tripCost}</p>
      <h4>Suggested Itinerary:</h4>
      <ul>
        ${itineraries[type].map(item => `<li>${item}</li>`).join('')}
      </ul>
      <img src="${images[type]}" alt="${type} image" />
    </div>
  `;

  // Save to localStorage
  let trips = JSON.parse(localStorage.getItem('trips')) || [];
  trips.push({destination, start, end, type, weather, tripCost});
  localStorage.setItem('trips', JSON.stringify(trips));
});

// Contact form
const contactForm = document.getElementById('contactForm');
const contactMsg = document.getElementById('contactMsg');
contactForm.addEventListener('submit', function(e){
  e.preventDefault();
  contactMsg.innerHTML = "<p class='success'>✅ Message sent successfully!</p>";
  contactForm.reset();
});
