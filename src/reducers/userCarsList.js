import {
    USER_CARS
} from '../actions/types'

const DEFAULT_STATE = {
    carsList: []
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
            case USER_CARS:
                console.log('[User carList] got carList action')
                return {
                    ...state, carsList: action.payload
                }

                default:
                    return state;
    }
}