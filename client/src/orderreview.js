let cart = JSON.parse(localStorage.getItem("cart")) || []

let finalPrice=JSON.parse(localStorage.getItem("finalPrice")) || 0

let final_price=document.getElementById("final_price")


window.addEventListener("load",()=>{
    showcarddata(cart)
    showtotal()
})

function showtotal(){
    final_price.textContent=finalPrice
}
function showcarddata(cart){
    let cardList=cart.map((item)=>getCard(item.id,item.image,item.name,item.price,item.strikeprice,item.quantity,item.category,item.stock)).join("")

    products1.innerHTML=cardList
}
function getCard(id,image,name,price,sprice,quantity,category,stock){
    let card=`
    <div class="card1">
    <div class="top">
        <div class="image-container">
            <img src="${image}">
        </div>
        <div class="product-details">
            <h4>${name}</h4>
            <p>${category}</p>
            <p>${stock}</p>
            <p>₹<span class="price1">${price}</span> <span class="sprice">${sprice}</span></p>
            <p>Sold By: Buddycart Retail</p>
        </div>
    </div>

    <div class="bottom">
        <div class="quantity-manage">
            
            <p id="displayQuantity${id}">Quantity:${quantity}</p>
            
        </div>
    </div>
</div>    
    `

    return card
}