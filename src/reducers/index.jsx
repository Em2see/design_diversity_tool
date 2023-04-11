import { combineReducers } from 'redux'
import { remove as _remove, union as _union, get as _get, uniq as _uniq } from "lodash"
import draw from './draw'
import availability from './availability'
import {ckts, top_level as top_level_old} from './ckts'

const main = combineReducers({
    draw,
    availability,
    ckts
})

const top_level = top_level_old(main)

export {top_level}