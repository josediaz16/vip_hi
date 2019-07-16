import React from 'react'

const RadioGroup = ({options, name, currentValue, onChange}) => {
  return (
    <div className="radio-group">
      {
        options.map(({label, value}, index) => {
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
                id={`${name}_${index}`}
              />
              <label className="radio-label" htmlFor={`${name}_${index}`}></label>
              <label>{label}</label>
            </div>
          )
        })
      }
    </div>
  )
}

export default RadioGroup
