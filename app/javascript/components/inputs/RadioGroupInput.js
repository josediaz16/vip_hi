import React       from 'react'
import RadioGroup  from './RadioGroup'
import NativeInput from './NativeInput'

const RadioGroupInput = ({options, name, currentValue, onChange, ...otherProps}) => {
  return (
    <NativeInput {...otherProps}>
      <RadioGroup
        options={options}
        name={name}
        currentValue={currentValue}
        onChange={onChange}
      />
    </NativeInput>
  )
}

export default RadioGroupInput
