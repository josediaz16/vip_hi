import currency from 'currency.js'

const Currency = (value) => {
  return currency(value, {symbol: "COP ", separator: ".", precision: 0}).format(true)
}

export {
  Currency
}

