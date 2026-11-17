/*panier*/
const products = [
  { id: "bouquet", name: "Bouquet Rosée du matin", detail: "Roses, lisianthus et eucalyptus", note: "Taille M · Papier naturel", price: 39, qty: 1, image: "rose-image", alt: "Bouquet de roses roses" },
  { id: "vase", name: "Vase en verre", detail: "Verre transparent · Taille classique", note: "Un joli complément", price: 12, qty: 1, image: "vase-image", alt: "Vase en verre transparent" }
];

const DELIVERY = 5.9;
let discountRate = 0;  


function euro(number) {
  return number.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function show() {
  let html = "";
  let count = 0;
  let subtotal = 0;

  for (const item of products) {
    count = count + item.qty;
    subtotal = subtotal + item.price * item.qty;

    html += `
      <article class="basket-item">
        <div class="product-image ${item.image}" role="img" aria-label="${item.alt}"></div>
        <div class="product-info">
          <h3>${item.name}</h3>
          <p>${item.detail}</p>
          <span class="product-note">${item.note}</span>
          <div class="quantity-control">
            <button type="button" onclick="changeQty('${item.id}', -1)">−</button>
            <span>${item.qty}</span>
            <button type="button" onclick="changeQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <strong class="item-price">${euro(item.price * item.qty)}</strong>
      </article>`;
  }

  if (products.length === 0) {
    html = "<p>Votre panier est vide.</p>";
  }

  const delivery = products.length > 0 ? DELIVERY : 0;
  const discount = subtotal * discountRate;
  const total = subtotal - discount + delivery;

  document.getElementById("basketItems").innerHTML = html;
  document.getElementById("headerCount").textContent = count;
  document.getElementById("itemCount").textContent = count + (count > 1 ? " articles" : " article");
  document.getElementById("subtotal").textContent = euro(subtotal);
  document.getElementById("deliveryPrice").textContent = euro(delivery);
  document.getElementById("discountAmount").textContent = "−" + euro(discount);
  document.getElementById("discountLine").hidden = discount === 0; // cachée si pas de remise
  document.getElementById("grandTotal").textContent = euro(total);
}


function changeQty(id, change) {
  const item = products.find(product => product.id === id);
  item.qty = item.qty + change;

  // Quantité à 0 : on retire le produit du panier
  if (item.qty <= 0) {
    products.splice(products.indexOf(item), 1);
  }
  show();
}


document.getElementById("applyPromo").addEventListener("click", function () {
  const code = document.getElementById("promoCode").value.trim().toUpperCase();
  const message = document.getElementById("promoMessage");

  if (code === "FLEUR10") {
    discountRate = 0.1;
    message.textContent = "Code appliqué : −10 %.";
  } else {
    discountRate = 0;
    message.textContent = "Code non reconnu. Essayez FLEUR10.";
  }
  show();
});


const messageField = document.querySelector("textarea[name='message']");
messageField.addEventListener("input", function () {
  document.getElementById("messageCount").textContent = messageField.value.length;
});


const dateField = document.querySelector("input[name='deliveryDate']");
dateField.min = new Date().toISOString().slice(0, 10);


function confirmOrder(event) {
  if (event) event.preventDefault(); 

  const form = document.getElementById("checkoutForm");

  if (products.length === 0) {
    alert("Votre panier est vide.");
    return;
  }
  if (!form.reportValidity()) return; // champs obligatoires mal remplis : on s'arrête

  const firstName = form.elements["firstName"].value;
  const total = document.getElementById("grandTotal").textContent;

  document.getElementById("successDetails").textContent =
    "Merci " + firstName + " ! Le total estimé est de " + total + ".";
  document.getElementById("successMessage").hidden = false;
}

document.getElementById("checkoutForm").addEventListener("submit", confirmOrder);
document.getElementById("summarySubmit").addEventListener("click", confirmOrder);

document.getElementById("editOrder").addEventListener("click", function () {
  document.getElementById("successMessage").hidden = true;
});

show();
