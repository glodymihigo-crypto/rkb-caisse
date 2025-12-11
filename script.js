const API_URL = "https://rkb-caisse-backend.onrender.com";

window.onload = () => {
    document.getElementById("date").value = new Date().toISOString().split("T")[0];
    chargerDonnees();
};

async function chargerDonnees() {
    const res = await fetch(`${API_URL}/operations`);
    const data = await res.json();
    afficherTable(data);
}

function afficherTable(data) {
    const body = document.getElementById("table-body");
    body.innerHTML = "";

    data.forEach(op => {
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
                <td><button onclick="supprimer(${op.id})">🗑️</button></td>
            </tr>
        `;
    });
}

async function ajouterLigne() {
    const date = document.getElementById("date").value;
    const libele = document.getElementById("libele").value;
    const quantite = Number(document.getElementById("quantite").value);
    const prix = Number(document.getElementById("prix").value);
    const sortie = Number(document.getElementById("sortie").value || 0);
    const venteJour = Number(document.getElementById("venteJour").value || 0);
    const obs = document.getElementById("obs").value;

    const total = quantite * prix;

    await fetch(`${API_URL}/operations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            date, libele, quantite, prix, total,
            sortie, vente_jour: venteJour, obs
        })
    });

    chargerDonnees();
}

async function supprimer(id) {
    await fetch(`${API_URL}/operations/${id}`, { method: "DELETE" });
    chargerDonnees();
}


