document.addEventListener("DOMContentLoaded", () => {
  // =======================
  // 2️⃣ Éphéméride du jour
  // =======================
  const lat = 44.02; // Montauban
  const lon = 1.35;
  const apiKey = "80e7c098202748b4a65f2a1e1cd87db8"; // Remplace par ta clé ipgeolocation.io

  fetch(`https://api.ipgeolocation.io/astronomy?apiKey=${apiKey}&lat=${lat}&long=${lon}`)
    .then(res => res.json())
    .then(data => {
      const sunriseEl = document.getElementById("sunrise");
      const sunsetEl = document.getElementById("sunset");
      const moonriseEl = document.getElementById("moonrise");
      const moonsetEl = document.getElementById("moonset");
      const moonphaseEl = document.getElementById("moonphase");

      if (sunriseEl) sunriseEl.textContent = "Lever du Soleil : " + data.sunrise;
      if (sunsetEl) sunsetEl.textContent = "Coucher du Soleil : " + data.sunset;
      if (moonriseEl) moonriseEl.textContent = "Lever de la Lune : " + data.moonrise;
      if (moonsetEl) moonsetEl.textContent = "Coucher de la Lune : " + data.moonset;
      if (moonphaseEl) moonphaseEl.textContent = "Phase de la Lune : " + data.moon_phase;
    })
    .catch(err => console.error("Erreur API éphéméride :", err));

  // =======================
  // 3️⃣ Éphéméride longue (événements à venir)
  // =======================
  const evenements = [
    { date: "2025-10-17", nom: "Pluie d’étoiles filantes Orionides", visibilite: "Ciel clair, nuit entière" },
    { date: "2025-10-25", nom: "Conjonction Lune – Jupiter", visibilite: "Soirée, horizon sud-ouest" },
    { date: "2025-11-01", nom: "Nouvelle Lune", visibilite: "Soirée" },
    { date: "2025-11-17", nom: "Éclipse lunaire partielle", visibilite: "Visible dans l’hémisphère nord" }
  ];

  const container = document.getElementById("evenements-long");
  if (container) {
    const aujourdHui = new Date();
    const futurs = evenements.filter(e => new Date(e.date) >= aujourdHui);

    let html = `<table class="calendar-events">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Événement</th>
                      <th>Visibilité</th>
                    </tr>
                  </thead>
                  <tbody>`;
    futurs.forEach(ev => {
      const dateStr = new Date(ev.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
      html += `<tr>
                 <td>${dateStr}</td>
                 <td>${ev.nom}</td>
                 <td>${ev.visibilite}</td>
               </tr>`;
    });
    html += `</tbody></table>`;
    container.innerHTML = html;
  }

});
