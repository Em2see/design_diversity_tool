import React from 'react'
import { Header, Label } from 'semantic-ui-react'
import { findIndex as _findIndex } from "lodash"
import { get as _get } from 'lodash'
import { applyCode } from '../actions'
import { useSelector, useDispatch } from 'react-redux'
import { circuit_options, as_options, internet_access_options, access_options, params } from './Circuit'
import { full_diversity } from './Diversity'

const GROUP_SEP = '-'
const PREFIX = 'V2'
const DIVERSITY_BASE = 16

let ckt_params = {
    'circuit_type': circuit_options,
    'as_type': as_options, 
    'access_type': access_options,
    'access_type_b': access_options,
    'internet_access_type': internet_access_options}

ckt_params = params.reduce((acc, item) => {
    acc[item] = ckt_params[item]
    return acc
    }, {})

const zeroPad = (num, places, base=10) => num.toString(base).padStart(places, '0')

const ckt_coder = (ckt) => {
    let out_params = params.map(item => {
        let res = 0
        let positions = ckt_params[item].length > 10 ? 2 : 1
        if (ckt[item] !== undefined) {
            res = _findIndex(ckt_params[item], i => i.value === ckt[item]) + 1
        }
        return zeroPad(res, positions)
    })
    return out_params.join('')
}

const ckt_decoder = (code) => {
    let ckts = code.map(code_str => {
        let pos = 0
        let ckt = params.reduce((acc, param) => {
            let positions = ckt_params[param].length > 10 ? 2 : 1
            let index = parseInt(code_str.substring(pos, pos + positions), 10)
            // console.log(param, code_str.substring(pos, pos + positions), index)
            pos += positions
            if (index > 0) {
                acc[param] = ckt_params[param][index - 1].value
            } else {
                acc[param] = ''
            }
            
            return acc
        }, {})
        return ckt
    })
    return {ckt_1: ckts[0], ckt_2: ckts[1]}
}

const devirsity_coder = (ckts) => {
    let out = ['a_side', 'b_side'].reduce((acc, side) => {
        if (!ckts[side] === undefined) {
            return acc
        } 
        let side_code = full_diversity.map(i => +_get(ckts, side + '.checked', []).includes(i.value)).join('')
        // console.log('side_code', side_code, parseInt(side_code, 2), parseInt(side_code, 2).toString(DIVERSITY_BASE))
        side_code = zeroPad(parseInt(side_code, 2), 4, DIVERSITY_BASE);
        acc.push(side_code)
        return acc
    }, [])
    return out
}

const devirsity_decoder = (code) => {
    let out = code.map(code_str => {
        let side_code = zeroPad(parseInt(code_str, DIVERSITY_BASE).toString(2), full_diversity.length, 2)
        //console.log(code_str, side_code, parseInt(code_str, DIVERSITY_BASE))
        return side_code.split('').reduce((acc, is_checked, i) => {
            if (is_checked === '1') {
                acc.push(full_diversity[i].value)
            }
            return acc
        }, []) 
    })

    return {a_side: {checked: out[0], blocked:[]}, 
            b_side: out.length > 1 ? {checked: out[1], blocked:[]} : {checked: [], blocked:[]}}
}

const CoderC = (props) => {
    const [copy, setCopying] = React.useState(false)
    const dispatch = useDispatch()
    const {ckts, draw} = useSelector(state => state)
    let code = [PREFIX]

    code = [...code, ...['ckt_1', 'ckt_2'].map(i => ckt_coder(ckts[i]))]
    code = [...code, ...devirsity_coder(ckts.diversity)].join(GROUP_SEP)

    const copy_clipboard = () => {
        navigator.clipboard.writeText(code)
        setCopying(true)
        setTimeout(() => setCopying(false), 1000)
    }
    // console.log('code', draw.code, code, '///', draw.code !== undefined && draw.code !== '', '/////', draw.code !== code)
    if (draw.code && draw.code !== '' && draw.code !== code) {
        let new_ckts = ckt_decoder(draw.code.split('-').slice(1, 3))
        let new_diversity = devirsity_decoder(draw.code.split('-').slice(3, 6))
        setTimeout(() => {
            // console.log(new_ckts)
            dispatch(applyCode(new_ckts, new_diversity))
        }, 300)
    }

    return <Header as='a' size='small' floated='right' onClick={() => copy_clipboard()}>
         {copy ? <Label basic color='red' pointing='right'>Copying</Label> : null}
         Unique design code {code}
        </Header>
}

export default CoderC

export {ckt_decoder, devirsity_decoder}