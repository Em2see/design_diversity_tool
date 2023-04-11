import { Header } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { get as _get } from 'lodash'
import {connect} from 'react-redux'
import {DDStars} from '../Availability'
import {diversity_choosen_fn, calc_chosen_fn, check_access_fn} from './utils'
 
const StarsCalcC = (props) => {
    return (<Header as='h5' floated='right'> 
            <DDStars stars={props.rating} />
            <Header.Content>Design Rating</Header.Content>
        </Header>) 
}

// Point-to-Point
// 5-star; All solutions where all of the following selections have been chosen on both A-end and B-end
// 1. 2 x Service provider CPE, 2 x NTU, 2 x Building entrance, 2 x Local Exchange, 1 x Backbone node 
// 2. Where Local Access carrier HAS NOT been chosen
// 3. The 'customer location' and 'access technology' has no effect on the diversity rating 
// 4-star; All solutions whereby 6, 7, or 8 of the following selections have been selected;  2 x Service provider CPE, 2 x NTU, 2 x Building entrance, 2 x Local Exchange, Backbone node    
// 3-star; All solutions whereby 4 or 5 of the following selections have been selected; 2 x Service provider CPE, 2 x NTU, 2 x Building entrance, 2 x Local Exchange, Backbone node 
// 2-star; All solutions whereby 2 or 3 of the following selections have been selected; Service provider CPE, NTU, Building entrance, Local Exchange, Backbone node 
// 1-star; All solutions whereby 1 of the following selections have been selected; Service provider CPE, NTU, Building entrance, Local Exchange, Backbone node 

const calculate_rating_p2p = (ckts, diversity) => {
    const diversity_choosen = diversity_choosen_fn(diversity)
    const calc_chosen = calc_chosen_fn(diversity)
    // 5-star
    const chosen_sum = calc_chosen('a_side', ['cloud', 'cpe', 'ntu', 'entr', 'exchange']) + calc_chosen('b_side', ['cpe', 'ntu', 'entr', 'exchange'])
    
    let rating = 1
    if (diversity_choosen('a_side', ['cloud', 'cpe', 'ntu', 'entr', 'exchange']) && diversity_choosen('b_side', ['cpe', 'ntu', 'entr', 'exchange']) && !(diversity_choosen('a_side', ['lcar']) || diversity_choosen('b_side', ['lcar']))) {
        rating = 5
    } else if (diversity_choosen('a_side', ['cloud', 'cpe', 'ntu', 'entr', 'exchange']) && diversity_choosen('b_side', ['cpe', 'ntu', 'entr', 'exchange']) && (diversity_choosen('a_side', ['lcar']) || diversity_choosen('b_side', ['lcar']))) {
        rating = 4
    } else if (chosen_sum > 5 && chosen_sum < 9) {
        rating = 4
    } else if (chosen_sum > 3 && chosen_sum < 6) {
        rating = 3
    } else if (chosen_sum > 1 && chosen_sum < 4) {
        rating = 2
    } else {
        rating = 1
    }

    return rating
}

// Ethernet & Internet
// 5-star
// Ethernet & Ethernet; If all of the following 8 selections have been chosen:              CPE, NTU, Building Entrance, Exchange, Backbone, NNI L2A, Service Edge (this works)
// Ethernet & Internet, Internal AS; If all of the following 8 selections have been chosen: CPE, NTU, Building Entrance, Exchange, Backbone, NNI L2A, Service Edge (this works)
// Internet, Internal AS & Internet Internal AS; If all of the following 7 selections have been chosen: CPE, NTU, Building Entrance, Exchange, Backbone, NNI, L2A (this works)
// 
// 4-star
// Ethernet & Ethernet; If all of the following 5, 6, 7 selections have been chosen: CPE, NTU, Building Entrance, Exchange, Backbone, NNI L2A, Service Edge (this is now 6 or less)
// Ethernet & Internet, Internal AS; If all of the following 5, 6, 7 selections have been chosen: CPE, NTU, Building Entrance, Exchange, Backbone, NNI L2A, Service Edge (this is now 6 or less)
// Internet, Internal AS & Internet Internal AS; If all of the following 4, 5, 6 selections have been chosen: CPE, NTU, Building Entrance, Exchange, Backbone, NNI, L2A (this works)
// 
// 3-star
// Ethernet & Ethernet; If all of the following 3, 4 selections have been chosen: CPE, NTU, Building Entrance, Exchange, Backbone, NNI L2A, Service Edge (this is now 3 or less)
// Ethernet & Internet, Internal AS; If all of the following 3, 4 selections have been chosen: CPE, NTU, Building Entrance, Exchange, Backbone, NNI L2A, Service Edge (this is now 3 or less)
// Internet, Internal AS & Internet Internal AS; If all of the following 3 selections have been chosen: CPE, NTU, Building Entrance, Exchange, Backbone, NNI, L2A (this is now 3 or less)
// Internet, External AS; Any selection with 'DIA Wired' or 'DIA Wireless Radio PtP' selected (this does not work)
// 
// 2-star
// Ethernet & Ethernet; If all of the following 1, 2 selections have been chosen: CPE, NTU, Building Entrance, Exchange, Backbone, NNI L2A, Service Edge (this does not work)
// Ethernet & Internet, Internal AS; If all of the following 1, 2 selections have been chosen: CPE, NTU, Building Entrance, Exchange, Backbone, NNI L2A, Service Edge (this does not work)
// Internet, Internal AS & Internet Internal AS; If all of the following 1, 2 selections have been chosen: CPE, NTU, Building Entrance, Exchange, Backbone, NNI, L2A (this does not work)
// Internet, External AS; Any selection with 'Broadband Wired' selected (this does not work)
// 
// 1-star
// Ethernet & Ethernet; If 0 selections have been chosen: CPE, NTU, Building Entrance, Exchange, Backbone, NNI L2A, Service Edge (this does not work)
// Ethernet & Internet, Internal AS; If 0 selections have been chosen: CPE, NTU, Building Entrance, Exchange, Backbone, NNI L2A, Service Edge (this does not work)
// Internet, Internal AS & Internet Internal AS; If 0 selections have been chosen: CPE, NTU, Building Entrance, Exchange, Backbone, NNI, L2A (this does not work)
// Internet, External AS; Any selection with 'Wireless 2/3/4/5G' selected (this does not work)

const calculate_rating_eth = (ckts, diversity) => {
    let rating = 1
    let stars_rating = Array(8)
    const calc_chosen = calc_chosen_fn(diversity)
    const check_access = check_access_fn(ckts)
    let rating_info
    if (check_access({ckt_1: ['eth'], ckt_2: ['eth']}) || check_access({ckt_1: ['eth'], ckt_2: ['internet', 'ias']})) {
        stars_rating = [1, 2, 2, 3, 3, 4, 4, 4, 5]
        rating = stars_rating[calc_chosen('a_side', ['cpe', 'ntu', 'entr', 'exchange', 'cloud', 'nni', 'l2a', 'se']) - calc_chosen('a_side', ['lcar'])]
        rating_info = 'eth / eth or eth / internet_ias calcs = ' + calc_chosen('a_side', ['cpe', 'ntu', 'entr', 'exchange', 'cloud', 'nni', 'l2a', 'se'])
    } else if (check_access({ckt_1: ['internet'], ckt_2: ['internet', 'ias']})) {
        stars_rating = [1, 2, 2, 3, 4, 4, 4, 5]
        rating = stars_rating[calc_chosen('a_side', ['cpe', 'ntu', 'entr', 'exchange', 'cloud', 'nni', 'l2a']) - calc_chosen('a_side', ['lcar'])]
        rating_info = 'internet / internet_ias calcs = ' +  calc_chosen('a_side', ['cpe', 'ntu', 'entr', 'exchange', 'cloud', 'nni', 'l2a'])
    } else if (check_access({ckt_1: ['internet', 'eas', '', '5g'], ckt_2: ['internet']})) {
        rating = 1
        rating_info = 'internet_eas_5g / internet'
    } else if (check_access({ckt_1: ['internet', 'eas', '', '5g'], ckt_2: ['eth']})) {
        rating = 1
        rating_info = 'internet_eas_5g / eth'
    } else if (check_access({ckt_1: ['internet', 'eas', 'broad', 'wired'], ckt_2: ['internet']})) {
        rating = 2
        rating_info = 'internet_eas_broad_wired / internet'
    } else if (check_access({ckt_1: ['internet', 'eas', 'broad', 'wired'], ckt_2: ['eth']})) {
        rating = 2
        rating_info = 'internet_eas_broad_wired / eth'
    } else if (check_access({ckt_1: ['internet', 'eas', 'dia'], ckt_2: ['internet']})) {
        rating = 3
        rating_info = 'internet_eas_dia / internet'
    } else if (check_access({ckt_1: ['internet', 'eas', 'dia'], ckt_2: ['eth']})) {
        rating = 3
        rating_info = 'internet_eas_dia / eth'
    } 

    // console.log(rating_info, "rating = ", rating)

    return rating
}

const mapStateToProps = (state, ownProps) => {
    const ckts = _get(state, 'ckts')
    const diversity = _get(ckts, "diversity")
    let rating
    
    if (_get(ckts, 'ckt_1.circuit_type', 'p2p') === 'p2p') {
        rating  = calculate_rating_p2p(ckts, diversity)
    } else {
        rating = calculate_rating_eth(ckts, diversity)
    }

    return {rating}
}

const mapDispatchToProps = (dispatch) => ({})

StarsCalcC.propTypes = {
    rating: PropTypes.number
}

const StarsCalc = connect(
    mapStateToProps,
    mapDispatchToProps
)(StarsCalcC)


export {StarsCalc}
