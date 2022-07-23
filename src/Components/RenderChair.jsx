import React, { Component } from 'react'
import Data from './../Data/danhSachGhe.json'
import style from './Style/style.module.css'
import { connect } from 'react-redux/es/exports'

class RenderChair extends Component {
    renderList() {
        return this.props.listChair.map((ele, i) => {
            if (i == 0) {
                return (
                    <div className='d-flex justify-content-center'>
                        <span className={style.rowNumber}>{ele.hang}</span>
                        {ele.danhSachGhe.map((item) => {
                            return (
                                <div className={`${style.firstChar}`}>{item.soGhe}</div>
                            )
                        })}
                    </div>
                )
            } 
            else {
                return (
                    <div className='text-light mx-auto d-flex justify-content-center'>
                        <span className={style.rowNumber}>{ele.hang}</span>
                        {ele.danhSachGhe.map((item, i) => {
                            if(item.daDat){
                            return (
                                <button className={style.gheDuocChon}>{i+1}</button>
                            )}else{
                                return (
                                <button id={item.soGhe} onClick={() => {
                                    this.props.chooseChair(item.soGhe)
                                }} className={style.ghe}>{i+1}</button>
                        )}
                        })}
                    </div>
                )
            }

        })
    }
    render() {
        return (
            <div className='container text-center'>
                {this.renderList()}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        chooseChair: (soGhe) => {
            const action = {
                type: "CHOOSE",
                payload: soGhe,
            };
            dispatch(action);
        },
    }
}

const mapStatetoProps = (state) => {
    return{
        ...state.chairReducer
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(RenderChair)