import { UPDATE_PATH_POINTS, LOAD_CODE, applyCode } from "../actions"
import { cleanPoints } from "../containers/PathDraw"
import {ckt_decoder, devirsity_decoder} from '../containers/Coder'

const points_cleaner = store => next => action => {
    if (action.type !== UPDATE_PATH_POINTS) {
        cleanPoints()
    }
    let result = next(action)
    return result
}

const apply_code = store => next => action => {
    if (action.type === LOAD_CODE) {
        let new_ckts = ckt_decoder(action.code.split('-').slice(1, 3))
        let new_diversity = devirsity_decoder(action.code.split('-').slice(3, 6))

        store.dispatch(applyCode(new_ckts, new_diversity))
    }
}

export {points_cleaner}