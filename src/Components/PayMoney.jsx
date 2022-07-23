import React, { Component } from 'react'
import style from './Style/style.module.css'
import { connect } from 'react-redux'

class PayMoney extends Component {
    total = 0;

    renderSelectedChair = () => {
        this.total = 0;
        return this.props.selectedChair.map((ele) => {
            this.total += ele.gia * 1;
            return (
                <tr key={ele.soGhe} className="text-danger">
                    <td className='text-warning'>{ele.soGhe}</td>
                    <td className='text-warning'>{ele.gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND</td>
                    <td style={{cursor:"pointer"}} onClick={() => {
                        this.props.cancle(ele.soGhe)
                    }}> <b>X</b> </td>
                </tr>
            )
        })
    }
    render() {
        return (
            <div className='col-4 text-center'>
                <h3 className='my-3 text-light'>DANH SÁCH GHẾ CHỌN</h3>
                <div className='d-flex align-items-center'>
                    <div className={style.gheDuocChon}></div>
                    <span className={style.chuthich}>Ghế đã đặt</span>
                </div>
                <div className='d-flex align-items-center'>
                    <div className={style.gheDangChon}></div>
                    <span className={style.chuthich}>Ghế đang chọn</span>
                </div>
                <div className='d-flex align-items-center'>
                    <div className={`${style.ghe}`}></div>
                    <span className={style.chuthich}>Ghế chưa đặt</span>
                </div>
                <table className="table">
                    <thead>
                        <tr className='text-light'>
                            <th>Số ghế</th>
                            <th>Giá</th>
                            <th>Hủy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderSelectedChair()}
                        <tr className='text-light'>
                            <th>Tổng tiền</th>
                            <th className='text-warning'>{this.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND</th>
                            <th></th>
                        </tr>
                    </tbody>
                </table>
                <button onClick={() => {
                    this.props.Pay()
                }} className="btn btn-info form-control">Xác nhận</button>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        selectedChair: state.chairReducer.listChoose,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Pay: () => {
            const action = {
                type: "Pay",
            };
            dispatch(action);
        },
        cancle: (soGhe) => {
            const action = {
                type: "Cancle",
                payload: soGhe,
            };
            dispatch(action);
        }
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(PayMoney);