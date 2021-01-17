import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { registrationAC } from '../../../redux/auth-reducer'
import c from './registration.module.sass'
import { CompButton } from './renderButton'
import { email, CompInput, uncorrectEmail, password } from './renderEmail'
import ClearIcon from '@material-ui/icons/Clear';
    
let Registration = (props) => {
    let dispatch = useDispatch()
    let [modalCount, setCountModal] = useState(false)
    let modal = () => {
        setCountModal(true)
    }
    let noneModal = () => {
        setCountModal(false)
    }
    let { handleSubmit , pristine, submitting, invalid } = props
    let request = (value) => {
        dispatch(registrationAC(value))
        modal()
    }
    return  <div className={c.container_auth}>
            {modalCount ?  <div className={c.modalAvatar}>
                                    <div className={c.modalAvatarContent}>
                                        <div className={c.titleModalAvatar}>
                                            <h3>Регистрация прошла успешно</h3>
                                            <div className={c.noneMod} onClick={noneModal}><ClearIcon/></div>
                                        </div>
                                        <div className={c.owner}>
                                            <div className={c.description}>
                                                            Теперь войдите в свой аккаунт,<br/>
                                                            Под теми данными, которые указали при регистрации.
                                            </div>
                                        </div>
                                    </div>
                                </div> : <></>}
                    <h2>Регистрация</h2>
                    <form onSubmit={handleSubmit(request)}> 
                        <div className={c.row__column}>
                            <div className={c.rowField}> 
                                <Field component={CompInput}  label="Электронная почта:" validate={[email, uncorrectEmail]} name="email" placeholder="Ваш e-mail"/>
                            </div>
                            <div className={c.rowField}>
                                <Field component={CompInput} label="Имя:" validate={[email]} name="name" placeholder="Как вас зовут?"/>
                            </div>
                            <div className={c.rowField}>
                                <Field component={CompInput}  label="Фамилия:" validate={[email]} name="lastname" placeholder="Ваша фамилия"/>
                           </div>
                        </div>
                        <div className={c.row__column}>
                            <div className={c.rowField}>
                                <Field component={CompInput}  label="Пароль:" validate={[email , password]}  type="password" name="password" placeholder="Придумайте пароль"/>
                            </div>
                            <div className={c.rowField}>
                                <Field component={CompInput} label="Подтвердите пароль:" validate={[email, password]} type="password" name="repassword" placeholder="Пароль ещё раз"/>
                           </div>
                            <div className={c.rowField}>
                                <Field component={CompInput} label="Третий раз для прикола:" validate={[email, password]}  type="password" name="rerepassword" placeholder="И ещё разочек"/>
                               </div>
                            <div className={c.button}>
                                <Field component={CompButton} disabled={pristine || submitting} className={pristine || submitting || invalid  ? 'disabled' : ''} label="Зарегистрироваться" type="submit" name="button" />
                            </div>
                        </div>
                    </form>
            </div>
}

let RegistrationFormRedux = reduxForm({form: 'reg' })(Registration)

export default RegistrationFormRedux