import data from './../../Data/danhSachGhe.json'

const DEFAULT_STATE = {
    listChair: data,
    listChoose: [],
    choose: false,
}

export const chairReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "CHOOSE": {
            const dataChair = [...state.listChoose];
            const index = dataChair.findIndex(ele => ele.soGhe === action.payload);
            console.log(index);
            if (index !== -1) {
                document.getElementById(dataChair[index].soGhe).classList.add('bg-light');
                document.getElementById(dataChair[index].soGhe).classList.remove('bg-success');
                dataChair.splice(index, 1);
                state.choose = false;
            } else {
                state.choose = true;
                data.forEach(ele => {
                    ele.danhSachGhe.forEach((item) => {
                        if (item.soGhe === action.payload) {
                            dataChair.push(item);
                            document.getElementById(item.soGhe).classList.add('bg-success');
                            document.getElementById(item.soGhe).classList.remove('bg-light');
                        }
                    })
                })
            }
            state.listChoose = dataChair;

            return { ...state }
        }

        case "Pay": {
            if (!state.choose) {
                alert('Vui lòng chọn ghế ngồi');
            } else {
                const dataList = [...state.listChair];
                state.listChoose.forEach((ele) => {
                    dataList.forEach((items) => {
                        items.danhSachGhe.forEach((item) => {
                            if (item.soGhe === ele.soGhe) {
                                item.daDat = true;
                            }
                        })
                    })
                })
                state.listChair = dataList;
                state.listChoose = [];
                state.choose = false;
                alert('Đã đặt vé, xin cám ơn');
            }

            return { ...state }
        }
        case "Cancle": {
            const dataList = [...state.listChoose];
            const index = dataList.findIndex(ele => ele.soGhe === action.payload);
            document.getElementById(dataList[index].soGhe).classList.remove('bg-success');
            dataList.splice(index, 1);
            if (dataList.length === 0) {
                state.choose = false;
            }
            state.listChoose = dataList;
            
            console.log(state.choose);
            return { ...state }
        }
        default:
            return state;
    }
}