import React from 'react'
import c from './auth.module.sass'

export let CompInput = ({input, meta, label, className, ...props}) => {
    let noUser = 'Такого пользователя не существует.'
    let noPassword = 'Неверный пароль.'
    if(meta.error) noUser=''
    if(meta.error) noPassword=''
    return (
        <div>
            <label>{label}</label>
            <input {...input} {...props} className={meta.error && meta.touched && props.authError && `${c.error} ${className}` || `${className} ${c.input}` }/>
            {meta.error && meta.touched && <label className={c.status}>{meta.error}</label>}
            {props.authError === noPassword && input.name === 'password' && <label className={c.status}>{props.authError}</label> }
            {props.authError === noUser && input.name === 'login' && <label className={c.status}>{props.authError}</label> }
        </div>
    )
}

export const email = (value) => {
    if(value) return undefined 
    return "Обязательное поле"
}
