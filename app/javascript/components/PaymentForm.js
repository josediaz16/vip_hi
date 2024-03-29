import React from 'react'
import NativeInput from 'components/inputs/NativeInput'

const PaymentForm = ({t, ...props}) => {
  return (
    <div id="payment_form" className="std-box">
      <form className="darken-form" method="post" action={props.paymentUrl}>
        <h3 class="form-heading">{t.title}</h3>

        <input name="merchantId"    type="hidden" value={props.merchantId}/>
        <input name="accountId"     type="hidden" value={props.accountId}/>
        <input name="referenceCode" type="hidden" value={props.referenceCode}/>
        <input name="description"   type="hidden" value={props.description}/>
        <input name="amount"        type="hidden" value={props.amount}/>
        <input name="tax"           type="hidden" value="0"/>
        <input name="taxReturnBase" type="hidden" value="0"/>
        <input name="currency"      type="hidden" value="COP"/>
        <input name="signature"     type="hidden" value={props.signature}/>
        <input name="test"          type="hidden" value={props.test}/>
        <NativeInput placeholder={t.placeholders.name} defaultValue={props.name} name="buyerFullName" required/>
        <NativeInput placeholder={t.placeholders.email} type="email" name="buyerEmail" required/>
        <input name="confirmationUrl" type="hidden" value={props.confirmationUrl}/>
        <input name="responseUrl"     type="hidden" value={props.responseUrl}/>

        <button className="button-primary" type="submit">
          {t.actions.pay}
        </button>

      </form>
    </div>

  )
}

export default PaymentForm
