const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = path.join(__dirname, "../public/screenshots");

const mocks = {
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

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });

  for (const [folder, shots] of Object.entries(mocks)) {
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
