import React from 'react'
import { Form, List, Header } from 'semantic-ui-react'
import { get as _get, filter as _filter } from 'lodash'
import { updateDiversity, blockDiversity, unblockDiversity } from '../actions'
import {connect} from 'react-redux'

const end_diversity = [
    {label:"Customer Location", value:'location'},
    {label:"Service Provider CPE", value:'cpe'},
    {label:"Carrier Network Termination Unit (NTU)", value:'ntu'},
    {label:"Building Entrance", value:'entr'},
    //{label:"Access Technology", value:'access'},
    {label:"Local Access Carrier", value:'lcar'},
    {label:"Carrier Local Exchange", value:'exchange'},
    {label:"Carrier Backbone Node", value:'cloud'},
]

const full_diversity = [
    ...end_diversity,
    {label:"Network-To-Network (NNI / UNI)", value:'nni'},
    {label:"Layer 2 Aggregation (L2A)", value:'l2a'},
    {label:"Service Edge (SE)", value:'se'},
]


const FullDiversity = (props) => {
    return (
      <List align="left">
        {full_diversity.map(item=> {
          return (
          <List.Item key={item.value + "_fitem"}>
            <Form.Checkbox 
                key={item.value} 
                side="a_side"
                name={item.value}
                label={item.label}
                checked={props.a_side.checked.includes(item.value)}
                disabled={props.a_side.blocked.includes(item.value)}
                onChange={props.onChange}/>
          </List.Item>)}
        )}
      </List>
    )
  }
  
  const P2PDiversity = (props) => {
    
    return (
      <React.Fragment>
      <Header  align="left">A-End</Header>
      <List align="left">
        {end_diversity.map(item=>
          <List.Item key={item.value + "_aitem"}>
            <Form.Checkbox 
                key={item.value}
                side="a_side"
                name={item.value}
                label={item.label}
                checked={props.a_side.checked.includes(item.value)}
                disabled={props.a_side.blocked.includes(item.value)}
                onChange={props.onChange} />
          </List.Item>
        )}
      </List>
      <Header align="left">B-End</Header>
      <List align="left">
        {_filter(end_diversity, i=> i.value !== 'cloud').map(item=>
          <List.Item key={item.value + "_bitem"}>
            <Form.Checkbox 
                key={item.value}
                side="b_side"
                name={item.value}
                label={item.label}
                checked={props.b_side.checked.includes(item.value)}
                disabled={props.b_side.blocked.includes(item.value)}
                onChange={props.onChange} />
          </List.Item>
        )}
      </List>
      </React.Fragment>
    )
  }
  
const DiversityC = (props) => {

    const onChange = (e, {checked, side, name}) => {
        let names = [name]
        // if (name === 'location' && checked) {
        //     names = [...names, "ntu", "cpe", "entr"]
        // }
        // if (name === 'lcar' && checked) {
        //     names = [...names, "ntu", "nni", "cloud"]
        // }        
        props.onChange(side, names, checked)
        // if (name === 'location') {
        //     if (checked) {
        //         props.block(side, ['ntu', 'cpe', 'entr'])
        //     } else {
        //         props.unblock(side, ['ntu', 'cpe', 'entr'])
        //     }
        // }
        // if (name === 'lcar') {
        //   if (checked) {
        //       props.block(side, ['ntu', 'nni', 'cloud'])
        //   } else {
        //       props.unblock(side, ['ntu', 'nni', 'cloud'])
        //   }
        // }
    }

    const propz = {...props, onChange}
    
    if (! props.two_side) {
        return <FullDiversity {...propz} />
    }
    else if (props.two_side) {
        return <P2PDiversity {...propz} />
    }
    return null;
}

const mapStateToProps = (state, ownProps) => {
	const diversity = _get(state, "ckts.diversity")
  const two_side = _get(state, "ckts.ckt_1.circuit_type", "internet") === 'p2p'
  return {...diversity, two_side}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onChange(side, name, is_adding){
			dispatch(updateDiversity(side, name, is_adding))
        },
        block(side, names) {
            dispatch(blockDiversity(side, names))
        },
        unblock(side, names) {
            dispatch(unblockDiversity(side, names))
        }
	}
}

const Diversity = connect(
    mapStateToProps,
    mapDispatchToProps
)(DiversityC)

  
export {Diversity, end_diversity, full_diversity}