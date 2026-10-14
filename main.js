 let shoppingList = [];

const form = document.getElementById("add-form");
const listEl = document.getElementById("shopping-list");
const selectedTotalEl = document.getElementById("selected-total");
const allTotalEl = document.getElementById("all-total");
const clearBtn = document.getElementById("clear-list");

function showTotals() {
    let selected = 0;
    let all = 0;

    for (let i = 0; i < shoppingList.length; i++) {
        const price = Number(shoppingList[i].price);
        all += price;

        if (shoppingList[i].purchased === true) {
            selected += price;
        }
    }

    selectedTotalEl.textContent = "Ksh " + selected.toFixed(2);
    allTotalEl.textContent = "Ksh " + all.toFixed(2);
}

function displayItems() {
    listEl.innerHTML = "";

    shoppingList.forEach((item, index) => {
        const li = document.createElement("li");

        if (item.purchased) {
            li.classList.add("purchased");
        }

        li.innerHTML = `
            <input type="checkbox" ${item.purchased ? "checked" : ""} onclick="togglePurchased(${index})">
            <span class="name">${item.name}</span>
            <span class="price">Ksh ${Number(item.price).toFixed(2)}</span>
            <button onclick="editItem(${index})">Edit</button>
            <button onclick="deleteItem(${index})">Delete</button>
        `;

        listEl.appendChild(li);
    });

    showTotals();
}
 
function togglePurchased(index) {
    shoppingList[index].purchased = !shoppingList[index].purchased;
    displayItems();
}

// Edit an item
function editItem(index) {
    const item = shoppingList[index];

    const newName = prompt("Edit item name:", item.name);
    if (newName === null) return;

    const newPrice = prompt("Edit price:", item.price);
    if (newPrice === null) return;

    if (newName.trim() !== "" && !isNaN(newPrice) && Number(newPrice) >= 0) {
        shoppingList[index].name = newName.trim();
        shoppingList[index].price = Number(newPrice);
        displayItems();
    }
}

function deleteItem(index) {
    shoppingList.splice(index, 1);
    displayItems();
}
 
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("product").value.trim();
    const price = parseFloat(document.getElementById("price").value);

    if (name === "" || isNaN(price) || price < 0) {
        return;
    }

    shoppingList.push({
        name: name,
        price: price,
        purchased: false
    });

    form.reset();
    displayItems();
});
 
clearBtn.addEventListener("click", function () {
    if (confirm("Clear the entire list?")) {
        shoppingList = [];
        displayItems();
    }
});