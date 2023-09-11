
let form = document.getElementById("signin-form")
// let signedInName = document.getElementById("signedIn_Name")
// let signupBtn = document.getElementById("signUpBtn")
// let logout = document.getElementById("logOutBtn")
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let data = {
        email : form[0].value,
        password : form[1].value
    }
    fetchLogin(data)
    // console.log(form[0].value,form[1].value);
})
 function fetchLogin(dataInput){
    
    fetch("http://localhost:3000/RegisterUser")
    .then(res => res.json())
    .then(data=> {
        let token = false
        for(let i=0;i<data.length;i++){
            if(data[i].email === dataInput.email && data[i].password === dataInput.password){
                // alert(`Welcome ${data[i].name}`)
                token = true;
                localStorage.setItem("signedOn",JSON.stringify(data[i]))
                let fName = data[i].name.split(' ')[0]
                localStorage.setItem("LoggedName",JSON.stringify(fName))

                window.location.href = "./index.html"
            }
        }
        if(!token){
            alert("Wrong Credentials!!!")
        }  
    })
    .catch(err => console.log(err))
 }
