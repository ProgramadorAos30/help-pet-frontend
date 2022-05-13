import {
    USERS,
    USER_SETINGS,
    CITY,
    DASHBOARD_OCCURRENCES,
    DASHBOARD_USERS,
    MESSAGES,
    NOTIFICATIONS,
    OCCURRENCES,
    OCCURRENCES_MAP,
    SERVICES,
    SOURCES,
    STATE,
    TOKEN,
    UPLOADS
} from '../actions/index';
import { initialState } from '../state/index';

export const reducer = (state = initialState, action: any) => {
    switch(action.type){
        case USERS:
            return { ...state, users: action.users }
        
        case USER_SETINGS:
            return { ...state, user_setings: action.user_setings }
        
        case DASHBOARD_OCCURRENCES:
            return { ...state, dashboard_occurrences: action.dashboard_occurrences }
        
        case DASHBOARD_USERS:
            return { ...state, dashboard_users: action.dashboard_users }
        
        case MESSAGES:
            return { ...state, messages: action.messages }

        case NOTIFICATIONS:
            return { ...state, notifications: action.notifications }

        case OCCURRENCES:
            return { ...state, occurrences: action.occurrences }

        case OCCURRENCES_MAP:
            return { ...state, occurrences_map: action.occurrences_map }
        
        case SERVICES:
            return { ...state, services: action.services }
        
        case SOURCES:
            return { ...state, soucers: action.soucers }

        case UPLOADS:
            return { ...state, uploads: action.uploads }

        case TOKEN:
            return { ...state, token: action.token }
        
        case STATE:
            return { ...state, state: action.state }
        
        case CITY: 
            return { ...state, city: action.city }

        default:
            return { ...state };
    }
}