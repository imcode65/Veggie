<template>
    <div>
        <button
            class="veggie-button"
            @click="buy"
        >プレミアムを購入する</button>
        <div class="container" style="border-top: 1px solid #E48F6B;flex-direction: column;display: flex;">
            <div class="row">
                <div class="col-sm-4 border-r" style="background-color: #76C076;">Profit 1</div>
                <div class="col-sm-8">Temp Temp Temp Temp Temp Temp Temp Temp Temp Temp Temp Temp Temp Temp </div>
            </div>
            <div class="row" style="border-top: 1px solid #76C076">
                <div class="col-sm-4 border-r" style="background-color: #E48F6B;">Profit 2</div>
                <div class="col-sm-8">Temp Temp Temp Temp Temp Temp Temp Temp Temp Temp Temp Temp Temp Temp </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        async buy() {
            try {
                this.loading = true;
                const { data } = await this.$axios.post("/api/checkout/index", {
                    order: {
                        name: "プレミアム会員",
                        description: "プレミアム会員！投げ銭を受け取れるようになる",
                        amount: 398,
                        currency: "JPY",
                        quantity: 1,
                    },
                });
                localStorage.setItem("veggie_paying", true);
                this.stripe.redirectToCheckout({ sessionId: data.id });
            } catch (err) {
                alert(err);
                this.loading = false;
            }
        }
    },
    mounted() {
        this.stripe = Stripe(process.env.STRIPE_PK);
        localStorage.removeItem("veggie_paying", true);
    },
}
</script>
<style scoped>
.veggie-button {
    background-color: #E48F6B;
    border-radius: 1rem;
    margin: auto;
    display: flex;
    padding: 1rem;
}
.border-r {
    border-right: #E48F6B;
}
</style>