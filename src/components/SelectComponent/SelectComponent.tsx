import React from "react"
import styles from "./SelectComponent.module.css"

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    array: string[];
    placeholder?: string;
}


const SelectComponent: React.FC<SelectProps> = ({ array, ...props }) => {

    return (
        <>
            <select {...props} className={styles.select}>
                {props.placeholder && (
                    <option value="" disabled selected>
                        {props.placeholder}
                    </option>
                )}
                {array.map((item) => (
                    <option value={item.toLowerCase()}>{item}</option>
                ))}
            </select>
        </>
    )
}

export default SelectComponent