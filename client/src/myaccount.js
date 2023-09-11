let add_new_address = document.getElementById("add-new-address");
let NAME = document.getElementById("NAME");
let address = document.getElementById("address");
let address_grid = document.getElementById("address-grid");

let addresses=JSON.parse(localStorage.getItem("address")) || [];


window.addEventListener("load",()=>{
    showAddressCard()
})
add_new_address.addEventListener("click",()=>{
    let obj={
        name:NAME.value,
        address: address.value
    }

    addresses.push(obj)
    localStorage.setItem("address", JSON.stringify(addresses))
    showAddressCard()
}) 

function showAddressCard(){
    let card=addresses.map((item)=> getCard(item.name,item.address)).join('')

    address_grid.innerHTML=card
}
function getCard(name,address){
    let addr=`
    <div id="address-card">
        <h5>${name}</h5>
        <p>${address}</p>
    </div>
    `
    return addr
}