import React from 'react'

interface TextFieldProps {
  props: string,
  htmlFor: string,
  label: string, 
  type: string, 
  name: string, 
  value: string, 
  formStyle: string,
  formSize: string,
  className: string,
  placeholder: string,
  onChange: () => void;
  onBlur: () => void;
}

const STYLES = ['input--primary'];
const SIZES = ['input--large','input--medium','input--small', 'input--item', 'input--qty', 'input--price' ];

const TextField: React.FC<TextFieldProps> = React.forwardRef<HTMLInputElement, TextFieldProps>(({
  htmlFor,
  label,
  type,
  name,
  placeholder,
  formStyle,
  formSize, onChange, onBlur }, ref) => {

  // if the component has a form style, then i we want it to be whatever the button style we created and if it's not true, we set the value to the first style value in the array 
  const checkFormStyle = STYLES.includes(formStyle) ? formStyle : STYLES[0];

  const checkFormSize = SIZES.includes(formSize) ? formSize : SIZES[0];

  return (
    <div className='input__text-field'>
      <label className='body--medium input--label-text' htmlFor={htmlFor}>{label}</label>
      <input className={`input background--two input--padding ${checkFormStyle} ${checkFormSize}`} onChange={onChange} onBlur={onBlur} ref={ref} type={type} name={name} placeholder={placeholder} />
    </div>
  )
});

TextField.displayName = 'TextField';


export default TextField