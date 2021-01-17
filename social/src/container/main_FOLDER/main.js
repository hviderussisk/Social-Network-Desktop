import React, { useState } from 'react'
import AuthFormRedux from './AUTHORIZATION/auth'
import Registration from './REGISTRATION_FOLDER/registration'
import p from './main.module.sass'
    
let Main = (props) => {
    let [countTab, setTabCount] = useState('auth')
    return  <div className={p.background}>
                {/* <h1>SocialNetwork УИлюхи</h1> */}
                <div className={p.main_container}>
                    <div className={p.ui_block}>
                        <div className={p.tab}>
                            <div className={countTab === 'auth' ? `${p.active} ${p.tab__item}` : p.tab__item  } onClick={()=> setTabCount('auth')}>Войти</div>
                            <div className={countTab === 'reg' ? `${p.active} ${p.tab__item}` : p.tab__item} onClick={()=> setTabCount('reg')}>Регистрация</div>
                        </div>
                        {countTab === 'auth' ? <AuthFormRedux authError={props.authError}/> : countTab === 'reg' ? <Registration syncErrors={props.syncErrors}/> : false}
                    
                    </div>
                </div>
            </div>
            
}

export default Main