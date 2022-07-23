import React, { Component } from 'react'
import { createRef } from 'react';
import { connect } from 'react-redux/es/exports';

const DEFAULT_VALUE = {
    maSV: '',
            hoTen: '',
            phone: '',
            email: '',
}
class ThongTinSV extends Component {
    state = {
        value : DEFAULT_VALUE,
        errors : {
            maSV: '',
            hoTen: '',
            phone: '',
            email: '',
        }
    }

    formRef = createRef();

    handleSubmit = (event) => {
        event.preventDefault();

        for(const key in this.state.errors){
            const mess = this.state.errors[key];

            if(mess){
                return;
            }
        }

        if (this.props.selectSV) {
            this.props.dispatch({
                type: "UPDATE_SV",
                payload: this.state.value,
            })
        } else {
            this.props.dispatch({
                type: "ADD_SV",
                payload: this.state.value,
            })
        }

        this.setState({
            value: DEFAULT_VALUE,
        }, () => {
            this.forceUpdate();
            console.log(this.state.value);
        })
    }

    static getDerivedStateFromProps(nextProps, currentState) {
        console.log({
            nextProps,
            currentState,
        });

        if (nextProps.selectSV && currentState.value.maSV !== nextProps.selectSV.maSV) {
            currentState.value = nextProps.selectSV;
        }

        return currentState;
    }

    handleChange = (event) => {
        // console.log(event.target.name);
        const { name, value } = event.target;
        this.setState({
           value :{
            ...this.state.value,
            [name]: value,
           } 
        });
    }

    handleBlur = (event) => {
        const {name, title, validationMessage, validity, maxLength} = event.target;
        const {valueMissing, patternMismatch, tooLong, valid} = validity;

        let mess = '';

        const index = this.props.sinhVienList.findIndex(ele => ele.maSV == this.state.value.maSV);
        
        if(index !== -1 && (name ==='maSV') && !this.props.selectSV){
            mess = `${title} bị trùng`;
        }

        if(tooLong){
            mess = `${title} tối đa ${maxLength} kí tự`;
        }

        if(patternMismatch){
            mess = `${title} nhập sai`;
        }
        
        if(valueMissing){
            mess = `${title} không được để trống`;
        }

        this.setState({
            errors: {
                ...this.state.errors,
                [name]: mess,
            }
        })
        console.log(this.formRef.current?.checkValidity());
    }

    render() {
        const { maSV, hoTen, phone, email } = this.state.value || {};
        return (
            <div>
                <h3 className='bg-dark text-light p-3'>Thông tin sinh viên</h3>
                <form ref={this.formRef} noValidate onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <div className='col-6'>
                            <label htmlFor=''>Mã SV</label>
                            <input disabled={this.props.selectSV} value={maSV} maxLength={10} title='Mã số' name='maSV' onChange={this.handleChange} 
                            required onBlur={this.handleBlur}
                            type="text" className="form-control" aria-describedby="helpId" />
                            {
                                this.state.errors.maSV && !this.props.selectSV && <span className='text-danger'>(*) {this.state.errors.maSV}</span>
                            }
                        </div>
                        <div className='col-6'>
                            <label htmlFor=''>Họ tên</label>
                            <input value={hoTen} title='Họ Tên' name="hoTen" onChange={this.handleChange} required onBlur={this.handleBlur} type="text" className="form-control" aria-describedby="helpId" />
                            {
                                this.state.errors.hoTen && <span className='text-danger'>(*) {this.state.errors.hoTen}</span>
                            }
                        </div>
                        <div className='col-6'>
                            <label htmlFor=''>Số điện thoại</label>
                            <input value={phone} title='Số điện thoại' name="phone" onChange={this.handleChange} required onBlur={this.handleBlur} pattern='/^+ (?: [0-9] ?) {6,14} [0-9]$/' type="number" className="form-control" aria-describedby="helpId" />
                            {
                                this.state.errors.phone && <span className='text-danger'>(*) {this.state.errors.phone}</span>
                            }
                        </div>
                        <div className='col-6'>
                            <label htmlFor=''>Email</label>
                            <input value={email} title='Email' name="email" onChange={this.handleChange} required onBlur={this.handleBlur} type="text" pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$' className="form-control" aria-describedby="helpId" />
                            {
                                this.state.errors.email && <span className='text-danger'>(*) {this.state.errors.email}</span>
                            }
                        </div>
                        <div className='col-3 mt-3'>
                            <button disabled={!this.formRef.current?.checkValidity()} type='submit' className="btn btn-success form-control">{
                                this.props.selectSV ? "Cập Nhật" : "Thêm"
                            }</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.SinhVienReducer,
    }
}

export default connect(mapStateToProps)(ThongTinSV);