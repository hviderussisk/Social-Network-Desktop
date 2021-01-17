import React from 'react'
import c from './registration.module.sass'

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

export const uncorrectEmail = (value) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(value && !re.test(value))  return  "Некорректный email"
    return undefined
}

export const password = (value, allValues) => {
        if(value.length < 6){
            return "Пароль должен быть более 6 символов"
        }else if(value !== allValues.password){
            return "Пароль не совпадает"
        }else{
            return undefined
        }
    }