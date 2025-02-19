import React from "react"
import styles from  "./InputComponent.module.css"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    clique?: () => void
}

const InputComponent: React.FC<InputProps> = ({clique ,...props}) => {
    return(
        <>
        <input {...props} onClick={clique} className={styles.input} />
        </>
    )
}

export default InputComponent