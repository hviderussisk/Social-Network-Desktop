import React from 'react'
import c from './container.module.sass'
import Left from './Left/Left'
import Right from './Right/Right'


function Container(props) {
  return (
    <div className={c.container}>
      <Left />
      <Right/>
    </div>
  )
}

export default Container;

