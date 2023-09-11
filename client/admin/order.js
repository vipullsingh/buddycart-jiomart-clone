
let fetcharr=[]

async function fetchdata(){
    try {
        let res=await fetch(`http://localhost:3000/checkout`)
        let data= await res.json()
        fetcharr=data
        datafetch(data)
    } catch (error) {
        console.log(error)
    }
}

fetchdata()
let product=document.getElementById("product")
function datafetch(datafetch){
    product.innerHTML=""
    datafetch.forEach(element => {
      
        let card=document.createElement("div")
        card.setAttribute("class","card");
        let h2ordersdata=document.createElement("h2")
        h2ordersdata.innerText=element.OrderStatus
        h2ordersdata.setAttribute("class","successmsg")
        let divAdressOrder=document.createElement("div")
        divAdressOrder.setAttribute("class","address-ordeno")
         let h4ordernumber=document.createElement("h4")
         let pAddress=document.createElement("p")
         h4ordernumber.innerText=`Order-No:-${ element.OrderNO}`
         pAddress.innerText=`Address:-${element.Address}`  ;
         let divproductname_quantity=document.createElement("div");
         divproductname_quantity.setAttribute("class","product-details")
         let divforproduct=document.createElement("div")
         let h3forPNmae=document.createElement("h3")
         let h4forquantity=document.createElement("h4")
         h3forPNmae.innerText="Product-Name"
         h4forquantity.innerText="Quantity"
       
         let bag=[]
         for(let i=0;i<=element.Product.length-1;i++){
             bag.push(`<h4>${element.Product[i]}</h4><p>${element.Quantity[i]}</p>`)
            }
            console.log(bag)
           
            divforproduct.innerHTML=bag.join('')
                
           
                   
           
          
             divforproduct.setAttribute("class","divforall")
         divproductname_quantity.append(divforproduct)
         divAdressOrder.innerHTML=""
         divAdressOrder.append(h4ordernumber,pAddress)
         let divAmount=document.createElement("div")
         let ptottal=document.createElement("h3")
         ptottal.innerText="Total Amount"
         let pAmount=document.createElement("h3")
         pAmount.innerText=`₹${element.TotalAmount}`
         divAmount.append(ptottal,pAmount)
         divAmount.setAttribute("class","ammountdiv")
         let deletebutton=document.createElement("button");
         deletebutton.innerText="Delete Order"
         deletebutton.setAttribute("class","buttondelete")
         deletebutton.addEventListener("click",(e)=>{
            e.preventDefault()
            functionfordeletereq(element.id)
         })
         card.append(h2ordersdata,divAdressOrder,divproductname_quantity,divAmount,deletebutton)
         product.append(card)
    });
}



checkinginclude(fetcharr)
function checkinginclude(data){
let formdata=document.querySelector("form")
let Formby=document.getElementById("search")
formdata.addEventListener("search",(e)=>{
    e.preventDefault();
    let Formby1=Formby.value;
    let Searched=data.filter((element)=>{
        if((element.OrderNO.includes(Formby1)==true)||(element.TotalAmount.includes(Formby1)==true)){
            return true
        }else {
            return false 
        }
    })
    datafetch(Searched)
})
}




function functionfordeletereq(elem){
    fetch(`http://localhost:3000/checkout/${elem}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
    })
}


