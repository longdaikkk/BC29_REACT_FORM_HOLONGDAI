import React, { Component } from 'react'
import RenderChair from './RenderChair'
import style from './Style/style.module.css'

export default class Content extends Component {
  render() {
    return (
      <div className='col-8'>
        <h1 className='text-center text-warning'>ĐẶT VÉ XEM PHIM CYBERLEARN.VN</h1>
        <p className='text-center text-light'>Màn hình</p>
        <div className={`${style.screen} mx-auto`}></div>
        <RenderChair></RenderChair>
      </div>
    )
  }
}
