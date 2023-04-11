import { Paper, Raphael as _Raphael } from 'react-raphael'
import React from 'react'
import { MAIN_SIZE } from '../components/consts'
import { Diagram } from '../components/Diagram'
import { get as _get, toInteger } from 'lodash'
import { connect } from 'react-redux'
import { paperSave } from '../actions'
import { extend_raphael } from '../3rd_modules/raphael.export'
import { Text, Line } from 'react-raphael'

extend_raphael(_Raphael)

class DrawC extends React.Component{
    constructor(props) {
        super(props);
        this.paper = React.createRef();
    }

    saveSVG(svgString) {
        let a = document.createElement('a');
        a.download = 'diagram_' + ("" + Math.random()).substring(2, 7) + '.svg';
        a.type = 'image/svg+xml';
        let blob = new Blob([svgString], {"type": "image/svg+xml"});
        let webkitURL = undefined
        a.href = (window.URL || webkitURL).createObjectURL(blob);
        a.click();
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.paperSave !== this.props.paperSave && this.props.paperSave) {
            setTimeout(()=> {
                let svgString = this.paper.current.paper.toSVG() //this.paper.current.paper.canvas.innerHTML// 
                this.saveSVG(svgString)
                this.props.onPaperSave()
            }, 500);
            
        }
    }

    renderGrid(width, height) {
        let out = []
        let offset_w = toInteger(width / 40);
        let offset_h = toInteger(height / 20);
        for (let i=0; i < width; i+=offset_w) {
            out.push(<Line key={'v'+i} x1={i} y1={0} x2={i} y2={height} attr={{'stroke':"gray"}} />)
            if ((Math.floor(i / offset_w) + 0) % 2) {
                out.push(<Text key={'vt'+i} x={i} y={height - 5} attr={{'font-size':'8px', 'stroke':"black"}} text={i * MAIN_SIZE.std_width / MAIN_SIZE.width + ''} />)
            }
            
        }
        for (let i=0; i < height; i+=offset_h) {
            out.push(<Line key={'h'+i} x1={0} y1={i} x2={width} y2={i} attr={{'stroke':"gray"}} />)
            out.push(<Text key={'ht'+i} x={15} y={i} attr={{'font-size':'8px', 'stroke':"black"}} text={i * MAIN_SIZE.std_height / MAIN_SIZE.height +''} />)
        }
        
        return out;
    }

    render(){
        return (<Paper ref={this.paper} width={this.props.width} height={this.props.height}>
                    <Diagram {...this.props} /> 
                </Paper>)
    }
}

const get_visibility = (access, diversity, access_params) => {
    let out = {exchange: 0, cloud: 0, nni: 0, l2a: 0, se: 0}

    // location
    if (access.ckt_1 === '5g' || access.ckt_2 === '5g') {
        out.exchange = [access.ckt_1 !== '5g', access.ckt_2 !== '5g']
    } else {
        out.exchange = diversity.includes("exchange") ? 2 : 1
    }

    // cloud; Carrier Backbone Access
    if (access.ckt_1 === '5g' || access.ckt_2 === '5g') {
        out.cloud = 2
    } else {
        out.cloud = diversity.includes("cloud") ? 2 : 1
    }

    // nni
    if (access.ckt_1 === '5g' || access.ckt_2 === '5g') {
        out.nni = [access.ckt_1 !== '5g', access.ckt_2 !== '5g']
    } else {
        out.nni = diversity.includes("nni") ? 2 : 1
    }
    
    // l2a
    if (access.ckt_1 === '5g' || access.ckt_2 === '5g') {
        out.l2a = [access.ckt_1 !== '5g', access.ckt_2 !== '5g']
    } else {
        out.l2a = diversity.includes("l2a") ? 2 : 1
    }

    // se
    if (access.ckt_1 === '5g' || access.ckt_2 === '5g') {
        out.se = [access.ckt_1 !== '5g', access.ckt_2 !== '5g']
    } else if ((access_params.ckt_1.circuit_type === 'internet' && access_params.ckt_2.circuit_type === 'eth') || (access_params.ckt_2.circuit_type === 'internet' && access_params.ckt_1.circuit_type === 'eth')){
        out.se = 2

    }
    if (out.se === 0) {
        out.se = diversity.includes("se") ? 2 : 1
    }
    

    // check 
    if (access_params.ckt_1.as_type === 'eas' || access_params.ckt_2.as_type === 'eas') {
        ['se', 'l2a', 'nni'].forEach(item => {
            let response
            response = [access_params.ckt_1.as_type !== 'eas', access_params.ckt_2.as_type !== 'eas']
            if (Array.isArray(out[item])) {
                response = out[item].map((v, i)=> response[i] & v)
            }
            out[item] = response
        })
    }

    // console.log("visibility", access_params, out, access)

    return out
}

const mapStateToProps = (state, ownProps) => {
    let state_diversity = _get(state, "ckts.diversity")
    const ckts = _get(state, "ckts")
    const draw = _get(state, "draw")
    let diversity = [...state_diversity.a_side.checked]
    if (state_diversity.b_side !== undefined) {
        diversity = [...diversity, ...state_diversity.b_side.checked.map(i => i + "_b")]
    } else {
        diversity = [...diversity, ...state_diversity.a_side.checked.map(i => i + "_b")]
    }
    
    let access = {ckt_1: ckts.ckt_1.access_type, 
                  ckt_2: ckts.ckt_2.access_type,
                  ckt_1_b: ckts.ckt_1.access_type_b,
                  ckt_2_b: ckts.ckt_2.access_type_b}
    
    let access_params = {ckt_1: {as_type: ckts.ckt_1.as_type, circuit_type: ckts.ckt_1.circuit_type, internet_access_type:ckts.ckt_1.internet_access_type},
                         ckt_2: {as_type: ckts.ckt_2.as_type, circuit_type: ckts.ckt_2.circuit_type, internet_access_type:ckts.ckt_2.internet_access_type}}
    
    let visibility = get_visibility(access, diversity, access_params)

    return {background: draw.background, paperSave: draw.paperSave, diversity, access, access_params, visibility, height: draw.height, width: draw.width}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onPaperSave(){
            dispatch(paperSave())
		},
	}
}

const Draw = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawC)



export default Draw;