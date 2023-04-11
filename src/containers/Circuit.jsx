import React from 'react'
import { Form, Table, Header, Label } from 'semantic-ui-react'
import { findIndex as _findIndex } from "lodash"
import { get as _get } from 'lodash'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateCkts} from '../actions'
import MediaQuery from 'react-responsive'


const circuit_options = [
    {key: 'p2p', label:"Point-To-Point", value:'p2p'},
    {key: 'eth', label:"Ethernet", value:'eth'},
    {key: 'internet', label:"Internet", value:'internet'}
]

const as_options = [
    {key: 'ias', label:"Internal AS", value:'ias'},
    {key: 'eas', label:"External AS", value:'eas'}
]

const internet_access_options = [
    {key: 'broad', label:"Broadband", value:'broad'},
    {key: 'dia', label:"Direct Internet Access (DIA)", value:'dia'}
]

const access_options = [
    {key: 'wired', label:"Wired", value:'wired'},
    {key: 'radio', label:"Wireless P-t-P Radio", value:'radio'},
    {key: '5g', label:"Wireless 2/3/4/5G", value:'5g'}
]

const params = ['access_type', 'access_type_b', 'as_type', 'circuit_type', 'internet_access_type']


const RadioLine = (props) =>
  props.options.map((item)=>{
    return (
      <Table.Cell key={item.value + "_cell"}>
        <Form.Radio {...item} 
          checked={props.value === item.value}
          parent_name={props.name}
          onChange={props.onChange}
          disabled={Array.isArray(props.disabled) ? props.disabled.includes(item.value) : props.disabled}/>
      </Table.Cell>
    )
  })

  
  const CircuitRadioLine = (props) => {
  let disabled_list = []
  if (props.disabled) {
    disabled_list = [0, 1, 2]
  }
  if (!props.p2p && !props.primary) {
    disabled_list = [0]
  }
  if (props.value === 'p2p' && !props.primary) {
    disabled_list = [0, 1, 2]
  }

  // console.log(props, props.p2p, props.primary, disabled_list)

  return circuit_options.map((item, i)=>{
    return (
      <Table.Cell key={item.value + "_cell"}>
        <Form.Radio {...item} 
          checked={props.value === item.value} 
          onChange={props.onChange}
          disabled={disabled_list.includes(i)}/>
      </Table.Cell>
    )
  })
}

const CIRCUIT_WIDTH = 1532

class CircuitC extends React.Component{
    constructor(props) {
      super(props);
      this.onChange = this.handleChange.bind(this)
    }
  
    handleChange(e, {value, parent_name}) {
      let out, out_name
      if (_findIndex(circuit_options, {value}) >= 0) {
        out = {...this.props, circuit_type: value, as_type: "", internet_access_type: "", access_type: "", access_type_b: ""}
        // console.log('handleChange', value)
        // if (value === "p2p") {
        //   out = {...out, }
        // }
        this.props.onChange(this.props.state_key, out)
      }
      if (_findIndex(as_options, {value}) >= 0) {
        this.props.onChange(this.props.state_key, {...this.props, as_type: value, internet_access_type: "", access_type: ""})
      }
      if (_findIndex(internet_access_options, {value}) >= 0) {
        this.props.onChange(this.props.state_key, {...this.props, internet_access_type: value, access_type: ""})
      }
      if (_findIndex(access_options, {value}) >= 0) {
        out_name = parent_name === "b_end" ? "access_type_b" : "access_type"
        this.props.onChange(this.props.state_key, {...this.props, [out_name]: value})
      }
    }

    isDisabled(name) {
      let out 
      switch(name) {
        case "circuit_type":
          out = !this.props.primary && this.props.circuit_type === 'p2p'
        break;
        case "as_type":
          out = this.props.circuit_type !== "internet"
        break;
        case "internet_access_type":
          out =  (this.props.circuit_type !== "internet") || (this.props.as_type === "") || (this.props.as_type === 'ias')
        break;
        case "access_type":
          out = (this.props.circuit_type === "internet") && (this.props.internet_access_type !== "")
          out |= ((this.props.as_type === 'ias') && (this.props.internet_access_type === ""))
          out = !out
          if ((this.props.circuit_type === "p2p") || (this.props.circuit_type === "eth") || (this.props.as_type === 'ias')) {
            out = ['5g']
          }
          if (this.props.internet_access_type === 'broad') {
            out = ['radio']
          }
        break;
        default:
          out = false;
      }
      return out
    }
    
  
    render() {
      return (
        <Table basic='very'>
          <Table.Body>
            <Table.Row>
              <MediaQuery minWidth={CIRCUIT_WIDTH}>
                <Table.Cell key="circuit">
                  <Header as='h4'>{this.props.label}</Header>
                </Table.Cell>
              </MediaQuery>
              <CircuitRadioLine 
                disabled={this.isDisabled("circuit_type")}
                primary={this.props.primary}
                p2p={this.props.p2p}
                value={this.props.circuit_type} 
                onChange={this.onChange}
              />
            </Table.Row>
            <Table.Row>
              <MediaQuery minWidth={CIRCUIT_WIDTH}>
                <Table.Cell/>
              </MediaQuery>
              
              <RadioLine 
                options={as_options}
                disabled={this.isDisabled("as_type")}
                value={this.props.as_type}
                onChange={this.onChange}
              />
              <Table.Cell/>
            </Table.Row>
            <Table.Row>
              <MediaQuery minWidth={CIRCUIT_WIDTH}>
                <Table.Cell/>
              </MediaQuery>
              <RadioLine
                options={internet_access_options}
                disabled={this.isDisabled("internet_access_type")}
                value={this.props.internet_access_type}
                onChange={this.onChange}
              />
              <Table.Cell/>
            </Table.Row>
            
            <MediaQuery maxWidth={CIRCUIT_WIDTH}>
              {(this.props.circuit_type === "p2p") ?
                <Table.Row>
                  <Table.Cell>
                    <Label ribbon>A-End</Label>
                  </Table.Cell>
                </Table.Row>
              :null}
            </MediaQuery>
            
            <Table.Row>
              <MediaQuery minWidth={CIRCUIT_WIDTH}>
                <Table.Cell>{(this.props.circuit_type === "p2p") ? "A-End" : ""}</Table.Cell>
              </MediaQuery>
              
              <RadioLine
                options={access_options}
                name="a_end"
                disabled={this.isDisabled("access_type")}
                value={this.props.access_type}
                onChange={this.onChange}
              />
              <Table.Cell/>
            </Table.Row>
            
            {(this.props.circuit_type === "p2p") ? <>
              <MediaQuery maxWidth={CIRCUIT_WIDTH}>
                <Table.Row>
                  <Table.Cell>
                    <Label ribbon>B-End</Label>
                  </Table.Cell>
                </Table.Row>
              </MediaQuery>
              <Table.Row>
                <MediaQuery minWidth={CIRCUIT_WIDTH}>
                  <Table.Cell>B-End</Table.Cell>
                </MediaQuery>
                <RadioLine
                  options={access_options}
                  name="b_end"
                  disabled={this.isDisabled("access_type")}
                  value={this.props.access_type_b}
                  onChange={this.onChange}
                />
                <Table.Cell/>
              </Table.Row>
            </>
            :null}
          </Table.Body>
        </Table>
      )
    }
  }


const mapStateToProps = (state, ownProps) => {
	const ckts = _get(state, "ckts")
    
    return {...ckts[ownProps.state_key]}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onChange(ckt_name, values){
            let out_values = Object.keys(values).reduce((acc, key) => {
                if (params.includes(key)) {
                    acc[key] = values[key]
                }
                return acc
            }, {})
			dispatch(updateCkts(ckt_name, out_values))
		},
	}
}

CircuitC.propTypes = {
    label: PropTypes.string,
    primary: PropTypes.bool,
    state_key: PropTypes.string,
}

const Circuit = connect(
    mapStateToProps,
    mapDispatchToProps
)(CircuitC)


export {Circuit, circuit_options, as_options, internet_access_options, access_options, params}