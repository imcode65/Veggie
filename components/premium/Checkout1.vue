<template>
    <div class="pay-panel">
        <form 
            style="display: block;"
            accept-charset="UTF-8"
            class="require-validation" 
            data-cc-on-file="false" 
            :data-stripe-publishable-key="publishableKey" 
            id="payment-form" 
            method="post"
            @submit.prevent="stripeSubmitHandler"
        >
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class='form-group required'>
                            <label for="cardnumber">カード番号</label>
                            <div id="cardnumber" class='form-control card-number' ></div>
                            <!-- <input autocomplete='off' id="cardnumber" name="cardnumber" class='form-control card-number' size='20' type='text' placeholder='1234 1234 1234 1234'> -->
                            <small id="cardnumber-valid" class="form-text text-muted"></small>
                        </div>
                    </div>
                    <div class='col-6 form-group cvc required'>
                        <label class='cvc'>CVC</label>
                        <div id="cvc" class='form-control card-cvc'></div>
                        <!-- <input autocomplete='off' id="cvc" name="cvc" class='form-control card-cvc' placeholder='ex. 311' size='4' type='text'> -->
                        <small id="cvc-valid" class="form-text text-muted"></small>
                    </div>
                    <div class='col-6 form-group expiration required'>
                        <label class='expiration'>有効期限</label>
                        <div id="expiration" class='form-control card-expiry-month'></div>
                        <!-- <input id="expiration" name="expiration" class='form-control card-expiry-month' placeholder='MM / YY' size='2' type='text'> -->
                        <small id="expiration-valid" class="form-text text-muted"></small>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-check form-check-inline" style="margin-right: 0;">
                    <input class="form-check-input" type="checkbox" id="autoPay" value="option2"/>
                    <label class="form-check-label" for="autoPay"><a href="<?= base_url() ?>/terms-of-use" target="_blank">利用規約</a>と<a href="<?= base_url() ?>/privacy-policy" target="_blank">プライバシーポリシー</a>に同意する</label>
                </div>
            </div>
            <div class='col-md-12 form-group'>
                <button class='form-control btn btn-primary submit-button' type='submit'>
                    <div class="loading-hidden">Pay <span class="ml-auto-ani">»</span></div>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
// import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
  components: {
    // StripeCheckout,
  },
  data () {
    this.publishableKey = process.env.STRIPE_PK;
    return {
      loading: false,
      cardnumber: "",
    };
  },
  methods: {
    stripeSubmitHandler() {

    }
  },
  mounted() {
    if (this.$stripe) {
        const elements = this.$stripe.elements();
        //   const card = elements.create('card', {});
        //   // Add an instance of the card Element into the `card-element` <div>
        //   card.mount('#card-element');
        var style = {
            base: {
                fontWeight: 400,
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                lineHeight: '1.4',
                color: '#555',
                backgroundColor: '#fff',
                '::placeholder': {
                    color: '#888',
                },
            },
            invalid: {
                color: '#eb1c26',
            }
        };
        var cardElement = elements.create('cardNumber', {
            style: style
        });
        
        cardElement.mount('#payment-form div#cardnumber');

        var exp = elements.create('cardExpiry', {
            'style': style
        });
        exp.mount('#payment-form div#expiration');

        var cvc = elements.create('cardCvc', {
            'style': style
        });
        cvc.mount('#payment-form div#cvc');

        let card = cardElement;

    }
  }
};
</script>

<style scoped>
.pay-panel {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    min-width: 500px;
    margin-top: 1rem;
    margin-bottom: 2rem;
    font-size: 1.5rem;
}
.pay-panel #card-element {
    border: 1px solid gray;
}
.ml-auto-ani {
  animation-duration: 1s;
  animation-name: changeML;
  animation-iteration-count: infinite;
}
@keyframes changeML {
  from {
    margin-left: 0;
  }

  to {
    margin-left: 1rem;
  }
}
</style>