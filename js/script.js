const orderPopup = document.getElementById("orderPopup");

const navbarOrderBtn = document.getElementById("openOrderPopup");
const heroOrderBtn = document.getElementById("heroOrderBtn");

const closeOrderPopup = document.getElementById("closeOrderPopup");
const closePopupBtn = document.getElementById("closePopupBtn");

function openPopup(e){

    e.preventDefault();

    orderPopup.classList.add("active");

}

navbarOrderBtn.addEventListener("click", openPopup);

heroOrderBtn.addEventListener("click", openPopup);

closeOrderPopup.addEventListener("click", function(){

    orderPopup.classList.remove("active");

});

closePopupBtn.addEventListener("click", function(){

    orderPopup.classList.remove("active");

});

orderPopup.addEventListener("click", function(e){

    if(e.target === orderPopup){

        orderPopup.classList.remove("active");

    }

});

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});

// Close menu when a link is clicked

const navLinks = document.querySelectorAll("#navMenu a");

navLinks.forEach(link => {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

    });

});

// add to cart button in gallery section
let cart = [];

function addToCart(name, price){

    const item = cart.find(food => food.name === name);

    if(item){

        item.quantity++;

    }else{

        cart.push({

            name:name,

            price:price,

            quantity:1

        });

    }

    updateCart();

}
function updateCart(){

    const cartItems=document.getElementById("cartItems");
    const cartTotal=document.getElementById("cartTotal");

    cartItems.innerHTML="";

    let total=0;

    cart.forEach(item=>{

        total += item.price * item.quantity;

        cartItems.innerHTML += `
        <div class="cart-item">

            <div>

                <strong>${item.name}</strong><br>

                Qty : ${item.quantity}

            </div>
<div>

    ₹${item.price * item.quantity}

    <br><br>

    <button onclick="removeItem('${item.name}')"
    class="remove-btn">

        Remove

    </button>

</div>

        </div>
        `;

    });

    cartTotal.innerHTML=`Total : ₹${total}`;

}

function removeItem(name){

    cart = cart.filter(item => item.name !== name);

    updateCart();

}


document.getElementById("checkoutForm").addEventListener("submit", function(e){

    e.preventDefault();

    const order = {

        customerName: document.getElementById("customerName").value,

        phone: document.getElementById("customerPhone").value,

        address: document.getElementById("customerAddress").value,

        items: cart

    };

    fetch("http://localhost:5000/order",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(order)

    })

    .then(res=>res.json())

    .then(data=>{

        alert(data.message);

    });

});
console.log("Script Loaded Successfully");
