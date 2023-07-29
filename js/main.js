const items = [
    { id: 1, name: "Article 1", price: 10, quantity: 1, liked: false },
    { id: 2, name: "Article 2", price: 15, quantity: 1, liked: false },
    { id: 3, name: "Article 3", price: 20, quantity: 1, liked: false }
];

function renderCart() {
    const itemList = document.getElementById("item-list");
    const totalPriceElement = document.getElementById("total-price");
    let totalPrice = 0;

    
    itemList.innerHTML = "";

    items.forEach(item => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${item.name} - $${(item.price * item.quantity).toFixed(2)}</span>
            <div>
                <button class="decrement-btn" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="increment-btn" data-id="${item.id}">+</button>
                <span class="heart-button ${item.liked ? "liked" : ""}" data-id="${item.id}">&#10084;</span>
                <button class="delete-btn" data-id="${item.id}">Supprimer</button>
            </div>
        `;

        itemList.appendChild(listItem);

        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Prix total : $${totalPrice.toFixed(2)}`;

    
    addEventListeners();
}

function addEventListeners() {
    
    document.querySelectorAll(".increment-btn").forEach(button => {
        button.addEventListener("click", function () {
            const itemId = parseInt(button.getAttribute("data-id"));
            const item = items.find(item => item.id === itemId);

            if (item) {
                item.quantity++;
                renderCart();
            }
        });
    });

    
    document.querySelectorAll(".decrement-btn").forEach(button => {
        button.addEventListener("click", function () {
            const itemId = parseInt(button.getAttribute("data-id"));
            const item = items.find(item => item.id === itemId);

            if (item && item.quantity > 1) {
                item.quantity--;
                renderCart();
            }
        });
    });

    
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            const itemId = parseInt(button.getAttribute("data-id"));
            const itemIndex = items.findIndex(item => item.id === itemId);

            if (itemIndex !== -1) {
                items.splice(itemIndex, 1);
                renderCart();
            }
        });
    });

    
    document.querySelectorAll(".heart-button").forEach(button => {
        button.addEventListener("click", function () {
            const itemId = parseInt(button.getAttribute("data-id"));
            const item = items.find(item => item.id === itemId);

            if (item) {
                item.liked = !item.liked;
                button.classList.toggle("liked", item.liked);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    renderCart();
});
