'use strict'
require('dotenv').config()

const express=require('express');
const port = 3000;
const app= express();
app.use(express.json());
app.use(express.static('public'));
const stripe = require('stripe')(process.env.PRIVATE_STRIPE_KEY)

const stripeItems= new Map([
  [1,{ItemPrice:10000, name: 'Learn Stripe today'}], 
  [2,{ItemPrice:30000, name: 'Learn REACT tomorrow'}]
,])

app.post('/create-checkout', async (req,res)=>{
  try {
      const session= await stripe.checkout.sessions.create({
        payment_method_types:['card'],//transaction Types
        mode:'payment',line_items: req.body.Items.map(item=>{
          const StoreItems= storeItems.get(item.id)
          return{
            price_data:{
              currency: 'zar',
              product_data:{
                product_name: StoreItem.name
              },
              unit_price: StoreItem.ItemPrice
            },
            quanti: item.quantity
          }
        }),
        success_url:`${process.env.SERVER_URL}/success.html`,/*http://localhost:300*/
        cancel_url: `${process.env.SERVER_URL}/cancel,html`
      }
        
      
    )
    res.json({url:session.url}) 
  } catch (e) {
    res.status(500).json({error: e.massage})
  }
      })

app.listen(port)

