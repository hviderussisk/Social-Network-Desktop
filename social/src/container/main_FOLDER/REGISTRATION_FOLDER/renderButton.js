import React from 'react'
import p from './registration.module.sass'

export let CompButton = ({input, meta, label, className , ...props}) => {
    return (
        <div>
           <button {...input} {...props} className={p[className]}>{label}</button>
        </div>
    )
}