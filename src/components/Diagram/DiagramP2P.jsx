import { RectElement, CloudElement } from '../DoubleElement'
import { Background } from '..'
import { Frame } from '../Frame'
import { Text } from 'react-raphael'
import { Antenna, NNI } from ".."
import { PathDraw } from '../../containers'
import { random } from 'lodash'


const DiagramP2P = (props) => {
    const get_qty = props.get_qty
    const nni_visility = props.nni_visibility
    const get_access = props.get_access
    const line_guide_visibility = props.line_guide_visibility

    return <>
        <Background type={"p2p"}/>
        
        <Frame name="Location" x={-10} y={0} width={210} height={830} >
            
            <RectElement color="sand"  qty={get_qty("location")}/>
            
            <Frame name="CPE" x={0} width={70} qty={get_qty("cpe")} loc_qty={get_qty("location")}>
                <Frame.Out points={[{color:'blue', x: 100.0, y: 633.3}, {color:'red', x: 100.0, y: 233.3}]}/>
                <RectElement color="blue">
                    <Text>CPE</Text>
                </RectElement>
                
            </Frame>
            
            <Frame name="NTU" x={100} width={70} qty={get_qty("ntu")} loc_qty={get_qty("location")}>
                <RectElement color="blue">
                    <Text>NTU</Text>
                </RectElement>
                <Frame.In points={[{color:'blue', x: 131.25, y: 633.3}, {color:'red', x: 131.25, y: 233.3}]} />
                <Frame.Out points={[{color:'blue', x: 200.0, y: 633.3}, {color:'red', x: 200.0, y: 233.3}]}/>
            </Frame>
            
        </Frame>
        
        <Frame name="Access_1_a" visible={get_access("ckt_1", "radio")} x={0} y={0} height={0} >
            <Antenna x={180} y={100} height={107} width={40}/>
            <Antenna x={240} y={100} height={107} width={40}/>
            <Frame.In points={[
                {color:'red', x: 235.0, y: 233.3}, 
                {color:'red', x: 310.0, y: 233.3, attr: {'stroke-dasharray': '.'}}]}
            />
            <Frame.Out points={[
                {color:'red', x: 253.75, y: 233.3, attr: {'stroke-dasharray': '.'}}, 
                {color:'red', x: 328.75, y: 233.3}]}
            />
        </Frame>

        <Frame name="Access_2_a" visible={get_access("ckt_2", "radio")} x={0} y={0} height={0} >
            <Antenna x={180} y={220} height={107} width={40}/>
            <Antenna x={240} y={220} height={107} width={40}/>
            <Frame.In points={[
                {color:'blue', x: 235.0, y: 633.3},
                {color:'blue', x: 310.0, y: 633.3, attr: {'stroke-dasharray': '.'}}]} />
            <Frame.Out points={[
                {color:'blue', x: 253.75, y: 633.3, attr: {'stroke-dasharray': '.'}}, 
                {color:'blue', x: 328.75, y: 633.3}]
            }/>
        </Frame>

        <Frame visible={nni_visility('single')} x={0} y={0} height={58} width={44} >
            <NNI x={172} y={116} height={58} width={44}/>
            <Frame.In points={[{color:'red', x: 212.5, y: 396.0}, {color:'blue', x: 212.5, y: 423.0}]} />
            <Frame.Out points={[{color:'red', x: 263.75, y: 396.0}, {color:'blue', x: 263.75, y: 423.0}]}/>
        </Frame>

        <Frame visible={nni_visility('ckt_1')} x={0} y={0} height={58} width={44} >
            <NNI x={172} y={63} height={58} width={44}/>
            <Frame.In points={[{color:'red', x: 213.75, y: 233.3}]} />
            <Frame.Out points={[{color:'red', x: 262.5, y: 233.3}]}/>
        </Frame>

        <Frame visible={nni_visility('ckt_2')} x={0} y={0} height={58} width={44} >
            <NNI x={172} y={184} height={58} width={44}/>
            <Frame.In points={[{color:'blue', x: 213.75, y: 633.3}]} />
            <Frame.Out points={[{color:'blue', x: 262.5, y: 633.3}]}/>
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

        <Frame name="ExchangeA" x={320} y={0} width={80} height={830} qty={get_qty("exchange")} >
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
            <Frame.In points={[{color:'blue', x: 340.0, y: 633.3}, {color:'red', x: 340.0, y: 233.3}]} />
            <Frame.Out points={[{color:'blue', x: 421.3, y: 633.3}, {color:'red', x: 421.3, y: 233.3}]}/>
        </Frame> 

        <Frame name="BackboneNode" x={430} y={0} width={100} height={830} qty={get_qty("cloud")} >
            <CloudElement color="blue" height={400}>
                <Text>{"Carrier\nBackbone\nNode"}</Text>
                <Text>
                    { (get_qty('lcar') === 2) ?
                        <Text value={2} attr={{'fill': 'red'}}>{"Carrier 1"}</Text> :
                        <Text value={1} attr={{'fill': 'black'}}>{"Carrier"}</Text>
                    }
                    <Text attr={{'fill': 'black'}}>{"Backbone\nNode\nA"}</Text>
                </Text>
                <Text>
                    { (get_qty('lcar') === 2) ?
                        <Text value={2} attr={{'fill': 'blue'}}>{"Carrier 2"}</Text> :
                        <Text value={1} attr={{'fill': 'black'}}>{"Carrier"}</Text>
                    }
                    <Text attr={{'fill': 'black'}}>{"Backbone\nNode\nB"}</Text>
                </Text>
            </CloudElement>
            {get_qty("cloud") === 2 ?
                <Frame.In points={[{color:'blue', x: 453.75, y: 633.3}, {color:'red', x: 453.75, y: 233.3}]} /> :
                <Frame.In points={[{color:'blue', x: 453.75, y: 500.0}, {color:'red', x: 453.75, y: 366.0}]} />
            }
            {get_qty("cloud") === 2 ?
                <Frame.Out points={[{color:'blue', x: 550.0, y: 633.3}, {color:'red', x: 550.0, y: 233.3}]}/> :
                <Frame.Out points={[{color:'blue', x: 537.5, y: 500.0}, {color:'red', x: 550.0, y: 366.0}]}/>
            }
            
        </Frame> 

        {/* B-side */
        }

        <Frame name="ExchangeB" x={560} y={0} width={80} height={830} qty={get_qty("exchange_b")} >
            <RectElement color="blue">
                <Text>{"Carrier\nLocal\nExchange"}</Text>
                <Text>
                    { (get_qty('lcar_b') === 2) ?
                        <Text value={2} attr={{'fill': 'red'}}>{"Carrier 1"}</Text> :
                        <Text value={1} attr={{'fill': 'black'}}>{"Carrier"}</Text>
                    }
                    <Text attr={{'fill': 'black'}}>{"Local\nExchange\nA"}</Text>
                </Text>
                <Text>
                    { (get_qty('lcar_b') === 2) ?
                        <Text value={2} attr={{'fill': 'blue'}}>{"Carrier 2"}</Text> :
                        <Text value={1} attr={{'fill': 'black'}}>{"Carrier"}</Text>
                    }
                    <Text attr={{'fill': 'black'}}>{"Local\nExchange\nB"}</Text>
                </Text>
            </RectElement>
            <Frame.In points={[{color:'blue', x: 581.3, y: 633.3}, {color:'red', x: 581.3, y: 233.3}]} />
            <Frame.Out points={[{color:'blue', x: 660.0, y: 633.3}, {color:'red', x: 660.0, y: 233.3}]}/>
        </Frame>

        <Frame name="Access" visible={line_guide_visibility('b_side')} x={0} y={0} height={0} >
            {line_guide_visibility('b_side') ? 
            <div x={0} y={0}>
                <Frame.In points={[{color:'red', x: 698, y: 410}]} />
                <Frame.In points={[{color:'blue', x: 698, y: 430}]} />
                <Frame.Out points={[{color:'red', x: 700, y: 410}]}/>
                <Frame.Out points={[{color:'blue', x: 700, y: 430}]}/>
            </div> : null }
        </Frame>                    

        <Frame name="Location" x={760} y={0} width={210} height={830} qty={get_qty("location_b")} >
            <RectElement color="sand"/>

            <Frame name="NTU" x={-5} width={70} l={Math.random(100)} qty={get_qty("ntu_b")} loc_qty={get_qty("location_b")}>
                <RectElement color="blue">
                    <Text>NTU</Text>
                </RectElement>
                <Frame.In points={[{color:'blue', x: 796.25, y: 633.3}, {color:'red', x: 796.25, y: 233.3}]} />
                <Frame.Out points={[{color:'blue', x: 865.0, y: 633.3}, {color:'red', x: 865.0, y: 233.3}]}/>
            </Frame>

            <Frame name="CPE" x={100} width={70} qty={get_qty("cpe_b")} loc_qty={get_qty("location_b")}>
                <RectElement color="blue">
                    <Text>CPE</Text>
                </RectElement>
                <Frame.In points={[{color:'blue', x: 900.0, y: 633.3}, {color:'red', x: 900.0, y: 233.3}]} />
            </Frame>
            
        </Frame>

        

        <Frame name="Access_1_b" visible={get_access("ckt_1_b", "radio")} x={0} y={0} height={0} >
            <Antenna x={530} y={100} height={107} width={40}/>
            <Antenna x={590} y={100} height={107} width={40}/>
            <Frame.In points={[
                {color:'red', x: 672.5, y: 233.3},
                {color:'red', x: 747.5, y: 233.3, attr: {'stroke-dasharray': '.'}}]}
            />
            <Frame.Out points={[
                {color:'red', x: 691.3, y: 233.3, attr: {'stroke-dasharray': '.'}},
                {color:'red', x: 766.25, y: 233.3}]}
            />
        </Frame>

        <Frame name="Access_2_b" visible={get_access("ckt_2_b", "radio")} x={0} y={0} height={0} >
            <Antenna x={530} y={220} height={107} width={40}/>
            <Antenna x={590} y={220} height={107} width={40}/>
            <Frame.In points={[
                {color:'blue', x: 672.5, y: 633.3},
                {color:'blue', x: 747.5, y: 633.3, attr: {'stroke-dasharray': '.'}}]} />
            <Frame.Out points={[
                {color:'blue', x: 691.3, y: 633.3, attr: {'stroke-dasharray': '.'}},
                {color:'blue', x: 766.25, y: 633.3}]}/>
        </Frame>

        <Frame name="NNI_Access_12_b" visible={nni_visility('single_b')} x={0} y={0} height={60} width={44} >
            <NNI x={590} y={113} height={60} width={44}/>
            <Frame.In points={[{color:'red', x: 740.0, y: 396.0}, {color:'blue', x: 740.0, y: 423.0}]} />
            <Frame.Out points={[{color:'red', x: 790.0, y: 396.0}, {color:'blue', x: 790.0, y: 423.0}]}/>
        </Frame>

        <Frame name="NNI_Access_1_b" visible={nni_visility('ckt_1_b')} x={0} y={0} height={60} width={44} >
            <NNI x={590} y={60} height={60} width={44}/>
            <Frame.In points={[{color:'red', x: 740.0, y: 233.3}]} />
            <Frame.Out points={[{color:'red', x: 790.0, y: 233.3}]}/>
        </Frame>

        <Frame name="NNI_Access_2_b" visible={nni_visility('ckt_2_b')} x={0} y={0} height={60} width={44} >
            <NNI x={590} y={178} height={60} width={44}/>
            <Frame.In points={[{color:'blue', x: 740.0, y: 633.3}]} />
            <Frame.Out points={[{color:'blue', x: 790.0, y: 633.3}]}/>
        </Frame>
        
        <PathDraw />
        
    </>
}


export default DiagramP2P