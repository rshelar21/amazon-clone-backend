const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


const purchase = async (req, res) => {
    const { email, items } = req.body;


    try {
        const user = await req.user;
        console.log(user);
        const transformItems = await items?.map((item) => (
            {
                quantity : 1, 
                price_data : {
                    currency : "inr",
                    product_data : {
                        name : item.title,
                        images : [item.image],
                        description : item.description
                        ,
                    },
                    unit_amount :  100 * item.price
                }
            }
        ))

        const session = await stripe.checkout.sessions.create({
            payment_method_types : ['card'],
            shipping_address_collection : {
                allowed_countries : ['IN']
            },
            line_items : transformItems,
            mode : 'payment',
            payment_intent_data : {
                metadata : {
                    product : JSON.stringify(items.map((item) => (
                        {
                            image : item.image,
                            title : item.title
                        }
                    ))),
                    user : user?.id
                }
            },
            success_url : 'http://amazon-clone-frontend-seven.vercel.app/orders-history',
            cancel_url : 'https://amazon-clone-frontend-seven.vercel.app/'
        })
        res.status(200).json({ result : true, id : session.id})
    } catch (error) {
        res.status(500).json({ message: error.message , result : false});
    }

}

module.exports = {purchase};