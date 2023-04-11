import React from 'react'
import { RectElement, CloudElement } from '../DoubleElement'
import { Background, Switch } from '..'
import { Frame } from '../Frame'
import { Text, Set } from 'react-raphael'
import { Antenna, NNI } from ".."
import SimCard from '../SimCard'
import { PathDraw } from '../../containers'


const DiagramInternet = (props) => {
    const get_qty = props.get_qty
    const get_access = props.get_access
    const nni_visility = props.nni_visibility
    const bb_visibility = props.bb_visibility
    const line_guide_visibility = props.line_guide_visibility
    
    // console.log('DiagramInternet', get_qty("ntu"), get_qty("location"))

    return <>
        <Background type={"internet"}/>

        <Frame name="Location" x={-10} y={0} width={210} height={830} qty={get_qty("location")} >
            <RectElement color="sand"/>
        </Frame>

        <Frame name="Location" x={-10} y={0} width={210} height={830} qty={get_qty("location")} >
            
            <Frame name="CPE" x={0} width={70} qty={Math.max(get_qty("cpe"), get_qty("location"))}>
                <Frame.Out points={[{color:'blue', x: 100.0, y: 633.0}, {color:'red', x: 100.0, y: 233.0}]}/>
                
                <RectElement color="blue">
                    <Text>CPE</Text>
                </RectElement>
            </Frame>


            <Frame name="NTU" x={100} width={70} qty={Math.max(get_qty("ntu"), get_qty("location"))} >
                <RectElement color="blue">
                    <Text>NTU</Text>
                </RectElement>
                <Frame.In points={[{color:'blue', x: 131.0, y: 633.0}, {color:'red', x: 131.0, y: 233.0}]} />
                {get_access("ckt_1", "5g") ? 
                    <Frame.Out points={[{color:'red', x: 219.0, y: 233.0, attr: {'stroke-dasharray': '.'}}]}/> : 
                    <Frame.Out points={[{color:'red', x: 200.0, y: 233.0}]}/>}
                {get_access("ckt_2", "5g") ? 
                    <Frame.Out points={[{color:'blue', x: 219.0, y: 633.0, attr: {'stroke-dasharray': '.'}}]}/> : 
                    <Frame.Out points={[{color:'blue', x: 200.0, y: 633.0}]}/>}
           </Frame>

        </Frame>
        

        <Frame name="BB_ckt_1" visible={bb_visibility('ckt_1')} x={0} y={0} height={0} >
            <Text x={300} y={200} attr={{"font-weight": "bold", "font-size": "14px", "fill": 'red', text: "BB"}}/>
        </Frame>
        <Frame name="BB_ckt_2" visible={bb_visibility('ckt_2')} x={0} y={0} height={0} >
            <Text x={300} y={670} attr={{"font-weight": "bold", "font-size": "14px", "fill": 'blue', text: "BB"}}/>
        </Frame>
        <Frame name="Access" visible={get_access("ckt_1", "radio")} x={0} y={0} height={0} >
            <Antenna x={180} y={100} height={107} width={40}/>
            <Antenna x={240} y={100} height={107} width={40}/>
            <Frame.In points={[
                {color:'red', x: 235.0, y: 233.0}, 
                {color:'red', x: 310.0, y: 233.0, attr: {'stroke-dasharray': '.'}}]}
            />
            <Frame.Out points={[
                {color:'red', x: 254.0, y: 233.0, attr: {'stroke-dasharray': '.'}}, 
                {color:'red', x: 329.0, y: 233.0}]}
            />
        </Frame>

        <Frame name="Access" visible={get_access("ckt_2", "radio")} x={0} y={0} height={0} >
            <Antenna x={180} y={220} height={107} width={40}/>
            <Antenna x={240} y={220} height={107} width={40}/>
            <Frame.In points={[
                {color:'blue', x: 235.0, y: 633.0},
                {color:'blue', x: 310.0, y: 633.0, attr: {'stroke-dasharray': '.'}}]} />
            <Frame.Out points={[
                {color:'blue', x: 254.0, y: 633.0, attr: {'stroke-dasharray': '.'}}, 
                {color:'blue', x: 329.0, y: 633.0}]
            }/>
        </Frame>

        <Frame visible={nni_visility('single')} x={0} y={0} height={60} width={44} >
            <NNI x={172} y={112} height={60} width={44}/>
            <Frame.In points={[{color:'red', x: 213.0, y: 397.0}, {color:'blue', x: 213.0, y: 423.0}]} />
            <Frame.Out points={[{color:'red', x: 264.0, y: 397.0}, {color:'blue', x: 264.0, y: 423.0}]}/>
        </Frame>

        
        
        <Frame visible={nni_visility('ckt_1')} x={0} y={0} height={60} width={44}>
            <NNI name="nnnni" x={172} y={60} height={60} width={44}/>
            <Switch>
                <Text x={400} y={300} attr={{'font-color': 'red', "font-weight": "bold", "font-size": "12px"}}>{props.access_params.ckt_1.internet_access_type === 'broad' ? "BB": ""}</Text>
            </Switch>
            <Frame.In points={[{color:'red', x: 214.0, y: 233.0}]} />
            <Frame.Out points={[{color:'red', x: 263.0, y: 233.0}]}/>
        </Frame>

        <Frame visible={nni_visility('ckt_2')} x={0} y={0} height={60} width={44} >
            <NNI x={172} y={179} height={60} width={44} />
            <Frame.In points={[{color:'blue', x: 214.0, y: 633.0}]} />
            <Frame.Out points={[{color:'blue', x: 263.0, y: 633.0}]}/>
        </Frame>

        <Frame visible={get_access("ckt_1", "5g")} x={0} y={0} height={146} >
            <SimCard x={145} y={40} height={146} width={34}/>
        </Frame>

        <Frame visible={get_access("ckt_2", "5g")} x={0} y={0} height={146} >
            <SimCard x={145} y={160} height={146} width={34}/>
        </Frame>

        <Frame name="Access" visible={line_guide_visibility()} x={0} y={0} height={0} >
            {line_guide_visibility() ? 
            <div x={0} y={0}>
                <Frame.In points={[{color:'red', x: 298, y: 410}]} />
                <Frame.In points={[{color:'blue', x: 298, y: 430}]} />
                <Frame.Out points={[{color:'red', x: 300, y: 410}]}/>
                <Frame.Out points={[{color:'blue', x: 300, y: 430}]}/>
            </div> : null }
        </Frame>

        <Frame name="ExchangeA" x={315} y={0} width={80} height={830} qty={props.visibility["exchange"]} >
            <RectElement color="blue">
                <Text>{"Carrier\nLocal\nExchange"}</Text>
                <Text>
                    { (get_qty('lcar') === 2) ?
                        <Text value={2} attr={{'fill': 'red'}}>{"Carrier 1"}</Text> :
                        <Text value={1} attr={{'fill': 'black'}}>{"Carrier"}</Text>
                    }
                    <Text attr={{'fill': 'black'}}>{"Local\nExchange\nA"}</Text>
                </Text>
                <Text>
                    { (get_qty('lcar') === 2) ?
                        <Text value={2} attr={{'fill': 'blue'}}>{"Carrier 2"}</Text> :
                        <Text value={1} attr={{'fill': 'black'}}>{"Carrier"}</Text>
                    }
                    <Text attr={{'fill': 'black'}}>{"Local\nExchange\nB"}</Text>
                </Text>
            </RectElement>
            <Frame.In points={[{color:'red', x: 334.0, y: 233.0}, {color:'blue', x: 334.0, y: 633.0}]} />
            <Frame.Out points={[{color:'red', x: 415.0, y: 233.0}, {color:'blue', x: 415.0, y: 633.0}]}/>
        </Frame> 

        <Frame name="BackboneNode" x={440} y={0} width={100} height={830} qty={props.visibility["cloud"]} >
            <CloudElement color="blue" height={400}>
                <Text>{"Carrier\nBackbone\nAccess"}</Text>
                <Text>
                    { (get_qty('lcar') === 2) ?
                        <Text value={2} attr={{'fill': 'red'}}>{"Carrier 1"}</Text> :
                        <Text value={1} attr={{'fill': 'black'}}>{"Carrier"}</Text>
                    }
                    <Text attr={{'fill': 'black'}}>{props.access.ckt_1 === '5g' || props.access_params.ckt_1.as_type === 'eas'? "Internet\nAccess" : "Backbone\nAccess"}</Text>
                </Text>
                <Text>
                    { (get_qty('lcar') === 2) ?
                        <Text value={2} attr={{'fill': 'blue'}}>{"Carrier 2"}</Text> :
                        <Text value={1} attr={{'fill': 'black'}}>{"Carrier"}</Text>
                    }
                    <Text attr={{'fill': 'black'}}>{props.access.ckt_2 === '5g' || props.access_params.ckt_2.as_type === 'eas'? "Internet\nAccess" : "Backbone\nAccess"}</Text>
                </Text>
            </CloudElement>
            {props.visibility['cloud'].length === 2 || props.visibility['cloud'] === 2 ?
                <Frame.In points={[
                    get_access("ckt_1", "5g") ? {color:'red', x: 462.0, y: 233.0, attr: {'stroke-dasharray': '.'}} : {color:'red', x: 462.0, y: 233.0}, 
                    get_access("ckt_2", "5g") ? {color:'blue', x: 462.0, y: 633.0, attr: {'stroke-dasharray': '.'}} : {color:'blue', x: 462.0, y: 633.0}]} 
                /> :
                <Frame.In points={[{color:'red', x: 462.0, y: 367.0}, {color:'blue', x: 462.0, y: 500.0}]} />
            }
            {props.visibility['cloud'].length === 2 || props.visibility['cloud'] === 2 ?
                <Frame.Out points={[{color:'red', x: 558.75, y: 233.0}, {color:'blue', x: 558.75, y: 633.0}]}/> :
                <Frame.Out points={[{color:'red', x: 560.0, y: 367.0}, {color:'blue', x: 546.25, y: 500.0}]}/>
            }
        </Frame> 

        <Frame name="PTT_Network" x={550} y={0} width={240} height={830} qty={props.visibility['se']} >
            <Frame name="NNI" x={0} width={70} qty={props.visibility['nni']}>
                <RectElement color="blue">
                    <Text>NNI</Text>
                </RectElement>
                <Frame.In points={[{color:'red', x: 590.0, y: 233.0}, {color:'blue', x: 590.0, y: 633.0}]} />
                <Frame.Out points={[{color:'red', x: 661.25, y: 233.0}, {color:'blue', x: 661.25, y: 633.0}]}/>
            </Frame>
           
           <Frame name="L2A" x={120} width={70} qty={props.visibility['l2a']}>
                <RectElement color="blue">
                    <Text>L2A</Text>
                </RectElement>
                <Frame.In points={[{color:'red', x: 710.0, y: 233.0}, {color:'blue', x: 710.0, y: 633.0}]} />
                <Frame.Out points={[{color:'red', x: 781.25, y: 233.0}, {color:'blue', x: 781.25, y: 633.0}]}/>
           </Frame>

           <CloudElement color="blue" height={400} width={100} x={270} qty={props.visibility['se']} >
                {/* Service Edge / MPLS */}
                <Text>{props.access_params.ckt_1.as_type === 'ias' && props.access_params.ckt_2.as_type === 'ias'? "Internet" : "MPLS"}</Text>
                <Text>{props.access_params.ckt_1.as_type === 'ias'? "Internet" : "MPLS"}</Text>
                <Text>{props.access_params.ckt_2.as_type === 'ias'? "Internet" : "MPLS"}</Text>
            </CloudElement>
            {props.visibility['se'].length === 2 || props.visibility['se'] === 2 ?
                <Frame.In points={[{color:'red', x: 843.75, y: 233.0}, {color:'blue', x: 843.75, y: 633.0}]} /> :
                <Frame.In points={[{color:'red', x: 843.75, y: 367.0}, {color:'blue', x: 843.75, y: 500.0}]} />
            }
        </Frame>

        
        <PathDraw />
        
        
        <Set>
        </Set>
    </>
}


export default DiagramInternet