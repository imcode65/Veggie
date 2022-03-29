const stripe = require("stripe")(process.env.STRIPE_SK);
const hostUrl = "http://localhost:3000";

const index = async (params) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [params.order],
        success_url: `${hostUrl}/premium/success`,
        cancel_url: `${hostUrl}/premium/failed`
    });

    return session
};

export { index };