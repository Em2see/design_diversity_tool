import { batch } from 'react-redux'

const UPDATE_AVAIL = 'CHANGE_AVAIL'
const UPDATE_CHECKBOX = 'UPDATE_CHECKBOX'
const ADD_DIVERSITY = 'ADD_DEVIRSITY'
const REMOVE_DIVERSITY = 'REMOVE_DEVIRSITY'
const UPDATE_CKTS = 'UPDATE_CKTS'
const UPDATE_DIVERSITY = 'UPDATE_DIVERSITY'
const BLOCK_DIVERSITY = 'BLOCK_DIVERSITY'
const UNBLOCK_DIVERSITY = 'UNBLOCK_DIVERSITY'
const UPDATE_PATH_POINTS = 'UPDATE_PATH_POINTS'
const PAPER_SAVE = 'PAPER_SAVE'
const LOAD_CODE = 'LOAD_CODE'
const APPLY_CODE = 'APPLY_CODE'
const APPLY_WINDOW_SIZE = 'APPLY_WINDOW_SIZE'
const CLEAR_DIVERSITY = 'CLEAR_DIVERSITY'



const updateAvail = stars => ({
    type: UPDATE_AVAIL,
    stars
})

const updateCkts = (name, data) => ({
    type: UPDATE_CKTS,
    name,
    data
})

const updateCheckbox = (checkbox) => ({
    type: UPDATE_CHECKBOX,
    checkbox
})

const removeDiversity = (side, name) => ({
    type: REMOVE_DIVERSITY,
    side,
    name
})

const addDiversity = (side, name) => ({
    type: ADD_DIVERSITY,
    side,
    name
})

const updateDiversity = (side, names, is_adding) => ({
    type: UPDATE_DIVERSITY,
    side,
    names,
    is_adding
})

const blockDiversity = (side, names) => ({
    type: BLOCK_DIVERSITY,
    side,
    names
})

const unblockDiversity = (side, names) => ({
    type: UNBLOCK_DIVERSITY,
    side,
    names
})

const updatePathPoints = (points) => ({
    type: UPDATE_PATH_POINTS,
    points
})

const paperSave = () => ({
    type: PAPER_SAVE
})

const loadCode = (code) => ({
    type: LOAD_CODE,
    code
})

const clearDiversity = () => ({
    type: CLEAR_DIVERSITY
})

const applyCode = (ckts, diversity) => (dispatch, getState) => {
    return batch(() => {
        dispatch(clearDiversity())
        dispatch(updateCkts('ckt_1', ckts.ckt_1))
        dispatch(updateCkts('ckt_2', ckts.ckt_2))
        dispatch(updateDiversity('a_side', diversity.a_side.checked, true))
        dispatch(updateDiversity('b_side', diversity.b_side.checked, true))
    })
}

const applyTemplate = (stars, code) => (dispatch, getState) => {
    return batch(() => {
        dispatch(clearDiversity())
        dispatch(updateAvail(stars))
        dispatch(loadCode(code))
    })
}

const applyWindowSize = (width, height) => ({
    type: APPLY_WINDOW_SIZE,
    width,
    height
})

export {updateAvail, updateCkts, updateCheckbox, 
        removeDiversity, addDiversity, updateDiversity, 
        blockDiversity, unblockDiversity, updatePathPoints,
        paperSave, loadCode, applyCode, applyTemplate, applyWindowSize,
        
        UPDATE_AVAIL, UPDATE_CHECKBOX, UPDATE_CKTS, 
        ADD_DIVERSITY, REMOVE_DIVERSITY, UPDATE_DIVERSITY, 
        BLOCK_DIVERSITY, UNBLOCK_DIVERSITY, UPDATE_PATH_POINTS,
        PAPER_SAVE, LOAD_CODE, APPLY_CODE, APPLY_WINDOW_SIZE, 
        CLEAR_DIVERSITY}