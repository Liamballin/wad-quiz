// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 * @typedef {import("../generated/api").HideOperation} HideOperation
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  console.log("input", input);
  // Define a type for your configuration, and parse it from the metafield
  /**
   * @type {{
   *   paymentMethodName: string
   *   cartTotal: number
   * }}
   */
  const configuration = JSON.parse(
    input?.paymentCustomization?.metafield?.value ?? "{}"
  );
  //   if (!configuration.paymentMethodName || !configuration.cartTotal) {
  //     return NO_CHANGES;
  //   }

  const {cart, paymentMethods, paymentCustomization} = input;

  const enabled = paymentCustomization?.metafield?.value ?? []
  

  const cart_ids = cart?.lines?.map(l => l?.merchandise?.product?.id)
  const cart_elidgible = cart_ids.every(id => enabled.includes(id))

  console.error('cart_ids', JSON.stringify(cart_ids))
  console.error("cart_elidgible", cart_elidgible)
  console.error('enabled', JSON.stringify(enabled))

//   console.log(cart, paymentMethods, paymentCustomization)

//   const cartTotal = parseFloat(input.cart.cost.totalAmount.amount ?? "0.0");
  // Use the configured cart total instead of a hardcoded value
//   if (cartTotal < configuration.cartTotal) {
//     console.error(
//       "Cart total is not high enough, no need to hide the payment method."
//     );
//     return NO_CHANGES;
//   }

  // Use the configured payment method name instead of a hardcoded value
  const hidePaymentMethod = input.paymentMethods.find((method) =>
    method.name.includes('Afterpay')
  );

  if(!hidePaymentMethod){
    console.error("No payment method found with the name 'Afterpay'.")
  }

    // if()

  if (cart_elidgible) {
    return NO_CHANGES;
  }

  return {
    operations: [
      {
        hide: {
          paymentMethodId: hidePaymentMethod?.id,
        },
      },
    ],
  };
}
