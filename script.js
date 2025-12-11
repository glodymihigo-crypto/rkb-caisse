// Charge la date automatiquement
window.onload = () => {
    document.getElementById("date").value = new Date().toISOString().split("T")[0];
    afficherTable();
};

// Récupérer les données depuis localStorage
function getData() {
    return JSON.parse(localStorage.getItem("operations") || "[]");
}

// Sauvegarder dans localStorage
function saveData(data) {
    localStorage.setItem("operations", JSON.stringify(data));
}

// Afficher tableau
function afficherTable() {
    const body = document.getElementById("table-body");
    const data = getData();
    body.innerHTML = "";

    let solde = 0;

    data.forEach((op, index) => {
        solde += Number(op.total) - Number(op.sortie);
        op.solde = solde;

        body.innerHTML += `
            <tr>
                <td>${op.date}</td>
                <td>${op.libele}</td>
                <td>${op.quantite}</td>
                <td>${op.prix}</td>
                <td>${op.total}</td>
                <td>${op.sortie}</td>
                <td>${op.solde}</td>
                <td>${op.vente_jour}</td>
                <td>${op.obs}</td>
                <td><button onclick="supprimer(${index})">🗑️</button></td>
            </tr>
        `;
    });
}

// Ajouter une ligne
function ajouterLigne() {
    const date = document.getElementById("date").value;
    const libele = document.getElementById("libele").value;
    const quantite = Number(document.getElementById("quantite").value);
    const prix = Number(document.getElementById("prix").value);
    const sortie = Number(document.getElementById("sortie").value || 0);
    const venteJour = Number(document.getElementById("venteJour").value || 0);
    const obs = document.getElementById("obs").value;

    const total = quantite * prix;

    const data = getData();
    data.push({ date, libele, quantite, prix, total, sortie, vente_jour: venteJour, obs });

    saveData(data);
    afficherTable();

    // Reset des champs
    document.getElementById("libele").value = "";
    document.getElementById("quantite").value = "";
    document.getElementById("prix").value = "";
    document.getElementById("sortie").value = "";
    document.getElementById("venteJour").value = "";
    document.getElementById("obs").value = "";

    // Date automatique du jour
    document.getElementById("date").value = new Date().toISOString().split("T")[0];
}

// Supprimer une ligne
function supprimer(index) {
    const data = getData();
    data.splice(index, 1);
    saveData(data);
    afficherTable();
}

