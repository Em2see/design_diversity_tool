import {def_state} from '../store/const'
import {UPDATE_AVAIL, UPDATE_CHECKBOX, UPDATE_CKTS, UPDATE_DIVERSITY, LOAD_CODE, APPLY_WINDOW_SIZE} from '../actions'
import {BLOCK_DIVERSITY, UNBLOCK_DIVERSITY, UPDATE_PATH_POINTS} from '../actions'
import {PAPER_SAVE} from '../actions'
import { combineReducers } from 'redux'
import { remove as _remove, union as _union, get as _get, uniq as _uniq } from "lodash"

const load_default = (def_state, keys) => keys.reduce((acc, i) => ({...acc, [i]: def_state[i]}), {})

const draw = (state = def_state.draw, action) => {
    let new_state
    switch (action.type) {
        case UPDATE_CKTS:
            return {...state, background: action.data.circuit_type, points:[], code: ''}
        case UPDATE_CHECKBOX:
            new_state = {...state, a_side: {...state.a_side, diversity: action.checkbox.a_end}, points:[], code: ''}
            if (action.checkbox.b_end !== undefined) {
                new_state = {...new_state, b_side: {...state.b_side, diversity: action.checkbox}, code: ''}
            } else {
                new_state = {...new_state, background: new_state.background, a_side: new_state.a_side, code: ''}
            }
            return new_state
        case UPDATE_PATH_POINTS:
            new_state = {...state, points: [...action.points], code: ''}
            return new_state
        case PAPER_SAVE:
            new_state = {...state, paperSave: !state.paperSave, code: ""}
            return new_state
        case LOAD_CODE:
            new_state = {...state, paperSave: false, code: action.code, points:[]}
            return new_state
        case UPDATE_DIVERSITY:
        case BLOCK_DIVERSITY:
            return {...state, points: []}
        case APPLY_WINDOW_SIZE:
            return {...state, height: action.height, width: action.width}
        default:
            return {...state, ...load_default(def_state.draw, ['code', 'points'])};
    }
}

export default draw