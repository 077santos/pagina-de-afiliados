function addProduct() {
    const nameInput = document.getElementById("productName");
    const linkInput = document.getElementById("productLink");
    const imageInput = document.getElementById("productImage");
    const priceInput = document.getElementById("productPrice");

    const name = nameInput.value.trim();
    const link = linkInput.value.trim();
    const image = imageInput.value.trim();
    const price = priceInput.value.trim();

    if (!name || !link || !image || !price) {
        alert("Preencha todos os campos");
        return;
    }

    const productList = document.getElementById("productList");

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <button class="remove-btn" onclick="removeProduct(this)">✖</button>
        <img src="${image}" alt="${name}">
        <h2>${name}</h2>
        <p class="price">R$ ${price}</p>
        <a href="${link}"
           target="_blank"
           rel="noopener noreferrer"
           onclick="setMobileBuy('${name}', '${price}', '${link}')">
           Ver no App
        </a>
    `;

    productList.appendChild(card);
    saveProducts();

    nameInput.value = "";
    linkInput.value = "";
    imageInput.value = "";
    priceInput.value = "";
}

function saveProducts() {
    const cards = document.querySelectorAll(".card");
    const products = [];

    cards.forEach(card => {
        products.push({
            name: card.querySelector("h2").innerText,
            price: card.querySelector(".price").innerText.replace("R$ ", ""),
            link: card.querySelector("a").href,
            image: card.querySelector("img").src
        });
    });

    localStorage.setItem("products", JSON.stringify(products));
}

function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const productList = document.getElementById("productList");

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <button class="remove-btn" onclick="removeProduct(this)">✖</button>
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p class="price">R$ ${product.price}</p>
            <a href="${product.link}"
               target="_blank"
               rel="noopener noreferrer"
               onclick="setMobileBuy('${product.name}', '${product.price}', '${product.link}')">
               Ver no App
            </a>
        `;

        productList.appendChild(card);
    });
}

function removeProduct(button) {
    const card = button.parentElement;
    card.remove();
    saveProducts();
}

function setMobileBuy(name, price, link) {
    const btn = document.getElementById("mobileBuyButton");
    btn.href = link;
    btn.innerHTML = `🛒 Comprar <strong>${name}</strong> — R$ ${price}`;
    btn.classList.add("active");
}

document.addEventListener("DOMContentLoaded", loadProducts);

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
        .then(() => console.log("Service Worker registrado"))
        .catch(err => console.log("Erro no SW:", err));
}
