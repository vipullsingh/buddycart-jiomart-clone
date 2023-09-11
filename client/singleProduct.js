  let srcBtn = document.getElementById("pinSearchBtn")
    let searchInput = document.getElementById("pinSearchInput")
    let display = document.getElementById("place")
    let estimatedDate = document.getElementById("estimatedDate")
    let singleItem = JSON.parse(localStorage.getItem("singleProduct")) 
    let mainContainer = document.querySelector(".singlePageContainer")

    
    let cart = JSON.parse(localStorage.getItem("cart")) || []

    // console.log(singleItem)

    let addBtn = document.getElementById("addBtn")
    addBtn.addEventListener("click",()=>{
        if(checkDuplicate(singleItem.id)){
            cart.push({...singleItem,quantity:1})
            localStorage.setItem("cart",JSON.stringify(cart))
            console.log("Added to the cart")
            Swal.fire(
                'Added to Cart!',
                'You are one step ahead of buying the Product!',
                'success'
              )
        }else{
            console.log("Already Present in the cart")
            Swal.fire(
                'Item is already present in the cart!',
                'Go to the cart page!',
                'error'
              )
        }
    })

    let img1 = document.querySelector("#img1")
    let img2 = document.querySelector("#img2")
    let img3 = document.querySelector("#img3")

    let itemName = document.getElementById("itemName")
    let itemPrice = document.getElementById("itemPrice")
    let discoutnt = document.getElementById("discoutnt")
    let itemMRP = document.getElementById("itemMRP")

    window.addEventListener("load",()=>{
        img1.src = singleItem.image
        img2.src = singleItem.image
        img3.src = singleItem.image
        itemName.textContent = singleItem.name
        
        itemPrice.textContent = `₹ ${singleItem.price}`
        discoutnt.textContent = `${Math.floor((singleItem.strikeprice-singleItem.price)/singleItem.strikeprice*100)}% Off`
        
        itemMRP.textContent = singleItem.strikeprice;

    })

    srcBtn.addEventListener("click",()=>{
        let toSearch = searchInput.value;
        // console.log()
        if(toSearch === ""){
            display.textContent = "Please provide a pin"
        
        }else
        {
            fetch(`https://api.postalpincode.in/pincode/${toSearch}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data.length)
                // console.log(data[0].PostOffice[0].Name)
                if(data[0].PostOffice.length){
                    let toShow = `${data[0].PostOffice[0].Name}, ${data[0].PostOffice[0].Block}, ${data[0].PostOffice[0].Circle}`
                    display.textContent = toShow

                Date.prototype.addDays = function(days) {
                    let DOW = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
                    var date = new Date(this.valueOf());
                    if((date.getDay()+3)<7){
                        var day = DOW[date.getDay()+3]
                    }else{
                        var day = DOW[Math.abs(7-(date.getDay()+3))]
                    }
                    console.log(day)
                    let res = ` <b>${date.getDate()+days}-${date.getMonth()}-${date.getFullYear()+1} (${day})</b>`
                    return res;
                }

                var date = new Date();

                estimatedDate.innerHTML = `Estimated delivery date is : ${date.addDays(3)}.`
                }
            }).catch(err =>{
                display.textContent = "Please Enter a correct Pin"
            })
        }
    })


    function checkDuplicate(id){
        // console.log(cart)
        for(let i=0;i<cart.length;i++){
            // console.log(cart[i])
            if(cart[i].id == id){
                return false
            }
        }
        return true
        }
    
