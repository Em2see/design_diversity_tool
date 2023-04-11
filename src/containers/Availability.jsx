import { Table } from 'semantic-ui-react'
import { Dropdown, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { get as _get } from 'lodash'
import {applyTemplate} from '../actions'
import {connect} from 'react-redux'


const template_options = [
    {key: 0, value: "V2-10020-10020-0000-0000", text: '-----'},
    {key: 1, value: "V2-10020-30231-0088-0000"},
    {key: 2, value: "V2-10020-10231-0088-0000"},
    {key: 3, value: "V2-10020-10020-0107-0000"},
    {key: 4, value: "V2-10020-10020-009f-0000"},
    {key: 5, value: "V2-10020-10020-01df-0000"},
    {key: 6, value: "V2-11020-11020-0087-0000", text: 'Layer 2 Aggregation Geographic Diversity'},
    {key: 7, value: "V2-11020-11020-00ac-0000", text: 'Carrier Diversity'},
    {key: 8, value: "V2-10020-11020-01bf-0000", text: 'Layer 2 Aggregation Geographic & Carrier diversity'},
    {key: 9, value: "V2-10231-30231-0088-0000", text: '$'},
    {key: 10, value: "V2-10020-10231-0088-0000", text: '$$'},
    {key: 11, value: "V2-10020-10020-019f-0000", text: '$$$'},
    {key: 12, value: "V2-10020-10020-01df-0000", text: '$$$$'},
    {key: 13, value: "V2-10020-10020-01ff-0000", text: '$$$$$'},
]

const DDStars = (props) => {
    let out = [];
    for(let i=0; i<props.stars; i++) {
        out.push(<Icon key={"stars_" + i} name="star" size='small' color='yellow'/>)
    }
    return out
}

const starsOptions = template_options.map(({key, text}) => 
({
    key,
    text: text ? text : key + ' stars',
    value: key,
    content: text ? text : (<DDStars stars={key}/>),
}))

let StarsTemplateC = (props) => {
    const onChangeHandler = (e, {value}) => props.onChange(value)
    
    return (
    <Table basic='very'>
        <Table.Body>
        <Table.Row>
            <Table.Cell>Availability Templates</Table.Cell>
            <Table.Cell>
            <Dropdown selection fluid options={starsOptions} value={props.stars} onChange={onChangeHandler}/>
            </Table.Cell>
        </Table.Row>
        </Table.Body>
    </Table>) 
}

const mapStateToProps = (state, ownProps) => {
	const availability = _get(state, "availability")
	return {stars: availability.stars}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onChange(stars){
            dispatch(applyTemplate(stars, template_options.filter(({key, value}) => key === stars)[0].value))
		},
	}
}

StarsTemplateC.propTypes = {
    stars: PropTypes.number
}

const StarsTemplate = connect(
    mapStateToProps,
    mapDispatchToProps
)(StarsTemplateC)


export {StarsTemplate, DDStars}
