const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
// ONLY=tista,ticonnect  → ne régénère que ces dossiers
const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : null;
const OUT = path.join(__dirname, "../public/screenshots");

const ROSE = "#E11D48";
const SKY = "#0284C7";
const INDIGO = "#4F46E5";

const mocks = {
  tibuscourrier: [
    { file: "tibuscourrier-1.png", title: "Tableau de bord", html: mockCourrierDashboard() },
    { file: "tibuscourrier-2.png", title: "Embarquement", html: mockCourrierScan() },
    { file: "tibuscourrier-3.png", title: "Rapport financier", html: mockCourrierReport() },
  ],
  tista: [
    { file: "tista-1.png", title: "Ventes par index", html: mockTistaIndex() },
    { file: "tista-2.png", title: "Bons & cartes", html: mockTistaVouchers() },
    { file: "tista-3.png", title: "Bilan", html: mockTistaBilan() },
  ],
  ticonnect: [
    { file: "ticonnect-1.png", title: "Recherche", html: mockConnectSearch() },
    { file: "ticonnect-2.png", title: "Profil artisan", html: mockConnectProfile() },
    { file: "ticonnect-3.png", title: "Demandes", html: mockConnectRequests() },
  ],
  tabispay: [
    {
      file: "tabispay-1.png",
      title: "Tableau de bord",
      html: mockPayDashboard(),
    },
    {
      file: "tabispay-2.png",
      title: "Encaissement",
      html: mockPayCheckout(),
    },
    {
      file: "tabispay-3.png",
      title: "Transactions",
      html: mockPayTransactions(),
    },
  ],
  tabisride: [
    {
      file: "tabisride-1.png",
      title: "Carte",
      html: mockRideMap(),
    },
    {
      file: "tabisride-2.png",
      title: "Réservation",
      html: mockRideBooking(),
    },
    {
      file: "tabisride-3.png",
      title: "Conducteur",
      html: mockRideDriver(),
    },
  ],
  gestabiscom: [
    {
      file: "gestabiscom-2.png",
      title: "Dashboard",
      html: mockGestabisDashboard(),
    },
    {
      file: "gestabiscom-3.png",
      title: "Produits",
      html: mockGestabisProducts(),
    },
  ],
};

function shell(children, accent = "#8B5CF6") {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Inter,system-ui,sans-serif;background:#f4f6fb;color:#0f172a;width:1280px;height:800px;overflow:hidden}
  .top{background:linear-gradient(135deg,${accent},#1e1b4b);color:#fff;padding:18px 28px;display:flex;justify-content:space-between;align-items:center}
  .brand{font-weight:800;font-size:22px}
  .nav{display:flex;gap:18px;font-size:13px;opacity:.9}
  .nav span{padding:6px 12px;border-radius:999px;background:rgba(255,255,255,.15)}
  .content{padding:24px 28px}
  .grid{display:grid;gap:16px}
  .cards{grid-template-columns:repeat(4,1fr)}
  .card{background:#fff;border-radius:18px;padding:18px;box-shadow:0 10px 30px rgba(15,23,42,.06)}
  .label{font-size:12px;color:#64748b}
  .value{font-size:28px;font-weight:800;margin-top:6px}
  .panel{background:#fff;border-radius:22px;padding:22px;box-shadow:0 12px 40px rgba(15,23,42,.08)}
  .pill{display:inline-block;padding:6px 10px;border-radius:999px;font-size:11px;font-weight:700}
  .row{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid #eef2f7}
  .btn{display:inline-block;padding:12px 18px;border-radius:14px;font-weight:700;color:#fff;background:${accent}}
  .map{height:420px;border-radius:22px;background:linear-gradient(160deg,#dbeafe,#ecfccb,#fde68a);position:relative;overflow:hidden}
  .pin{position:absolute;width:14px;height:14px;border-radius:50%;background:${accent};box-shadow:0 0 0 8px ${accent}33}
  </style></head><body>${children}</body></html>`;
}

function mockPayDashboard() {
  return shell(`
    <div class="top"><div class="brand">TabisPay</div><div class="nav"><span>Dashboard</span><span>Paiements</span><span>Rapports</span></div></div>
    <div class="content">
      <div class="grid cards">
        <div class="card"><div class="label">Solde du jour</div><div class="value" style="color:#10B981">2.4M XOF</div></div>
        <div class="card"><div class="label">Transactions</div><div class="value" style="color:#3B82F6">186</div></div>
        <div class="card"><div class="label">Taux succès</div><div class="value" style="color:#8B5CF6">98.7%</div></div>
        <div class="card"><div class="label">Marchands actifs</div><div class="value" style="color:#F59E0B">24</div></div>
      </div>
      <div class="panel" style="margin-top:18px">
        <div style="font-weight:800;font-size:18px;margin-bottom:12px">Activité récente</div>
        ${[
          ["Orange Money", "+45 000 XOF", "Réussi", "#10B981"],
          ["MTN MoMo", "+12 500 XOF", "Réussi", "#3B82F6"],
          ["Wave", "+8 000 XOF", "En attente", "#F59E0B"],
        ]
          .map(
            ([name, amount, status, color]) =>
              `<div class="row"><div><strong>${name}</strong><div class="label">Il y a 3 min</div></div><div style="text-align:right"><strong>${amount}</strong><div class="pill" style="background:${color}22;color:${color}">${status}</div></div></div>`
          )
          .join("")}
      </div>
    </div>
  `, "#10B981");
}

function mockPayCheckout() {
  return shell(`
    <div class="top"><div class="brand">TabisPay · Encaissement</div><div class="nav"><span>QR</span><span>Mobile Money</span></div></div>
    <div class="content" style="display:grid;grid-template-columns:1.1fr .9fr;gap:20px">
      <div class="panel">
        <div style="font-size:28px;font-weight:800">125 000 XOF</div>
        <div class="label" style="margin:8px 0 18px">Paiement commande #1842</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
          ${["Orange Money", "MTN MoMo", "Wave"]
            .map(
              (m, i) =>
                `<div class="card" style="text-align:center;border:2px solid ${i === 0 ? "#10B981" : "#e2e8f0"}"><div style="font-size:28px">${["🟠", "🟡", "🔵"][i]}</div><strong>${m}</strong></div>`
            )
            .join("")}
        </div>
        <div style="margin-top:20px" class="btn">Confirmer le paiement</div>
      </div>
      <div class="panel" style="display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(180deg,#ecfdf5,#fff)">
        <div style="width:180px;height:180px;border-radius:24px;background:#fff;border:8px solid #10B981;display:grid;place-items:center;font-size:64px">▦</div>
        <div style="margin-top:16px;font-weight:700">Scanner pour payer</div>
      </div>
    </div>
  `, "#10B981");
}

function mockPayTransactions() {
  return shell(`
    <div class="top"><div class="brand">TabisPay · Transactions</div><div class="nav"><span>Tout</span><span>Réussi</span><span>Échec</span></div></div>
    <div class="content">
      <div class="panel">
        ${[
          ["TX-9081", "Gestabiscom", "85 000 XOF", "Réussi", "#10B981"],
          ["TX-9080", "Tibus", "5 000 XOF", "Réussi", "#3B82F6"],
          ["TX-9079", "TabisRide", "2 500 XOF", "Réussi", "#F59E0B"],
          ["TX-9078", "Boutique A", "15 000 XOF", "Échec", "#EF4444"],
        ]
          .map(
            ([id, source, amount, status, color]) =>
              `<div class="row"><div><strong>${id}</strong><div class="label">${source}</div></div><div style="text-align:right"><strong>${amount}</strong><div class="pill" style="background:${color}22;color:${color}">${status}</div></div></div>`
          )
          .join("")}
      </div>
    </div>
  `, "#10B981");
}

function mockRideMap() {
  return shell(`
    <div class="top"><div class="brand">TabisRide</div><div class="nav"><span>Passager</span><span>Carte</span></div></div>
    <div class="content">
      <div class="map">
        <div class="pin" style="top:120px;left:220px"></div>
        <div class="pin" style="top:260px;left:520px;background:#F59E0B"></div>
        <div class="pin" style="top:180px;left:780px;background:#10B981"></div>
        <div class="panel" style="position:absolute;left:24px;right:24px;bottom:24px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div><div class="label">Destination</div><strong style="font-size:20px">Aéroport → Plateau</strong></div>
            <div class="btn" style="background:#F59E0B">Commander</div>
          </div>
        </div>
      </div>
    </div>
  `, "#F59E0B");
}

function mockRideBooking() {
  return shell(`
    <div class="top"><div class="brand">TabisRide · Réservation</div></div>
    <div class="content" style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div class="panel">
        <div class="label">Départ</div><div style="font-size:22px;font-weight:800;margin:6px 0 16px">Cocody, Rue des Jardins</div>
        <div class="label">Arrivée</div><div style="font-size:22px;font-weight:800;margin:6px 0 16px">Plateau, BCEAO</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:10px">
          ${["Éco", "Confort", "Premium"]
            .map(
              (t, i) =>
                `<div class="card" style="border:2px solid ${i === 1 ? "#F59E0B" : "#e2e8f0"}"><strong>${t}</strong><div class="label">${1500 + i * 500} XOF</div></div>`
            )
            .join("")}
        </div>
      </div>
      <div class="panel" style="background:linear-gradient(180deg,#fff7ed,#fff)">
        <div class="label">Conducteur assigné</div>
        <div style="display:flex;gap:14px;align-items:center;margin:14px 0">
          <div style="width:64px;height:64px;border-radius:18px;background:#F59E0B33;display:grid;place-items:center;font-size:28px">🚗</div>
          <div><strong>Koffi A.</strong><div class="label">Toyota Corolla · 4.9★</div></div>
        </div>
        <div class="btn" style="background:#F59E0B;width:100%;text-align:center">Confirmer la course</div>
      </div>
    </div>
  `, "#F59E0B");
}

function mockRideDriver() {
  return shell(`
    <div class="top"><div class="brand">TabisRide · Conducteur</div><div class="nav"><span>En ligne</span></div></div>
    <div class="content">
      <div class="grid cards">
        <div class="card"><div class="label">Courses du jour</div><div class="value" style="color:#F59E0B">12</div></div>
        <div class="card"><div class="label">Gains</div><div class="value" style="color:#10B981">48 500 XOF</div></div>
        <div class="card"><div class="label">Note</div><div class="value" style="color:#3B82F6">4.9</div></div>
        <div class="card"><div class="label">Temps actif</div><div class="value" style="color:#8B5CF6">6h20</div></div>
      </div>
      <div class="panel" style="margin-top:18px;background:linear-gradient(135deg,#fff7ed,#fff)">
        <div class="row"><div><strong>Nouvelle course</strong><div class="label">Marcory → Treichville</div></div><div class="btn" style="background:#F59E0B">Accepter</div></div>
      </div>
    </div>
  `, "#F59E0B");
}

function mockGestabisDashboard() {
  return shell(`
    <div class="top" style="background:linear-gradient(135deg,#4c5d8b,#8B5CF6)"><div class="brand">Gestabis</div><div class="nav"><span>Dashboard</span><span>Entreprises</span><span>Opérations</span></div></div>
    <div class="content">
      <div class="grid cards">
        <div class="card"><div class="label">Installations</div><div class="value" style="color:#8B5CF6">12</div></div>
        <div class="card"><div class="label">Produits</div><div class="value" style="color:#3B82F6">345</div></div>
        <div class="card"><div class="label">Commandes</div><div class="value" style="color:#10B981">28</div></div>
        <div class="card"><div class="label">Chambres</div><div class="value" style="color:#F59E0B">3</div></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">
        <div class="panel" style="background:linear-gradient(180deg,#fee2e2,#fff)"><strong>Ventes</strong><div style="height:120px;margin-top:12px;border-radius:16px;background:linear-gradient(90deg,#ef4444,#f59e0b)"></div></div>
        <div class="panel" style="background:linear-gradient(180deg,#dcfce7,#fff)"><strong>Achats</strong><div style="height:120px;margin-top:12px;border-radius:16px;background:linear-gradient(90deg,#10b981,#3b82f6)"></div></div>
      </div>
    </div>
  `, "#8B5CF6");
}

function mockGestabisProducts() {
  return shell(`
    <div class="top" style="background:linear-gradient(135deg,#4c5d8b,#8B5CF6)"><div class="brand">Gestabis · Produits</div></div>
    <div class="content">
      <div class="panel">
        ${[
          ["Aliment bétail 50kg", "Stock 42", "18 500 XOF", "#10B981"],
          ["Semences maïs", "Stock 120", "4 200 XOF", "#3B82F6"],
          ["Engrais NPK", "Stock 18", "12 000 XOF", "#F59E0B"],
          ["Poussins", "Stock 250", "1 500 XOF", "#8B5CF6"],
        ]
          .map(
            ([name, stock, price, color]) =>
              `<div class="row"><div><strong>${name}</strong><div class="label">${stock}</div></div><div style="text-align:right"><strong>${price}</strong><div class="pill" style="background:${color}22;color:${color}">Actif</div></div></div>`
          )
          .join("")}
      </div>
    </div>
  `, "#8B5CF6");
}


function statusPill(label, color) {
  return `<div class="pill" style="background:${color}22;color:${color}">${label}</div>`;
}

function mockCourrierDashboard() {
  return shell(`
    <div class="top"><div class="brand">Tibus Courrier</div><div class="nav"><span>Guichet</span><span>Embarquement</span><span>Remises</span><span>Rapports</span></div></div>
    <div class="content">
      <div class="grid cards">
        <div class="card"><div class="label">Colis enregistrés</div><div class="value" style="color:${ROSE}">148</div></div>
        <div class="card"><div class="label">Embarqués</div><div class="value" style="color:#3B82F6">121</div></div>
        <div class="card"><div class="label">Remis au destinataire</div><div class="value" style="color:#10B981">96</div></div>
        <div class="card"><div class="label">Recette du jour</div><div class="value" style="color:#F59E0B">742 500 XOF</div></div>
      </div>
      <div class="panel" style="margin-top:18px">
        <div style="font-weight:800;font-size:18px;margin-bottom:12px">Derniers envois</div>
        ${[
          ["CR-20417", "Lomé → Abidjan · 2 colis, 14 kg", "Embarqué", "#3B82F6"],
          ["CR-20416", "Lomé → Cotonou · Enveloppe", "Remis", "#10B981"],
          ["CR-20415", "Lomé → Ouagadougou · 1 carton", "Emballé", ROSE],
          ["CR-20414", "Lomé → Accra · 3 colis, 22 kg", "En transit", "#F59E0B"],
        ]
          .map(
            ([id, route, status, color]) =>
              `<div class="row"><div><strong>${id}</strong><div class="label">${route}</div></div>${statusPill(status, color)}</div>`
          )
          .join("")}
      </div>
    </div>
  `, ROSE);
}

function mockCourrierScan() {
  return shell(`
    <div class="top"><div class="brand">Tibus Courrier · Embarquement</div><div class="nav"><span>Car TG-4521</span><span>Départ 08:30</span></div></div>
    <div class="content" style="display:grid;grid-template-columns:.9fr 1.1fr;gap:20px">
      <div class="panel" style="display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(180deg,#fff1f2,#fff)">
        <div style="width:220px;height:220px;border-radius:28px;border:6px dashed ${ROSE};display:grid;place-items:center;font-size:84px;color:${ROSE}">▦</div>
        <div style="margin-top:18px;font-weight:800;font-size:20px">Scanner l'étiquette du colis</div>
        <div class="label" style="margin-top:6px">32 / 38 colis chargés</div>
        <div style="width:260px;height:10px;border-radius:99px;background:#ffe4e6;margin-top:12px"><div style="width:84%;height:100%;border-radius:99px;background:${ROSE}"></div></div>
      </div>
      <div class="panel">
        <div style="font-weight:800;font-size:18px;margin-bottom:6px">Manifeste de chargement</div>
        ${[
          ["CR-20417", "Kossi A. → Aya K.", "Scanné", "#10B981"],
          ["CR-20412", "Afi M. → Moussa D.", "Scanné", "#10B981"],
          ["CR-20409", "Société BTP → Agence Abidjan", "Scanné", "#10B981"],
          ["CR-20405", "Yao E. → Fatou S.", "À charger", ROSE],
          ["CR-20401", "Pharma+ → Clinique Sainte-Anne", "À charger", ROSE],
        ]
          .map(
            ([id, who, status, color]) =>
              `<div class="row"><div><strong>${id}</strong><div class="label">${who}</div></div>${statusPill(status, color)}</div>`
          )
          .join("")}
      </div>
    </div>
  `, ROSE);
}

function mockCourrierReport() {
  const bars = [62, 80, 55, 91, 74, 98, 70];
  return shell(`
    <div class="top"><div class="brand">Tibus Courrier · Rapport financier</div><div class="nav"><span>Semaine</span><span>Mois</span><span>Exporter</span></div></div>
    <div class="content">
      <div class="grid cards">
        <div class="card"><div class="label">Chiffre d'affaires</div><div class="value" style="color:${ROSE}">4,8M XOF</div></div>
        <div class="card"><div class="label">Frais d'emballage</div><div class="value" style="color:#3B82F6">312 000</div></div>
        <div class="card"><div class="label">Commissions agences</div><div class="value" style="color:#F59E0B">540 000</div></div>
        <div class="card"><div class="label">Encaissé / attendu</div><div class="value" style="color:#10B981">96%</div></div>
      </div>
      <div style="display:grid;grid-template-columns:1.3fr .7fr;gap:16px;margin-top:16px">
        <div class="panel">
          <strong>Recettes par jour</strong>
          <div style="display:flex;align-items:flex-end;gap:14px;height:230px;margin-top:16px">
            ${bars.map((h, i) => `<div style="flex:1;text-align:center"><div style="height:${h * 2}px;border-radius:10px 10px 4px 4px;background:linear-gradient(180deg,${ROSE},#fb7185)"></div><div class="label" style="margin-top:6px">${["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"][i]}</div></div>`).join("")}
          </div>
        </div>
        <div class="panel">
          <strong>Par agence</strong>
          ${[["Lomé", "2,1M"], ["Abidjan", "1,4M"], ["Cotonou", "0,8M"], ["Accra", "0,5M"]]
            .map(([a, v]) => `<div class="row"><span>${a}</span><strong>${v} XOF</strong></div>`)
            .join("")}
        </div>
      </div>
    </div>
  `, ROSE);
}

function mockTistaIndex() {
  return shell(`
    <div class="top"><div class="brand">Tista</div><div class="nav"><span>Ventes</span><span>Bons</span><span>Dépenses</span><span>Bilan</span></div></div>
    <div class="content">
      <div class="grid cards">
        <div class="card"><div class="label">Litres vendus</div><div class="value" style="color:${SKY}">8 426 L</div></div>
        <div class="card"><div class="label">Ventes du jour</div><div class="value" style="color:#10B981">5,6M XOF</div></div>
        <div class="card"><div class="label">Bons consommés</div><div class="value" style="color:#F59E0B">412 000</div></div>
        <div class="card"><div class="label">Écart caisse</div><div class="value" style="color:#EF4444">-2 500</div></div>
      </div>
      <div class="panel" style="margin-top:18px">
        <div style="font-weight:800;font-size:18px;margin-bottom:6px">Relevé des index — Équipe du matin</div>
        <div class="row label" style="font-weight:700"><span style="width:18%">Pompe</span><span style="width:18%">Index début</span><span style="width:18%">Index fin</span><span style="width:14%">Litres</span><span style="width:16%">Prix/L</span><span style="width:16%;text-align:right">Montant</span></div>
        ${[
          ["P1 · Super", "1 245 310", "1 247 180", "1 870", "680", "1 271 600"],
          ["P2 · Super", "982 440", "984 015", "1 575", "680", "1 071 000"],
          ["P3 · Gasoil", "2 118 900", "2 121 460", "2 560", "675", "1 728 000"],
          ["P4 · Gasoil", "1 604 220", "1 606 641", "2 421", "675", "1 634 175"],
        ]
          .map(
            (r) =>
              `<div class="row"><strong style="width:18%">${r[0]}</strong><span style="width:18%">${r[1]}</span><span style="width:18%">${r[2]}</span><span style="width:14%">${r[3]}</span><span style="width:16%">${r[4]}</span><strong style="width:16%;text-align:right;color:${SKY}">${r[5]}</strong></div>`
          )
          .join("")}
      </div>
    </div>
  `, SKY);
}

function mockTistaVouchers() {
  return shell(`
    <div class="top"><div class="brand">Tista · Bons & cartes prépayées</div><div class="nav"><span>Émettre</span><span>Consommations</span></div></div>
    <div class="content" style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div>
        <div class="panel" style="background:linear-gradient(135deg,${SKY},#1e3a8a);color:#fff;height:210px;display:flex;flex-direction:column;justify-content:space-between">
          <div style="display:flex;justify-content:space-between"><strong style="font-size:20px">Carte prépayée Tista</strong><span>⛽</span></div>
          <div style="font-size:30px;font-weight:800;letter-spacing:2px">TST 4821 0093</div>
          <div style="display:flex;justify-content:space-between;opacity:.9"><span>Transports Adjo SARL</span><strong>Solde 185 000 XOF</strong></div>
        </div>
        <div class="panel" style="margin-top:16px">
          <strong>Émettre un bon d'essence</strong>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px">
            ${["10 000", "25 000", "50 000"].map((v, i) => `<div class="card" style="text-align:center;border:2px solid ${i === 1 ? SKY : "#e2e8f0"}"><strong>${v}</strong><div class="label">XOF</div></div>`).join("")}
          </div>
          <div class="btn" style="margin-top:14px">Générer le bon</div>
        </div>
      </div>
      <div class="panel">
        <div style="font-weight:800;font-size:18px;margin-bottom:6px">Dernières consommations</div>
        ${[
          ["BON-7731", "Super · 36,7 L", "25 000", "Consommé", "#10B981"],
          ["TST 4821", "Gasoil · 74,1 L", "50 000", "Débité", SKY],
          ["BON-7729", "Super · 14,7 L", "10 000", "Consommé", "#10B981"],
          ["BON-7728", "—", "25 000", "Émis", "#F59E0B"],
          ["TST 3310", "Gasoil · 29,6 L", "20 000", "Débité", SKY],
        ]
          .map(
            ([id, d, v, s, c]) =>
              `<div class="row"><div><strong>${id}</strong><div class="label">${d}</div></div><div style="text-align:right"><strong>${v} XOF</strong>${statusPill(s, c)}</div></div>`
          )
          .join("")}
      </div>
    </div>
  `, SKY);
}

function mockTistaBilan() {
  const line = (a, b, strong) =>
    `<div class="row"${strong ? ' style="font-weight:800"' : ""}><span>${a}</span><span>${b}</span></div>`;
  return shell(`
    <div class="top"><div class="brand">Tista · Bilan SYSCOHADA</div><div class="nav"><span>Exercice 2026</span><span>Exporter PDF</span></div></div>
    <div class="content" style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <div class="panel">
        <div style="font-weight:800;font-size:18px;margin-bottom:6px;color:${SKY}">Actif</div>
        ${line("Immobilisations corporelles (cuves, pompes)", "48 500 000")}
        ${line("Stocks de carburant", "12 840 000")}
        ${line("Créances clients (bons, cartes)", "3 215 000")}
        ${line("Trésorerie – Banque", "9 460 000")}
        ${line("Trésorerie – Caisse", "1 120 000")}
        ${line("Total actif", "75 135 000", true)}
      </div>
      <div class="panel">
        <div style="font-weight:800;font-size:18px;margin-bottom:6px;color:${SKY}">Passif</div>
        ${line("Capital social", "40 000 000")}
        ${line("Résultat net de l'exercice", "8 245 000")}
        ${line("Fournisseurs de carburant", "18 600 000")}
        ${line("Cartes prépayées non consommées", "4 890 000")}
        ${line("Dettes fiscales et sociales", "3 400 000")}
        ${line("Total passif", "75 135 000", true)}
      </div>
    </div>
  `, SKY);
}

function mockConnectSearch() {
  return shell(`
    <div class="top"><div class="brand">TiConnect</div><div class="nav"><span>Trouver un artisan</span><span>Mes demandes</span><span>Devenir artisan</span></div></div>
    <div class="content">
      <div class="panel" style="display:flex;gap:12px;align-items:center">
        <div style="flex:1;padding:14px 18px;border-radius:14px;background:#f1f5f9;color:#64748b">🔍  Plombier à Lomé, Bè</div>
        <div class="btn">Rechercher</div>
      </div>
      <div style="display:flex;gap:10px;margin:16px 0">
        ${["Plomberie", "Électricité", "Maçonnerie", "Menuiserie", "Peinture", "Climatisation"].map((m, i) => `<span class="pill" style="font-size:13px;padding:8px 14px;background:${i === 0 ? INDIGO : "#fff"};color:${i === 0 ? "#fff" : "#334155"}">${m}</span>`).join("")}
      </div>
      <div class="grid" style="grid-template-columns:repeat(3,1fr)">
        ${[
          ["Kodjo A.", "Plombier · 12 ans d'exp.", "4.9", "1,2 km"],
          ["Mawuli T.", "Plombier-sanitaire", "4.8", "2,5 km"],
          ["Edem K.", "Plombier · Chauffe-eau", "4.7", "3,1 km"],
        ]
          .map(
            ([n, m, r, d]) =>
              `<div class="card"><div style="display:flex;gap:12px;align-items:center"><div style="width:52px;height:52px;border-radius:16px;background:${INDIGO}22;display:grid;place-items:center;font-size:24px">🔧</div><div><strong>${n}</strong><div class="label">${m}</div></div></div><div style="display:flex;justify-content:space-between;margin-top:14px"><span>⭐ ${r}</span><span class="label">${d}</span></div><div class="btn" style="margin-top:12px;width:100%;text-align:center;padding:10px">Contacter</div></div>`
          )
          .join("")}
      </div>
    </div>
  `, INDIGO);
}

function mockConnectProfile() {
  return shell(`
    <div class="top"><div class="brand">TiConnect · Profil artisan</div></div>
    <div class="content" style="display:grid;grid-template-columns:.8fr 1.2fr;gap:20px">
      <div class="panel" style="text-align:center;background:linear-gradient(180deg,#eef2ff,#fff)">
        <div style="width:110px;height:110px;margin:0 auto;border-radius:32px;background:${INDIGO};display:grid;place-items:center;font-size:48px">⚡</div>
        <div style="font-size:22px;font-weight:800;margin-top:14px">Sena D.</div>
        <div class="label">Électricien bâtiment · Lomé</div>
        <div style="margin-top:10px">${statusPill("Profil vérifié", "#10B981")}</div>
        <div class="grid" style="grid-template-columns:repeat(3,1fr);margin-top:18px">
          <div><strong style="font-size:20px">4.9</strong><div class="label">Note</div></div>
          <div><strong style="font-size:20px">187</strong><div class="label">Missions</div></div>
          <div><strong style="font-size:20px">9 ans</strong><div class="label">Expérience</div></div>
        </div>
        <div class="btn" style="margin-top:18px;width:100%">Demander un devis</div>
      </div>
      <div class="panel">
        <div style="font-weight:800;font-size:18px;margin-bottom:6px">Avis clients</div>
        ${[
          ["Installation tableau électrique", "Travail propre et rapide, très professionnel."],
          ["Dépannage court-circuit", "Arrivé en moins d'une heure, problème réglé."],
          ["Câblage boutique", "Bon conseil sur le matériel, prix respecté."],
        ]
          .map(([t, c]) => `<div class="row" style="align-items:flex-start"><div><strong>${t}</strong><div class="label" style="margin-top:4px">${c}</div></div><span>⭐⭐⭐⭐⭐</span></div>`)
          .join("")}
      </div>
    </div>
  `, INDIGO);
}

function mockConnectRequests() {
  return shell(`
    <div class="top"><div class="brand">TiConnect · Mes demandes</div><div class="nav"><span>En cours</span><span>Terminées</span></div></div>
    <div class="content">
      <div class="panel">
        ${[
          ["Fuite sous évier", "Plomberie · Kodjo A.", "Artisan en route", "#3B82F6"],
          ["Peinture salon 30 m²", "Peinture · 3 devis reçus", "Devis à comparer", "#F59E0B"],
          ["Porte d'entrée à changer", "Menuiserie · Yawo B.", "Planifié jeudi", INDIGO],
          ["Prise électrique cuisine", "Électricité · Sena D.", "Terminé", "#10B981"],
        ]
          .map(
            ([t, d, s, c]) =>
              `<div class="row"><div><strong>${t}</strong><div class="label">${d}</div></div>${statusPill(s, c)}</div>`
          )
          .join("")}
      </div>
    </div>
  `, INDIGO);
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });

  for (const [folder, shots] of Object.entries(mocks)) {
    if (ONLY && !ONLY.includes(folder)) continue;
    const dir = path.join(OUT, folder);
    fs.mkdirSync(dir, { recursive: true });
    for (const shot of shots) {
      await page.setContent(shot.html, { waitUntil: "load", timeout: 10000 });
      const filePath = path.join(dir, shot.file);
      await page.screenshot({ path: filePath, type: "png" });
      console.log("MOCK OK", filePath);
    }
  }

  await browser.close();
}

main();
