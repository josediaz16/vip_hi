import React from 'react'

const RadioGroup = ({options, name, currentValue, onChange}) => {
  return options.map(({label, value}, index) => {
    const isChecked = currentValue === value

    return (
      <div className="radioOption">
        <input
          key={index}
          type="radio"
          value={value}
          name={name}
          checked={isChecked}
          onChange={onChange}
        />
        <label>{label}</label>
      </div>
    )
  })
}

export default RadioGroup
