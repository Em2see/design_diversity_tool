import { Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { get as _get } from 'lodash'
import {connect} from 'react-redux'
import {calc_chosen_fn, check_access_fn} from './utils'


const CostCalcC = (props) => {
    return (<>
        <Header as='h5' floated='right'>Cost Rating</Header>
        <Header as='h3' floated='right'>{Array(props.rating).fill().map(i => '$').join('')}</Header>
        </>) 
}

const calculate_rating_p2p = (ckts, diversity) => {
    let rating = 1
    let cost_rating = [3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5]
    const calc_chosen = calc_chosen_fn(diversity)
    rating = calc_chosen('a_side', ['cpe', 'ntu', 'entr', 'exchange', 'lcar']) + calc_chosen('b_side', ['cpe', 'ntu', 'entr', 'exchange', 'lcar'])
    //console.log('calculate_rating_p2p', calc_chosen('a_side', ['cpe', 'ntu', 'entr', 'exchange', 'lcar']), calc_chosen('b_side', ['cpe', 'ntu', 'entr', 'exchange', 'lcar']), rating)
    rating = cost_rating[rating]
    //console.log('calculate_rating_p2p', calc_chosen('a_side', ['cpe', 'ntu', 'entr', 'exchange', 'lcar']), calc_chosen('b_side', ['cpe', 'ntu', 'entr', 'exchange', 'lcar']), rating)
    
    return rating
}

const clalculate_rating_eth = (ckts, diversity) => {
    let rating = 1
    const calc_chosen = calc_chosen_fn(diversity)
    const check_access = check_access_fn(ckts)
    const calculated_rating = calc_chosen('a_side', ['cpe', 'ntu', 'entr', 'exchange', 'lcar'])
    let rule_description

    if (check_access({ckt_1: ['internet', '', 'broad', '5g'], ckt_2: ['internet']})) {
        rule_description = ('triggered "internet broad 5G"')
        rating = 1
    } else if (check_access({ckt_1: ['internet', '', 'broad', '5g'], ckt_2: ['eth']})) {
        rule_description = ('triggered "internet broad 5G + eth"')
        rating = 1
    } else if (check_access({ckt_1: ['internet', '', 'broad', 'wired'], ckt_2: ['internet', '', 'broad', 'wired']})) {
        rule_description = ('triggered "internet broad wired"')
        rating = 2
    } else if (check_access({ckt_1: ['internet', '', 'broad', 'wired'], ckt_2: ['eth']})) {
        rule_description = ('triggered "internet broad wired + eth"')
        rating = 2
    } else if (calculated_rating > 2) {
        rule_description = ('triggered calculated rating')
        rating = calculated_rating
    } else {
        rule_description = ('triggered default')
        rating = 2
    }

    // console.log(rule_description, 'calculated_rating = ', calculated_rating)
    
    return rating
}

const mapStateToProps = (state, ownProps) => {
    const diversity = _get(state, "ckts.diversity")
    const ckts = _get(state, 'ckts')
    let rating
    
    if (_get(ckts, 'ckt_1.circuit_type', 'p2p') === 'p2p') {
        rating = calculate_rating_p2p(ckts, diversity)
    } else {
        rating = clalculate_rating_eth(ckts, diversity)
    }

    return {rating}
}

const mapDispatchToProps = (dispatch) => ({})

CostCalcC.propTypes = {
    rating: PropTypes.number
}

const CostCalc = connect(
    mapStateToProps,
    mapDispatchToProps
)(CostCalcC)


export {CostCalc}