import React from 'react'
import c from './Left.module.sass'
import { NavLink } from "react-router-dom"
import PersonIcon from '@material-ui/icons/Person'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import SettingsIcon from '@material-ui/icons/Settings';

function Left() {
  return (
    <div className={c.container_left}>
      <ul className={c.menu}>
        <li>
          <NavLink to='/profile' >
            <PersonIcon />
            <span>Профиль</span>
          </NavLink>
        </li>
        <li><NavLink to='/chat'>
          <QuestionAnswerIcon />
          <span>Чат(нету)</span>
        </NavLink>
        </li>
        <li><NavLink to='/users'>
          <PeopleAltIcon />
          <span>Пользователи</span>
        </NavLink>
        </li>
        <li><NavLink to='/friend/'>
          <PeopleAltIcon />
          <span>Мои кореши</span>
        </NavLink>
        </li>
        <li><NavLink to='/settings'>
          <SettingsIcon />
          <span>Настройки(нету)</span>
        </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Left;

