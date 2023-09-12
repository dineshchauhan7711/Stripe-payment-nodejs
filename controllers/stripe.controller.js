// files
const db = require('../config/db.config');
const config = require("../config/config");
// modules
const Validator = require('validatorjs');
const stripe = require("stripe")(config.stripe.secretKey);

async function payment(req, res) {
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Gautam Sharma',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '110092',
            city: 'New Delhi',
            state: 'Delhi',
            country: 'India',
        }
    })
        .then((customer) => {
            console.log(customer);
            // return stripe.charges.create({
            // amount: 7000, // Charing Rs 25
            // description: 'Web Development Product',
            // currency: 'USD',
            // customer: customer.id
            // });
            return stripe.PaymentIntent.create(
                {
                    customer: customer.id,
                    amount: 7000,
                    description: 'Rails Stripe transaction',
                    currency: 'usd',
                }
            )
        })
        .then(() => {
            // console.log(PaymentIntent);
            res.send("Success") // If no error occurs
        })
        .catch((err) => {
            console.log(err);
            res.send(err) // If some error occurs
        });
}
/**
 * create customer account
 */
async function createCustomerAccount(req,res){
    var response = {}
    try{
        const customer = await stripe.customers.create({
            email: req.body.email,
            name: req.body.name
        });
        response.success = true
        response.stripe_id = customer.id
        return res.json({response})
    }
    catch(e){
        console.log(e);
        response.success = false
        response.message = await ErrorHandling(e)
        return res.json({response})
    }
    
};

/**
 * Add payment card
 */
async function addPaymentCard(req,res){
    var response = {}
    try{
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card:req.body.card,
            billing_details:req.body.billing_details
        });
        await stripe.paymentMethods.attach(
            paymentMethod.id,
            {customer: req.body.customer_id}
        );
        // if(data.is_prefferd == 1){
        //     await stripe.customers.update(
        //         data.customer_id,
        //         {
        //           invoice_settings: {
        //             default_payment_method: paymentMethod.id
        //           }
        //         }
        //     );
        // }
        response.success = true
        var cardData = {
            payment_method_id: paymentMethod.id,
            is_prefferd: 1, 
        }
        response.data = cardData;
        return res.json({response})
    }
    catch(e){
        console.log(e);
        response.success = false
        response.message = await ErrorHandling(e);
        return res.json({response})

    }
    
};

/**
 * List payment methdos
 */
async function listPaymentMethods(req,res){
    var response = {}
    try{
        const customerId=req.body.customerId;
        const paymentMethods = await stripe.customers.listPaymentMethods(
            customerId,
            {type: 'card'}
          );
        response.success = true
        response.data = paymentMethods.data
        return res.json({
            response
        })
    }
    catch(e){
        console.log(e);
        response.success = false
        response.error = e
        return res.json({
            response
        })
    }
    
}


module.exports = {
    payment,
    createCustomerAccount,
    addPaymentCard,
    listPaymentMethods
};