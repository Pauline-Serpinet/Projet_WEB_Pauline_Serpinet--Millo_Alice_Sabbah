// Catalogue de 30 variétés : 24 fleurs et 6 feuillages.
const plants = [
  { id: 1, name: "Rose", type: "fleur", emoji: "🌹", bg: "#f7e5e5" },
  { id: 2, name: "Tulipe", type: "fleur", emoji: "🌷", bg: "#f8e9ed" },
  { id: 3, name: "Tournesol", type: "fleur", emoji: "🌻", bg: "#fbf0d7" },
  { id: 4, name: "Marguerite", type: "fleur", emoji: "🌼", bg: "#f7f1df" },
  { id: 5, name: "Hibiscus", type: "fleur", emoji: "🌺", bg: "#f8e2e7" },
  { id: 6, name: "Fleur de cerisier", type: "fleur", emoji: "🌸", bg: "#f9e9ee" },
  { id: 7, name: "Lavande", type: "fleur", emoji: "🪻", bg: "#eee9f7" },
  { id: 8, name: "Orchidée", type: "fleur", emoji: "🏵️", bg: "#f4e8f1" },
  { id: 9, name: "Œillet", type: "fleur", emoji: "🌺", bg: "#f7e4df" },
  { id: 10, name: "Pivoine", type: "fleur", emoji: "💐", bg: "#f7e7e8" },
  { id: 11, name: "Bleuet", type: "fleur", emoji: "💠", bg: "#e6edf8" },
  { id: 12, name: "Iris", type: "fleur", emoji: "🌸", bg: "#eee8f7" },
  { id: 13, name: "Anémone", type: "fleur", emoji: "🌼", bg: "#f5eee3" },
  { id: 14, name: "Dahlia", type: "fleur", emoji: "🌺", bg: "#f8e6e4" },
  { id: 15, name: "Renoncule", type: "fleur", emoji: "🌷", bg: "#f8e9e5" },
  { id: 16, name: "Gérbera", type: "fleur", emoji: "🌼", bg: "#f8efdb" },
  { id: 17, name: "Lys", type: "fleur", emoji: "💮", bg: "#f3eee8" },
  { id: 18, name: "Delphinium", type: "fleur", emoji: "🪻", bg: "#e9eafa" },
  { id: 19, name: "Alstroemeria", type: "fleur", emoji: "🌸", bg: "#f7e9e9" },
  { id: 20, name: "Gypsophile", type: "fleur", emoji: "✳️", bg: "#f3f0e8" },
  { id: 21, name: "Cosmos", type: "fleur", emoji: "🌼", bg: "#f7e9e2" },
  { id: 22, name: "Zinnia", type: "fleur", emoji: "🌺", bg: "#f8e4e5" },
  { id: 23, name: "Mimosa", type: "fleur", emoji: "💛", bg: "#faf1d9" },
  { id: 24, name: "Pois de senteur", type: "fleur", emoji: "🩷", bg: "#f8e8ee" },
  { id: 25, name: "Eucalyptus", type: "feuillage", emoji: "🌿", bg: "#e7eee5" },
  { id: 26, name: "Fougère", type: "feuillage", emoji: "🌱", bg: "#e8f0e5" },
  { id: 27, name: "Olivier", type: "feuillage", emoji: "🫒", bg: "#edf0df" },
  { id: 28, name: "Lierre", type: "feuillage", emoji: "🍃", bg: "#e5eee3" },
  { id: 29, name: "Ruscus", type: "feuillage", emoji: "🌿", bg: "#e9eee3" },
  { id: 30, name: "Asparagus", type: "feuillage", emoji: "🌾", bg: "#edf0e6" }
];

const bouquet = new Map();
const catalogGrid = document.querySelector("#catalogGrid");
const selectionList = document.querySelector("#selectionList");
const totalCount = document.querySelector("#totalCount");
const summaryCount = document.querySelector("#summaryCount");
const remainingCount = document.querySelector("#remainingCount");
const navCount = document.querySelector("#navCount");
const bouquetStems = document.querySelector("#bouquetStems");
const confirmation = document.querySelector("#confirmation");
const MAX_STEMS = 30;
let currentFilter = "tous";

function countStems() {
  return [...bouquet.values()].reduce((sum, quantity) => sum + quantity, 0);
}

function renderCatalog() {
  const visiblePlants = plants.filter(plant =>
    currentFilter === "tous" || plant.type === currentFilter
  );

  catalogGrid.innerHTML = visiblePlants.map(plant => {
    const quantity = bouquet.get(plant.id) || 0;
    const full = countStems() >= MAX_STEMS;
    return `
      <article class="plant-card">
        <div class="plant-visual" style="--plant-bg:${plant.bg}">${plant.emoji}</div>
        <h3>${plant.name}</h3>
        <span class="plant-type">${plant.type === "fleur" ? "Fleur" : "Feuillage"}</span>
        <br>
        <button class="add-button" data-add="${plant.id}" ${full ? "disabled" : ""}>
          ${quantity ? `Ajouter · ${quantity}` : "+ Ajouter"}
        </button>
      </article>`;
  }).join("");

  catalogGrid.querySelectorAll("[data-add]").forEach(button => {
    button.addEventListener("click", () => addPlant(Number(button.dataset.add)));
  });
}

function addPlant(id) {
  if (countStems() >= MAX_STEMS) {
    confirmation.textContent = "Votre bouquet a atteint la limite de 30 tiges.";
    return;
  }
  bouquet.set(id, (bouquet.get(id) || 0) + 1);
  confirmation.textContent = "";
  renderAll();
}

function changeQuantity(id, delta) {
  const next = (bouquet.get(id) || 0) + delta;
  if (next <= 0) bouquet.delete(id);
  else if (countStems() < MAX_STEMS || delta < 0) bouquet.set(id, next);
  confirmation.textContent = "";
  renderAll();
}

function renderSelection() {
  const selected = plants.filter(plant => bouquet.has(plant.id));
  if (!selected.length) {
    selectionList.innerHTML = '<p class="empty-message">Votre bouquet est encore vide.<br>Ajoutez vos premières fleurs !</p>';
  } else {
    selectionList.innerHTML = selected.map(plant => `
      <div class="selection-row">
        <span class="selection-emoji">${plant.emoji}</span>
        <span class="selection-name">${plant.name}</span>
        <div class="quantity-controls">
          <button type="button" data-minus="${plant.id}" aria-label="Retirer une tige de ${plant.name}">−</button>
          <span class="quantity">${bouquet.get(plant.id)}</span>
          <button type="button" data-plus="${plant.id}" aria-label="Ajouter une tige de ${plant.name}" ${countStems() >= MAX_STEMS ? "disabled" : ""}>+</button>
        </div>
      </div>`).join("");
  }

  selectionList.querySelectorAll("[data-minus]").forEach(button => {
    button.addEventListener("click", () => changeQuantity(Number(button.dataset.minus), -1));
  });
  selectionList.querySelectorAll("[data-plus]").forEach(button => {
    button.addEventListener("click", () => changeQuantity(Number(button.dataset.plus), 1));
  });
}

function renderPreview() {
  const selectedEmojis = [];
  plants.forEach(plant => {
    const quantity = bouquet.get(plant.id) || 0;
    for (let i = 0; i < quantity; i++) selectedEmojis.push(plant.emoji);
  });

  if (!selectedEmojis.length) {
    bouquetStems.innerHTML = '<span class="empty-flower">✿</span>';
    return;
  }

  // Affiche un aperçu compact, même lorsque le bouquet contient 30 tiges.
  const preview = selectedEmojis.slice(0, 17);
  bouquetStems.innerHTML = preview.map((emoji, index) =>
    `<span class="stem" style="z-index:${index % 5}">${emoji}</span>`
  ).join("");
}

function renderAll() {
  const total = countStems();
  totalCount.textContent = total;
  navCount.textContent = total;
  summaryCount.textContent = `${total} ${total > 1 ? "tiges" : "tige"}`;
  remainingCount.textContent = `${MAX_STEMS - total} places disponibles`;
  renderCatalog();
  renderSelection();
  renderPreview();
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
    renderCatalog();
  });
});

document.querySelector("#resetButton").addEventListener("click", () => {
  bouquet.clear();
  confirmation.textContent = "Votre composition a été remise à zéro.";
  renderAll();
});

document.querySelector("#finishButton").addEventListener("click", () => {
  const total = countStems();
  if (!total) {
    confirmation.textContent = "Ajoutez quelques fleurs avant de valider votre bouquet.";
    return;
  }
  const details = plants
    .filter(plant => bouquet.has(plant.id))
    .map(plant => `${plant.name} × ${bouquet.get(plant.id)}`)
    .join(" · ");
  confirmation.textContent = `Votre bouquet est composé de ${total} tiges : ${details}.`;
});

renderAll();

// Panier de démonstration : données fictives et aucun envoi de données.
const products = [
  { id: "bouquet", name: "Bouquet Rosée du matin", detail: "Roses, lisianthus et eucalyptus · Taille M", price: 39, qty: 1, image: "rose-image", alt: "Bouquet de roses roses" },
  { id: "vase", name: "Vase en verre", detail: "Verre transparent · Taille classique", price: 12, qty: 1, image: "vase-image", alt: "Vase en verre transparent" }
];
const DELIVERY_FEE = 5.90;
let discount = 0;

const basketItems = document.querySelector("#basketItems");
const subtotalEl = document.querySelector("#subtotal");
const deliveryEl = document.querySelector("#deliveryPrice");
const totalEl = document.querySelector("#grandTotal");
const headerCount = document.querySelector("#headerCount");
const itemCount = document.querySelector("#itemCount");
const discountLine = document.querySelector("#discountLine");
const discountAmount = document.querySelector("#discountAmount");
const promoMessage = document.querySelector("#promoMessage");

const euro = value => value.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const totalQuantity = () => products.reduce((sum, item) => sum + item.qty, 0);
const subtotal = () => products.reduce((sum, item) => sum + item.qty * item.price, 0);

function renderBasket() {
  basketItems.innerHTML = products.length ? products.map(item => `
    <article class="basket-item">
      <div class="product-image ${item.image}" role="img" aria-label="${item.alt}"></div>
      <div class="product-info">
        <h3>${item.name}</h3>
        <p>${item.detail}</p>
        <div class="quantity-control">
          <button type="button" data-minus="${item.id}" aria-label="Retirer un ${item.name}">−</button>
          <span>${item.qty}</span>
          <button type="button" data-plus="${item.id}" aria-label="Ajouter un ${item.name}">+</button>
          <button type="button" class="remove-item" data-remove="${item.id}">Supprimer</button>
        </div>
      </div>
      <strong class="item-price">${euro(item.price * item.qty)}</strong>
    </article>`).join("") : '<p class="empty-basket">Votre panier est vide. Retournez à la création de bouquets pour composer votre sélection.</p>';

  basketItems.querySelectorAll("[data-minus]").forEach(button => button.addEventListener("click", () => updateQty(button.dataset.minus, -1)));
  basketItems.querySelectorAll("[data-plus]").forEach(button => button.addEventListener("click", () => updateQty(button.dataset.plus, 1)));
  basketItems.querySelectorAll("[data-remove]").forEach(button => button.addEventListener("click", () => removeItem(button.dataset.remove)));

  headerCount.textContent = totalQuantity();
  itemCount.textContent = `${totalQuantity()} article${totalQuantity() > 1 ? "s" : ""}`;
  updateTotals();
}

function updateQty(id, delta) {
  const item = products.find(product => product.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeItem(id);
  else renderBasket();
}

function removeItem(id) {
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) products.splice(index, 1);
  discount = 0;
  promoMessage.textContent = "Panier modifié : vérifiez votre code promo.";
  renderBasket();
}

function updateTotals() {
  const sub = subtotal();
  const delivery = products.length ? DELIVERY_FEE : 0;
  const discountValue = Math.min(discount, sub);
  subtotalEl.textContent = euro(sub);
  deliveryEl.textContent = euro(delivery);
  discountLine.hidden = discountValue === 0;
  discountAmount.textContent = `−${euro(discountValue)}`;
  totalEl.textContent = euro(Math.max(0, sub - discountValue + delivery));
}

document.querySelector("#applyPromo").addEventListener("click", () => {
  const code = document.querySelector("#promoCode").value.trim().toUpperCase();
  if (code === "FLEUR10") {
    discount = subtotal() * 0.10;
    promoMessage.textContent = "Code appliqué : −10 % sur les articles.";
    promoMessage.style.color = "#526b55";
  } else {
    discount = 0;
    promoMessage.textContent = code ? "Code non reconnu. Essayez FLEUR10." : "Saisissez un code promo.";
    promoMessage.style.color = "#a06d63";
  }
  updateTotals();
});

const messageField = document.querySelector('textarea[name="message"]');
messageField.addEventListener("input", () => {
  document.querySelector("#messageCount").textContent = messageField.value.length;
});

const dateInput = document.querySelector('input[name="deliveryDate"]');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localToday;

function submitDemo(event) {
  if (event) event.preventDefault();
  const form = document.querySelector("#checkoutForm");
  if (!products.length) {
    alert("Votre panier est vide. Ajoutez un article avant de continuer.");
    return;
  }
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const firstName = formData.get("firstName");
  const success = document.querySelector("#successMessage");
  document.querySelector("#successDetails").textContent =
    `Merci ${firstName} ! Votre récapitulatif est prêt. Le total estimé est de ${totalEl.textContent}.`;
  success.hidden = false;
  success.scrollIntoView({ behavior: "smooth", block: "center" });
}

document.querySelector("#checkoutForm").addEventListener("submit", submitDemo);
document.querySelector("#summarySubmit").addEventListener("click", submitDemo);
document.querySelector("#editOrder").addEventListener("click", () => {
  document.querySelector("#successMessage").hidden = true;
  document.querySelector("#checkoutForm").scrollIntoView({ behavior: "smooth", block: "start" });
});

renderBasket();

