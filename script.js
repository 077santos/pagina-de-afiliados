const API_URL = "https://script.google.com/macros/s/AKfycbxKsFtm7-0IXS-VMCpa2ov-eDAqn7cjm2wuizPnObSoHF7AAOsroYA43PjUe_OrlfnJSg/exec";

// 🔽 CARREGAR PRODUTOS DA PLANILHA
async function loadProducts() {
    const response = await fetch(API_URL);
    const products = await response.json();

    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${product.image}">
            <h2>${product.name}</h2>
            <p class="price">R$ ${product.price}</p>
            <a href="${product.link}"
               target="_blank"
               onclick="setMobileBuy('${product.name}','${product.price}','${product.link}')">
               Ver no App
            </a>
        `;

        productList.appendChild(card);
    });
}

// 🔼 ADICIONAR PRODUTO NA PLANILHA
async function addProduct() {
    const name = productName.value.trim();
    const link = productLink.value.trim();
    const image = productImage.value.trim();
    const price = productPrice.value.trim();

    if (!name || !link || !image || !price) {
        alert("Preencha todos os campos");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ name, link, image, price })
    });

    productName.value = "";
    productLink.value = "";
    productImage.value = "";
    productPrice.value = "";

    loadProducts();
}

// 🔘 BOTÃO MOBILE
function setMobileBuy(name, price, link) {
    const btn = document.getElementById("mobileBuyButton");
    btn.href = link;
    btn.innerHTML = `🛒 Comprar <strong>${name}</strong> — R$ ${price}`;
    btn.classList.add("active");
}

// 🚀 INICIALIZA
document.addEventListener("DOMContentLoaded", loadProducts);


