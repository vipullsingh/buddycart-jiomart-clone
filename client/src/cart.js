let cart = JSON.parse(localStorage.getItem("cart")) || []
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

let products1=document.getElementById("products1")
let order_total=document.querySelectorAll(".order-total")
let discount=document.getElementById("discount")
let final_price=document.getElementById("final_price")
let couponForm=document.getElementById("couponForm")


window.addEventListener("load",()=>{
    showcarddata(cart)
})
let totalprice=0
let finalPrice=JSON.parse(localStorage.getItem("finalPrice")) || 0
let productDiscount=0
function showcarddata(cart){
    let cardList=cart.map((item)=>getCard(item.id,item.image,item.name,item.price,item.strikeprice,item.quantity,item.category,item.stock)).join("")
    totalprice=0
    for(let item of cart){
        totalprice+=item.price*item.quantity
    }
    order_total.forEach((item)=>item.textContent=Math.floor(totalprice)) 



    finalPrice=totalprice-Number(discount.innerText)
    
    final_price.textContent=Math.floor(finalPrice) 
    localStorage.setItem("finalPrice",JSON.stringify(finalPrice))
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
        <div>
            <a href="#" class="save-for-later" onclick="saveForlater(${id})">Save for Later</a>
        </div>
        <div class="quantity-manage">
            <button onclick="decrease(${id})">-</button>
            <p id="displayQuantity${id}">${quantity}</p>
            <button onclick="increase(${id})">+</button>
            <button class="remove" onclick="remove(${id})">x</button>
        </div>
    </div>
</div>    
    `

    return card
}

couponForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    if(couponForm.Coupon.value=="buddy20"){
        productDiscount=Math.floor(totalprice*0.2)
        discount.textContent=(productDiscount)
        finalPrice=finalPrice-productDiscount
        final_price.textContent=finalPrice
        localStorage.setItem("finalPrice",JSON.stringify(finalPrice))
    }
})

function remove(id){
    cart=cart.filter((item)=>{
        if(item.id==id){
            return false
        }else{
            return true
        }
    })
    localStorage.setItem("cart",JSON.stringify(cart))
    showcarddata(cart)
}



function increase(id){
    let quantityEl=document.getElementById(`displayQuantity${id}`)
    cart.forEach((item)=>{
        if(item.id==id){
            item.quantity++
            quantityEl.textContent=item.quantity
        }
    })
    localStorage.setItem("cart",JSON.stringify(cart))
    showcarddata(cart)
}

function decrease(id){
    let quantityEl=document.getElementById(`displayQuantity${id}`)
    cart.forEach((item)=>{
        if(item.id==id){
            item.quantity--
            quantityEl.textContent=item.quantity
            if(item.quantity==0){
                remove(id)
            }
        }
    })
    localStorage.setItem("cart",JSON.stringify(cart))
    showcarddata(cart)
}

let lateritem
function saveForlater(id){
    
    cart.forEach((item)=>{
        if(item.id==id){
            lateritem = item
            remove(id)
        }
    })
    
    wishlist.push(lateritem)
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
    alert("Item added to Wishlist ❤️")
}


