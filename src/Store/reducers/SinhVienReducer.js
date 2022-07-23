const DEFAULT_STATE = {
    sinhVienList: [
        {
            maSV: 1,
            hoTen: 'Nguyễn Văn A',
            phone: '09381111111',
            email: 'nguyenvana@gmail.com',
        },
        {
            maSV: 2,
            hoTen: 'Nguyễn Văn B',
            phone: '0938123123123',
            email: 'nguyenvanb@gmail.com',
        },
    ],
    selectSV: null
}

export const SinhVienReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "ADD_SV": {
            const data = [...state.sinhVienList];
            data.push(action.payload);
            state.sinhVienList = data;
            return {...state}
        }

        case "DELETE": {
            state.sinhVienList = state.sinhVienList.filter(ele => ele.maSV !== action.payload);
            console.log(state.sinhVienList);
            return {...state}
        }

        case "SELECT_SV": {
            return {...state, selectSV: action.payload}
        }

        case "UPDATE_SV": {
            state.sinhVienList = state.sinhVienList.map(ele => ele.maSV=== action.payload.maSV ? action.payload : ele)
            state.selectSV = null;

            return {...state}
        }
        default:
            return { ...state }
    }
}

