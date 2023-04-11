import { get as _get } from 'lodash'

export const diversity_choosen_fn = (diversity) => (side, options) => {
    return options.every(i => _get(diversity, side + ".checked", []).includes(i))
}

export const calc_chosen_fn = (diversity) => (side, options) =>  {
    return options.reduce((acc, i) => acc + _get(diversity, side + ".checked", []).includes(i), 0)
}

const get_access = (ckts) => (ckt) => _get(ckts, ckt + ".circuit_type", "")
const get_as_type = (ckts) => (ckt) => _get(ckts, ckt + ".as_type", "")
const get_eas_type = (ckts) => (ckt) => _get(ckts, ckt + ".internet_access_type", "")
const get_access_type = (ckts) => (ckt) => _get(ckts, ckt + ".access_type", "")

export const check_access_fn = (ckts) => (ckts_options) => {
    let options = [
        {first: 'ckt_1', second: 'ckt_2'},
        {first: 'ckt_2', second: 'ckt_1'},
    ]
    // if (get_access_type(ckts)('ckt_1') === '5g') {
    //     options = options
    // }
    options = options.map(({first, second}) => {
        let out = get_access(ckts)(first) === ckts_options.ckt_1[0]
        out = out && get_access(ckts)(second) === ckts_options.ckt_2[0]
        
        const functions = [get_as_type, get_eas_type, get_access_type]
        
        functions.forEach((fn, i) => {
            if (ckts_options.ckt_1.length > (i + 1)) {
                if (ckts_options.ckt_1[i + 1] !== null && ckts_options.ckt_1[i + 1] !== '') {
                    out = out && fn(ckts)(first) === ckts_options.ckt_1[i + 1]
                }
            }
            if (ckts_options.ckt_2.length > (i + 1)) {
                if (ckts_options.ckt_2[i + 1] !== null && ckts_options.ckt_2[i + 1] !== '') {
                    out = out && fn(ckts)(second) === ckts_options.ckt_2[i + 1]
                }
            }
        })
        return out
    })
    //console.log('check_access_fn', options)
    return options.some(i => i)
}