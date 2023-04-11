import {MAIN_SIZE, CURRENT_SIZE} from './consts'
import {clone as _clone} from 'lodash'

export const update_object_props = (props, default_values={}) => {
    if (props === null) {
        return props
    }
    return Object.keys(default_values).reduce((acc, i) => (
        {...acc, 
        [i]: isNaN(acc[i]) || acc[i] === undefined ? default_values[i] : acc[i]
    }), props)
}

export const update_size = (ele_in, default_values={}, no_update=[]) => {
    let ele = _clone(ele_in)
    ele = update_object_props(ele, default_values)


    ele.x = no_update.includes('x') ? ele.x : ele.x * CURRENT_SIZE.width / MAIN_SIZE.std_width;
    ele.y = no_update.includes('y') ? ele.y : ele.y * CURRENT_SIZE.height / MAIN_SIZE.std_height;

    ele.height = ele.height * CURRENT_SIZE.height / MAIN_SIZE.std_height;
    ele.width = ele.width * CURRENT_SIZE.width / MAIN_SIZE.std_width;
    
    return ele;
}

export const prepare_text_params = (ele, text) => (
    {
        x: ele.x + ele.width / 2,
        y: ele.y + ele.height / 2,
        text,
        attr: {...ele.attr, "font-weight": "bold", "font-size": "12px"}
    }
)

export const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}