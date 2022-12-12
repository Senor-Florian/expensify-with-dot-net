import Auth from "../interfaces/Auth";
import { AnyAction } from "redux";

const authReducerDefaultState : Auth = {
    uid: '',
    displayName: '',
};

const authReducer = (state = authReducerDefaultState, action : AnyAction) : Auth => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid,
                displayName: action.displayName
            };
        case 'LOGOUT':
            return {
                uid: '',
                displayName: ''
            };
        default:
            return state;
    }
};

export default authReducer;