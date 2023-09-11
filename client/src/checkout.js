let cart = JSON.parse(localStorage.getItem("cart")) || []
let finalPrice=JSON.parse(localStorage.getItem("finalPrice")) || 0


let payNow=document.querySelector(".Pay-now")
let COD=document.querySelector(".COD")




window.addEventListener("load",()=>{
    showtotal()
})
function showtotal(){
    final_price.textContent=finalPrice
}
payNow.addEventListener("click",()=>{
    createObj("Prepaid")
})

COD.addEventListener("click",()=>{
    createObj("COD")
})


function createObj(status){
    alert("Precessing....., Please Wait")
    let productNameArr=[],quantityArr=[]
    cart.forEach((item) => {
        productNameArr.push(item.name)
        quantityArr.push(item.quantity)
    });
    
    let obj={
        "Product": productNameArr,
        "Quantity": quantityArr,
        "OrderNO": Math.floor(100000000 + Math.random() * 900000000),
        "Address":"Nagpur,Maharashtra",
        "TotalAmount": finalPrice,
        "OrderStatus": "Successful",
        "paydetails": status,
        
    }
    checkOut(obj)
}







async function checkOut(obj){
    let postRequest=await fetch(`http://localhost:3000/checkout`,{
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res)=> console.log(res))
    // .then((response)=> {
    //     console.log(response)
    // })
    .catch((err)=> console.log(err))

}