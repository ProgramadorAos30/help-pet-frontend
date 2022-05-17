import { TOKEN } from '../actions/index';
import { initialState } from '../state/index';

export const reducer = (state = initialState, action: any) => {
    switch(action.type){
        case TOKEN:
            return { ...state, token: action.token }

        default:
            return { ...state };
    }
}