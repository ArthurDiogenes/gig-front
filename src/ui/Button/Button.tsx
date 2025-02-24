import styles from './Button.module.css';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}


const Button : React.FC<ButtonProps> = ({children, ...props}) => {
    return(
        <button className={styles.btn} {...props}>{children}</button>
    )
}

export default Button;