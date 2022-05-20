import { TOKEN, USER } from '../actions/index';
import { initialState } from '../state/index';

export const reducer = (state = initialState, action: any) => {
    switch(action.type){
        case TOKEN:
            return { ...state, token: action.token }

        case USER:
            return { ...state, user: action.user }

        default:
            return { ...state };
    }
}