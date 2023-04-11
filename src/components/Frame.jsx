import React from 'react'
import { addPoints } from '../containers'
import { Text, Set } from 'react-raphael'
import { Switch } from '../components'
import { update_object_props, update_size } from "./utils"

const FrameOut = (props) => {
    addPoints(props.points.map(p => ({...p, type: 'out'})))
    return null
}

const FrameIn = (props) => {
    addPoints(props.points.map(p => ({...p, type: 'in'})))
    return null
}

const FramePoint = (props) => {
    
}

const process_children = (props, depth, offset) => (item, i) => {
    // let width
    if (item.type.name === FrameOut.name || item.type.name === FrameIn.name) {
        let elem, propz, child_props
        if (Array.isArray(props.qty)) {
            propz = {...item.props}
            propz.points = props.qty.reduce((acc, v, i) => {
                if (v) {
                    child_props = propz.points[i]
                    
                    // if (props.qty !== 2 || (Array.isArray(propz.qty) && propz.qty.length !== 2)) {
                    //     acc.push(child_props.filter(i => i.color === 'black' )) 
                    // }
                    acc.push(child_props.filter(i => i.color !== 'black' ))
                }
                return acc
            }, [])
            elem = React.createElement(item.type, propz, item.props.children);
        } else if (props.qty === false) {
            elem = null
        } else {
            child_props = item.props
            //if (child_props.points !== undefined) {
            //    child_props.points = child_props.points.map(p => update_size(p))
            //}
            elem = React.createElement(item.type, child_props, item.props.children);
        }
        return elem
    }

    if (item.type.name === Switch.name) {
        return process_children(props, depth, offset)
    }

    let item_props = update_object_props(item.props, item.type.default_size)
        
    let propz = {...item_props, 
        key: item.type.name + "_" +  String(i), //+ "_" + ("" + Math.random()).substring(1, 5), 
        x: (props.x || 0) + (item_props.x || 0) + offset, 
        y: (props.y || 0) + (item_props.y || 0) + offset, 
        height: (item_props.height ? item_props.height : props.height) - 2 * offset, 
        width: item_props.width !== undefined ? item_props.width : props.width,
        qty: item_props.qty ? item_props.qty : props.qty,
        offset: offset,
        depth: depth + 1,
    }

    if (item_props.height) {
        if (propz.qty === 2 || (Array.isArray(propz.qty) && propz.qty.length === 2)) {
            propz.height = props.height - 2 * offset
        } else {
            if (props.height !== undefined) {
                propz.y += (props.height - item_props.height) / 2
            }
            
        }
        
    }

    if (item.type && item.type.name === Text.name) {
        propz = update_size(propz)
        let element = React.createElement(item.type, propz, item.props.children)
        return <Set>{element}</Set>
    }
    
    // propz = update_size(propz)
    // console.log('Frame end', props.name, item.type, propz, item.props.children)
    return React.createElement(item.type, propz, item.props.children); 
}

class Frame extends React.Component {
    // x, y, width, height
    // offset
    
    render() {
        const props = this.props
        const depth = props.depth ? props.depth : 0
        let offset = 0.025 * props.height;
        offset = isNaN(offset) || offset === undefined ? 0 : offset
        
        if (props.visible === false) {
            return null;
        }
        // if (['CPE', 'NTU'].includes(props.name)) {
        //     console.log('Frame', props.qty)
        // }
        
        return React.Children.map(props.children, process_children(props, depth, offset))
    }
}

Frame.In = FrameIn
Frame.Out = FrameOut
Frame.Point = FramePoint

export {Frame}