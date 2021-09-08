import React, { MouseEventHandler } from 'react'
interface ButtonProps {
    buttonLabel:string;
    buttonClick:MouseEventHandler<HTMLButtonElement>;
    buttonStyle?:string;
}
export const Button:React.FC<ButtonProps> = ({buttonLabel,buttonClick,buttonStyle}) => {
    return <button onClick={buttonClick} className={buttonStyle} >{buttonLabel}</button>
}