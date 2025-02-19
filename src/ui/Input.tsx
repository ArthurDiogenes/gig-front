import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    clique?: () => void
}

const Input: React.FC<InputProps> = ({clique ,...props}) => {
    return(
        <>
        <input {...props} onClick={clique} />
        </>
    )
}

export default Input