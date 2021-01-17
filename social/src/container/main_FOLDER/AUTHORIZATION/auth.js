import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { authRequestAC } from '../../../redux/profile-reducer'
import p from './auth.module.sass'
import { useDispatch } from 'react-redux';
import { CompInput, email } from './renderEmail';
import { CompButton } from './renderButton';
    
let Auth = (props) => {
    let dispatch = useDispatch()
    let { handleSubmit, pristine, submitting, invalid } = props
    let require = (value) => {
       dispatch(authRequestAC(value))
    }
    
    return  <div className={p.container_auth}>
                    <h2>Мой аккаунт</h2>
                    <form onSubmit={handleSubmit(require)}> 
                        <div className={p.rowField}>
                            <Field component={CompInput} authError={props.authError} label="Логин или email" validate={email} name="login" placeholder="Введите логин или email"/>
                        </div>
                        <div className={p.rowField}>
                            <Field component={CompInput} authError={props.authError} validate={email} type="password" label="Пароль" name="password" placeholder="Введите пароль"/>
                        </div>
                        <div className={p.button}>
                                <Field component={CompButton} disabled={pristine || submitting} className={pristine || submitting || invalid  ? 'disabled' : ''} label="Войти" type="submit" name="button" />
                        </div>
                    </form>
            </div>
    
}

let AuthFormRedux = reduxForm({form: 'auth' })(Auth)


export default AuthFormRedux

