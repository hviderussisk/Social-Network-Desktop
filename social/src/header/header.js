import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getDataUserAC, unAuthAC } from '../redux/profile-reducer'
import c from './header.module.sass'



function Header(props) {
    let [logOutCount, setLogOut] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(logOutCount === true){ 
            localStorage.removeItem('token')
            dispatch(getDataUserAC())
        }
    }, [logOutCount])
    const logOut = () => {
        setLogOut(true)
    }
    return (
        <div className={c.header}>
            <div className={c.container}>
                <div className={c.right}>
                    <NavLink to='/profile/'>
                        <div className={c.logo}></div>
                    </NavLink>
                    <div className={c.search}>
                        <form>
                            <input type="text" placeholder="Поиск"/>
                        </form>
                    </div>
                </div>
                
                <div className={c.loging}>
                    <button onClick={logOut}>Выход</button>
                </div>
            </div>
        </div>
    );
}

export default Header;
