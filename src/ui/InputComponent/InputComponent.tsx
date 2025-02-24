import React from "react"
import styles from  "./InputComponent.module.css"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const InputComponent: React.FC<InputProps> = ({...props}) => {
    return(
        <div>
            <input {...props} className={styles.input} />
        </div>
    )
}

export default InputComponent