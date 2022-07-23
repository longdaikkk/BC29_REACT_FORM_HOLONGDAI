import React, { Component } from 'react'
import { connect } from 'react-redux'

class DanhSach extends Component {
    state = {
        keyword: "",
    }
    handleDelete = (maSV) => {
        this.props.dispatch({
            type: "DELETE",
            payload: maSV,
        })
    }

    handleEdit = (ele) => {
        this.props.dispatch({
            type: "SELECT_SV",
            payload: ele,
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    }

    renderListSV = () => {
        const data = this.props.sinhVienList.filter(ele => {
            return (ele.hoTen
                .toLowerCase()
                .trim()
                .indexOf(this.state.keyword.toLowerCase().trim()) !== -1);
        })

        return data.map(ele => {
            const { maSV, hoTen, phone, email } = ele;
            return (
                <tr key={maSV}>
                    <td>{maSV}</td>
                    <td>{hoTen}</td>
                    <td>{phone}</td>
                    <td>{email}</td>
                    <td>
                        <button onClick={() => {
                            this.handleDelete(maSV)
                        }} className="btn btn-danger mr-1">Xóa</button>
                        <button onClick={() => {
                            this.handleEdit(ele)
                        }} className="btn btn-info">Sửa</button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr className='bg-dark text-light'>
                            <th>Mã SV</th>
                            <th>Họ Tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th><input name='keyword' onChange={this.handleChange} type="text" placeholder='Tìm Kiếm theo tên' /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderListSV()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.SinhVienReducer,
    }
}

export default connect(mapStateToProps)(DanhSach);