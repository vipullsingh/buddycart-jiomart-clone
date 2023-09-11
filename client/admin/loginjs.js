
    let Lsdata=[]
   fetch("http://localhost:3000/LoginAdmin").then((res)=>res.json()).then((data)=>{
    functionfecthdata(data)
   
   }).catch((err)=>{
    console.log(err)
   })
let 
   function functionfecthdata(data){
    console.log(data)
    let buttonlogin=document.getElementById("buttonlogin")
    let eml=document.getElementById("exampleInputEmail");
    let ps=document.getElementById("exampleInputPassword")
   buttonlogin.addEventListener("click",(e)=>{
    e.preventDefault()
    let flag=0
  
    let x=JSON.parse(localStorage.getItem("Name"))||"";
  
      data.forEach((ele,index)=>{ 
        if(eml.value==ele.email&&ps.value==ele.password){
           flag=1
           
           localStorage.setItem("Name",JSON.stringify(ele.name))
           return flag,x
        }
       })
      
      
       if(flag==1){
        
         window.location.assign("./Dashboard.html")
       } else if(flag==0){
        Swal.fire('Invalid...', 'You failed!', 'error')
       }
       eml.value=""
       ps.value=""
   })
}
