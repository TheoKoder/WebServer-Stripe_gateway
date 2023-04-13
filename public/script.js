'use strict'
const butn= document.querySelector('button')
btn.addEventListener("click",()=>{
  console.log("checkout")
  fetch('/create-checkout',{
    method: "POST",
    headers:{'Content-Type': 'application/json'/*Parsing JSON information*/
            },
    body:JSON.stringify({
      items:[ 
        {id: 1, quantity: 3},
        {id: 2, quantity: 5}
      ]    
    })
  }).then(res=>{
    if(res.ok) return res.json()/*if succesful return Json info*/
    return res.json().then(json=> Promise.reject(json))
    /*Ensures that failed JSON is compiled correct, fetch does not reject JSON*/
  })
    .then(({url})=>{
      //console.log(url)/*Used when checking if url is being POST'ed*/
      window.location=url
  })
    .catch(e=>{console.error(e.massage)/*Gets response and send user to URL*/       
  })                                    
})
