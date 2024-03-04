# Liam Ball Quiz Submission

This is a Shopify app that extends the functionality of the checkout.


## Conditional Payment Gateway

The `app.payment-customization.$functionId.$id.jsx` file in `/routes` describes a user interface where a merchant can select which products are elidgable for the Afterpay payment gateway.

An array of enabled Product IDs are saved and loaded in the PaymentCustomisation metafield to persist selections.

The `payment-customization-js` folder contains the `run.js` file, which runs when checkout is initiated.
It loads the PaymentCustomisation metafield value, and checks if all products in the cart are elidgable.
If not all products are, then the Afterpay payment gateway is hidden, otherwise it is visible.


## Styling Checkout Headings
This was acheived using the GrahpIQL app, running the following mutation:

```graphql
mutation checkoutBrandingUpsert($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
  checkoutBrandingUpsert(checkoutBrandingInput: $checkoutBrandingInput, checkoutProfileId: $checkoutProfileId) {
    checkoutBranding {
     customizations {
        headingLevel1 {
          typography {
            size
            letterCase
            weight
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

with variables:
```
{
  "checkoutProfileId": "gid://shopify/CheckoutProfile/YOUR_CHECKOUT_PROFILE_ID_HERE",
  "checkoutBrandingInput": {
    "customizations": {
      "headingLevel1": {
        "typography": {
          "size": "LARGE",
          "letterCase": "UPPER",
          "weight": "BOLD"
        }
      }
    }
  }
}
```