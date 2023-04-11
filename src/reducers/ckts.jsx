import {def_state} from '../store/const'
import {UPDATE_CHECKBOX, UPDATE_CKTS, UPDATE_DIVERSITY, CLEAR_DIVERSITY} from '../actions'
import {BLOCK_DIVERSITY, UNBLOCK_DIVERSITY} from '../actions'
import { remove as _remove, union as _union, get as _get, uniq as _uniq, findIndex as _findIndex } from "lodash"

const diversity = (state, action) => {
    let new_state, new_blocked
    switch (action.type) {
        case UPDATE_CHECKBOX:
            new_state = {...state, a_side: {blocked:[], checked: action.checkbox.a_end}}
            if (action.checkbox.b_end !== undefined) {
                new_state = {...new_state, b_side: {blocked:[], checked: action.checkbox.b_end}}
            } else {
                new_state = {a_side: new_state.a_side}
            }
            return new_state;
        case UPDATE_DIVERSITY:
            let is_remove = ! action.is_adding
            let new_checked = []
            
            if (is_remove) {
                new_checked = _remove(state[action.side].checked, i => ! action.names.includes(i))
            } else {
                new_checked = [..._get(state, action.side + '.checked', []), ...action.names]
            }
            
            new_blocked = _get(state, action.side + '.blocked', [])
            
            return {...state, [action.side]: {checked: new_checked, blocked: new_blocked}};
        case BLOCK_DIVERSITY:
            new_blocked = [...state[action.side].blocked, ...action.names]
            return {...state, [action.side]: {checked: state[action.side].checked, blocked: new_blocked}};
        case UNBLOCK_DIVERSITY:
            new_blocked = _remove(state[action.side].blocked, i => ! action.names.includes(i))
            return {...state, [action.side]: {checked: state[action.side].checked, blocked: new_blocked}};
        case CLEAR_DIVERSITY:
            return {...def_state.ckts.diversity}
        case UPDATE_CKTS:
        default:
            return state;
    }


}

const is_p2p_action = (action) => action.data.circuit_type === "p2p"
const some_ckts = (checker) => ['ckt_1', 'ckt_2'].some(checker)
const every_ckts = (checker) => ['ckt_1', 'ckt_2'].every(checker)
const is_p2p = (old_state, ckt_name) => old_state[ckt_name].circuit_type === "p2p"

const diversity_rules = (state) => {
    let output = {...state}
    let new_checked, new_blocked
    ['a_side', 'b_side'].forEach(side => {
        if (output[side] !== undefined) {
            new_checked = output[side].checked
            new_blocked = [] //output[side].blocked
            if (output[side].checked.includes("lcar")) {
                // if lcar => ['ntu', 'cpe', 'entr']
                new_checked = _union(new_checked, ['nni', 'cloud'])
                new_blocked = _union(new_blocked, ['nni', 'cloud'])
            } else {
                new_blocked = _remove(new_blocked, i => !['nni', 'cloud'].includes(i))
            }
            
            if (output[side].checked.includes("location")) {
                // if location => ['ntu', 'nni', 'cloud']
                new_checked = _union(new_checked, ['ntu', 'cpe'])
                new_blocked = _union(new_blocked, ['ntu', 'cpe'])
            } else {
                new_blocked = _remove(new_blocked, i => !['ntu', 'cpe'].includes(i))
            }
            // if (output[side].checked.includes("lcar")) {
            //     new_checked = _uniq([...output[side].checked, 'ntu'])
            //     output = {...output, [side]: {...output[side], checked: new_checked}}
            // }

            output = {...output, [side]: {...output[side], checked: new_checked, blocked: new_blocked}}
        }
    })

    return output
}

const p2p_rules = (ckts, diversity) => {
    // we get ckts and go through it
    // diversity

    // diversity -- a_side, b_side --- total diversity info
    // diversity_results - resulted info based on diversity and ckts info
    let output = {...diversity}
    
    if (!every_ckts(i => ckts[i].circuit_type === 'p2p')) {
        output = {a_side: output.a_side}
    } else if (every_ckts(i => ckts[i].circuit_type === 'p2p')) {
        // console.log('p2p_rules', output)
        output = {a_side: output.a_side, b_side: output.b_side ? output.b_side : {checked: [], blocked: []}}
    }

    return output
}

const add_items = (output) => (items_list, check=true, block=true) => {
    output.checked = [...output.checked, ...items_list.map(i => (check ? "" : "-") + i)]
    output.blocked = [...output.blocked, ...items_list.map(i => (block ? "" : "-") + i)]
    return output
}

const eth_rules = (ckts) => {
    let output = {checked: [], blocked: []}
    
    if (some_ckts(i => ckts[i].as_type === 'eas')) {
        output = add_items(output)(["se", "l2a", "nni"], false)
        output = add_items(output)(["cloud"])
    }

    if (some_ckts(i => ckts[i].internet_access_type === 'broad')) {
        output = add_items(output)(["exchange", "entr"], false)
        output = add_items(output)(["ntu"])
    }

    if (some_ckts(i => ckts[i].circuit_type === 'eth') && some_ckts(i => ckts[i].circuit_type === 'internet')) {
        output = add_items(output)(["se"])
    }

    // if (every_ckts(i => ckts[i].circuit_type === 'internet')) {
    //     output = add_items(output)(["se"], false)
    // }
    
    return output
}

const side_access_rules = (ckts, diversity, side='a_side') => {
    let output = {checked: [], blocked: []}
    
    if (some_ckts(i => ckts[i].access_type === '5g')) {
        output = add_items(output)(["se", "l2a", "nni", "exchange", "cloud"], false)
    }
    
    if (some_ckts(i => ckts[i].access_type === 'wired') && !every_ckts(i => ckts[i].access_type === 'wired') && every_ckts(i => ckts[i].access_type !== '')) {
        output = add_items(output)(["entr"])
    }
    
    if (every_ckts(i => ckts[i].access_type === 'wired') && _get(diversity, side + '.checked', []).includes('location')) {
        output = add_items(output)(["entr"])
    }

    if (_get(diversity, side + '.checked', []).includes('lcar')) {
        output = add_items(output)(["ntu"])
    }
    
    // else if (every_ckts(i => ckts[i].access_type === 'wired') && !_get(diversity, side + '.blocked', []).includes('location')) {
    //    output = add_items(output)(["entr"], true, false)
    //}

    return output
}

const access_rules = (ckts, diversity) => {
    let {checked, blocked} = side_access_rules(ckts, diversity)
    let {blocked: blocked_b, checked: checked_b} = side_access_rules(ckts, diversity, 'b_side')
    
    return {checked, blocked, checked_b, blocked_b} 
}

const is_ckt_type_changed = (new_state, old_state, ckt_name) => new_state[ckt_name].circuit_type !== old_state[ckt_name].circuit_type

const diversity_params = ['location', 'cpe', 'ntu', 'entr', 'lcar', 'exchange', 'cloud', 'nni', 'l2a', 'se']

const combine_results = (prev_diversity, diversities) => {
    let {checked, blocked} = diversities.reduce((acc, i)=> {
        acc.blocked = [...acc.blocked, ...i.blocked]
        acc.checked = [...acc.checked, ...i.checked]

        return acc
    }, {checked: [], blocked: []})

    checked = _uniq(checked)
    blocked = _uniq(blocked)

    // remove checked, or unblock blocked
    let pos_index, neg_index

    checked = diversity_params.reduce((acc, i) => {
        pos_index = _findIndex(checked, (o)=> i === o)
        neg_index = _findIndex(checked, (o)=> i === o.slice(1))
        if (pos_index > -1 || ((pos_index > -1) && (neg_index > -1) && (pos_index < neg_index))) {
            acc.push(i)
        } else if (pos_index > -1 || ((pos_index > -1) && (neg_index > -1) && (pos_index < neg_index))) {
            
        } else if (pos_index === -1 && neg_index === -1) {
            if (prev_diversity.a_side.checked.includes(i)){
                acc.push(i)
            }
        }
        return acc
    }, [])

    blocked = diversity_params.reduce((acc, i) => {
        pos_index = _findIndex(blocked, (o)=> i === o)
        neg_index = _findIndex(blocked, (o)=> i === o.slice(1))
        if (pos_index > -1 || ((pos_index > -1) && (neg_index > -1) && (pos_index < neg_index))) {
            acc.push(i)
        } else if (pos_index > -1 || ((pos_index > -1) && (neg_index > -1) && (pos_index < neg_index))) {
            
        } else if (pos_index === -1 && neg_index === -1) {
            if (prev_diversity.a_side.blocked.includes(i)){
                acc.push(i)
            }
        }
        return acc
    }, [])

    // add new
    


    return {checked, blocked}
}

let ckts = (state = def_state.ckts, action) => {
    
    let new_diversity = diversity(state.diversity, action)
    new_diversity = diversity_rules(new_diversity)
    let new_state = {...state, diversity: new_diversity}
    
    switch (action.type) {
        case UPDATE_CKTS:
            new_state = {...new_state, [action.name]: action.data}
            let alt_key = action.name === "ckt_1" ? "ckt_2" : "ckt_1"
            if (is_p2p_action(action)) {
                new_state = {...new_state, [alt_key]: {...new_state[alt_key], circuit_type: "p2p"}}
            } else if (! is_p2p_action(action) && is_p2p(state, action.name)) {
                new_state = {...new_state, [alt_key]: {...new_state[alt_key], circuit_type: ""}}
            }
            if (is_ckt_type_changed(new_state, state, action.name) && (is_p2p(new_state, action.name) || is_p2p(state, action.name))) {
                new_state = {...new_state, [action.name]: {...new_state[action.name], access_type: "", access_type_b: ""}}
                new_state = {...new_state, [alt_key]: {...new_state[alt_key], access_type: "", access_type_b: ""}}
            }
            break
        case CLEAR_DIVERSITY:
            new_state = {...def_state.ckts}
            break
        default:
            break
    }

    // diversity_results
    let diversity_results = {a_side: {}}
    
    let eth_diversity = eth_rules(new_state)
    let p2_diversity = p2p_rules(new_state, new_state.diversity)
    let access_diversity = access_rules(new_state, new_state.diversity)

    // console.log('new_state.diversity.a_side', new_state.diversity.a_side)

    // a_side
    diversity_results.a_side = combine_results(new_state.diversity, [eth_diversity, access_diversity])

    // console.log('diversity_results', diversity_results.a_side)
    // console.log('access_diversity', access_diversity)

    // b_side
    if (p2_diversity.b_side !== undefined) {
        diversity_results.b_side = combine_results({a_side: p2_diversity.b_side}, [{checked: access_diversity.checked_b, blocked: access_diversity.blocked_b}])
    }

    // console.log('diversity_results', diversity_results)

    new_state = {...new_state, diversity: diversity_results}

    return new_state
}

const top_level = (main) => (state = def_state, action) => main(state, action)

export {ckts, top_level}