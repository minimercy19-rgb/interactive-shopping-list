 let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

const form = document.getElementById("add-form");
const listEl = document.getElementById("shopping-list");
const selectedTotalEl = document.getElementById("selected-total");
const allTotalEl = document.getElementById("all-total");
const clearBtn = document.getElementById("clear-list");
 
function saveList() {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}
 
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

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.purchased;
        checkbox.addEventListener("click", function () {
            togglePurchased(index);
        });

        const nameSpan = document.createElement("span");
        nameSpan.className = "name";
        nameSpan.textContent = item.name;

        const priceSpan = document.createElement("span");
        priceSpan.className = "price";
        nameSpan.textContent = "Ksh " + Number(item.price).toFixed(2);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", function () {
            editItem(index);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function () {
            deleteItem(index);
        });

        li.appendChild(checkbox);
        li.appendChild(nameSpan);
        li.appendChild(priceSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        listEl.appendChild(li);
    });

    showTotals();
    saveList(); 
}
 
function togglePurchased(index) {
    shoppingList[index].purchased = !shoppingList[index].purchased;
    displayItems();
}
 
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

displayItems();