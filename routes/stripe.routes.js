
// Files
const router = require('express').Router();
const config = require("../config/config");

//Controller
const StripController=require("../controllers/stripe.controller")

//<---------------------------------  Routes  ------------------------------------------>
router.get("/home", async (req, res) => {
    res.render("home", { key: config.stripe.publishKey });
});
router.post("/payment",StripController.payment);
router.post("/create-customer-account",StripController.createCustomerAccount);
router.post("/add-payment-card",StripController.addPaymentCard);
router.get("/get-payment-list",StripController.listPaymentMethods);

module.exports = router