import React, { Component } from 'react'
import ThongTinSV from './ThongTinSV'
import DanhSach from './DanhSach'

export default class Home extends Component {
  render() {
    return (
      <div className='container py-3'>
        <ThongTinSV></ThongTinSV>
        <DanhSach></DanhSach>
      </div>
    )
  }
}
