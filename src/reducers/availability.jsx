import {def_state} from '../store/const'
import {UPDATE_AVAIL} from '../actions'
import { remove as _remove, union as _union, get as _get, uniq as _uniq } from "lodash"

const availability = (state = def_state.availability, action) => {
    switch (action.type) {
        case UPDATE_AVAIL:
            return {...state, stars: action.stars}
        default:
            return state;
    }
}

export default availability