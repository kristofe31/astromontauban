document.addEventListener("DOMContentLoaded", () => {
  // === Compteur visiteurs ===
  try {
    const compteur = document.getElementById("visiteurs");
    if (compteur) {
      let visites = parseInt(localStorage.getItem("clubastro_visites"), 10);
      if (isNaN(visites)) visites = 0;
      visites++;
      localStorage.setItem("clubastro_visites", visites);
      compteur.textContent = visites;
    }
  } catch (err) {
    console.error("Erreur compteur visiteurs :", err);
  }

  // === Éphéméride ===
  const evenements = [
    { date: "2025-10-12", nom: "Pluie d’étoiles filantes des Orionides", visibilite: "Nuit entière, ciel clair" },
    { date: "2025-10-28", nom: "Conjonction Jupiter-Saturne", visibilite: "Au crépuscule, horizon sud-ouest" },
    { date: "2025-11-01", nom: "Lune gibbeuse", visibilite: "Visible dès le soir" },
    { date: "2025-11-17", nom: "Éclipse lunaire partielle", visibilite: "Visible dans l’hémisphère nord" }
  ];

  const container = document.getElementById("ephemeride");
  if (container) {
    // Filtrer uniquement les événements à venir
    const aujourdHui = new Date();
    const futurs = evenements.filter(e => new Date(e.date) >= aujourdHui);

    // Générer le HTML du tableau
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