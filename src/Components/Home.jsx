import React, { Component } from 'react'
import Content from './Content'
import PayMoney from './PayMoney'
import style from './Style/style.module.css'
export default class Home extends Component {
  render() {
    return (
      <div className={`${style.bg}`}>
        <div className={`${style.home}`}></div>
        <div className='container p-5'>
          <div className='row'>
            <Content></Content>
            <PayMoney></PayMoney>
          </div>
        </div>
      </div>
    )
  }
}
