import { Set, Rect,Text } from 'react-raphael'
import React from 'react'
import {FIELD_SIZE} from './consts'
import {update_size, prepare_text_params} from './utils'

//{x:0,y:FIELD_SIZE,width:38,height:170,attr:{"fill":"#ffffff","stroke-width":1}},

const Background = (props) => {
    const p2p_data = [
        {x:0,y:0,width:125,height:FIELD_SIZE,attr:{"fill":"#fde9d8","stroke-width":1}},
        {x:125,y:0,width:750,height:FIELD_SIZE,attr:{"fill":"#daeef3","stroke-width":1}},
        {x:875,y:0,width:125,height:FIELD_SIZE,attr:{"fill":"#fde9d8","stroke-width":1}},
        
        {x:0,y:FIELD_SIZE,width:125,height:170,attr:{"fill":"#bfbfbf","stroke-width":1},  text: "PTT"},
        {x:125,y:FIELD_SIZE,width:250,height:170,attr:{"fill":"#f2f2f2","stroke-width":1}, text: "Access Carrier Local\nNetwork"},
        {x:375,y:FIELD_SIZE,width:250,height:170,attr:{"fill":"#f2f2f2","stroke-width":1}, text: "Access Carrier Backbone\nNetwork"},
        {x:625,y:FIELD_SIZE,width:250,height:170,attr:{"fill":"#f2f2f2","stroke-width":1}, text: "Access Carrier Local\nNetwork"},
        {x:875,y:FIELD_SIZE,width:125,height:170,attr:{"fill":"#bfbfbf","stroke-width":1}, text: "PTT"},
    ]

    const internet_data = [
        {x:0,y:0,width:125,height:FIELD_SIZE,attr:{"fill":"#fde9d8","stroke-width":1}},
        {x:125,y:0,width:500,height:FIELD_SIZE,attr:{"fill":"#daeef3","stroke-width":1}},
        {x:625,y:0,width:375,height:FIELD_SIZE,attr:{"fill":"#e5dfec","stroke-width":1}},
        
        {x:0,y:FIELD_SIZE,width:125,height:170,attr:{"fill":"#bfbfbf","stroke-width":1},  text: "PTT"},
        {x:125,y:FIELD_SIZE,width:250,height:170,attr:{"fill":"#f2f2f2","stroke-width":1}, text: "Access Carrier Local\nNetwork"},
        {x:375,y:FIELD_SIZE,width:250,height:170,attr:{"fill":"#f2f2f2","stroke-width":1}, text: "Access Carrier Backbone\nNetwork"},
        {x:625,y:FIELD_SIZE,width:375,height:170,attr:{"fill":"#bfbfbf","stroke-width":1}, text: "PTT Network"},
    ]

    let data = props.type === "internet" ? internet_data : p2p_data

    data = data.map(i => update_size(i))

    return (
        <Set>    
        {
            data.map(({text, ...ele}, pos) => 
                <React.Fragment key={"bg_rect_" + pos}>
                    <Rect {...ele} />
                    {text !== undefined ? <Text {...prepare_text_params({...ele, attr: {}}, text)}/> : null }
                </React.Fragment>
            )
        }
        </Set>
    )
}

export default Background