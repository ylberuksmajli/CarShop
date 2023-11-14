var defaultItems = [
    { id: 1, make: 'Mercedes', model: 'C-Class', price: 50000, image: 'img/cclass.jpeg' },
    { id: 2, make: 'Mercedes', model: 'E-Class', price: 60000, image: 'img/eclass.jpeg' },
    { id: 3, make: 'Mercedes', model: 'S-Class', price: 80000, image: 'img/sclass.jpeg' },
    { id: 4, make: 'Mercedes', model: 'GLC', price: 45000, image: 'img/glc.jpeg' },
    { id: 5, make: 'Mercedes', model: 'GLE', price: 70000, image: 'img/gle.jpeg' },
    { id: 6, make: 'Mercedes', model: 'GT', price: 90000, image: 'img/gt.jpeg' },
];

var cart = [];
var displayedItems = defaultItems; 


function addToCart(itemId) {
    var itemDetails = getItemDetails(itemId);
    cart.push(itemDetails);
    updateCartDisplay();
}


function updateCartDisplay() {
    var cartItemsElement = document.getElementById('cart-items');
    var totalPriceElement = document.getElementById('total-price');
    var total = 0;

  
    cartItemsElement.innerHTML = '';


    cart.forEach(function (item, index) {
        var cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <h3>${item.make} ${item.model}</h3>
            <img src="${item.image}" alt="${item.make} ${item.model}" style="width: 300px; height: 200px;">
            <p>Price: $${item.price}</p>
        `;

        
        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function () {
            removeCartItem(index);
        };

        cartItem.appendChild(removeButton);
        cartItemsElement.appendChild(cartItem);

       
        total += item.price;
    });

    
    totalPriceElement.textContent = total.toFixed(2);
}


function removeCartItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}


function checkout() {
    alert('Checkout complete!');
    cart = [];
    updateCartDisplay();
}


function getItemDetails(itemId) {
   return defaultItems.find(item => item.id === itemId);
}


function addCustomCar() {
    var makeInput = document.getElementById('add-make');
    var modelInput = document.getElementById('add-model');
    var priceInput = document.getElementById('add-price');
    var imageInput = document.getElementById('add-image');

    var make = makeInput.value;
    var model = modelInput.value;
    var price = parseFloat(priceInput.value);
    var image = imageInput.value;

    if (make && model && !isNaN(price) && price > 0 && image) {
        var customCar = { id: generateRandomId(), make: make, model: model, price: price, image: image };
        displayedItems.push(customCar); 
        displayItems();
        updateCartDisplay(); 

    
        makeInput.value = '';
        modelInput.value = '';
        priceInput.value = '';
        imageInput.value = '';
    } else {
        alert('Please enter valid car details.');
    }
}



function applyFilters() {
    var filterName = document.getElementById('filter-name').value.toLowerCase();
    var filterMinPrice = parseFloat(document.getElementById('filter-min-price').value);
    var filterMaxPrice = parseFloat(document.getElementById('filter-max-price').value);

 
    displayedItems = defaultItems.filter(function (item) {
        var nameMatches = (item.make + ' ' + item.model).toLowerCase().includes(filterName);
        var priceInRange = (!filterMinPrice || item.price >= filterMinPrice) &&
            (!filterMaxPrice || item.price <= filterMaxPrice);
        return nameMatches && priceInRange;
    });

    
    displayItems();
}

function resetFilters() {
    displayedItems = defaultItems;
    document.getElementById('filter-name').value = '';
    document.getElementById('filter-min-price').value = '';
    document.getElementById('filter-max-price').value = '';
    displayItems();
}


function displayItems() {
    var productList = document.getElementById('default-items');
    productList.innerHTML = ''; 

    displayedItems.forEach(function (item) {
        var productItem = document.createElement('div');
        productItem.innerHTML = `
            <h3>${item.make} ${item.model}</h3>
            <img src="${item.image}" alt="${item.make} ${item.model}" style="width: 300px; height: 200px;">
            <p>Price: $${item.price}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });
}

function generateRandomId() {
    return Math.floor(Math.random() * 1000) + 1000;
}
displayItems();