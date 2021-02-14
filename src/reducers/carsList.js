import { 
    CARS_LIST
} from '../actions/types'

const DEFAULT_STATE = {
    carsList: []
}

export default(state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case CARS_LIST:
            console.log('[Home carList] got carList action')
            return{...state, carsList: action.payload}

        default:
           return state;
    }
}