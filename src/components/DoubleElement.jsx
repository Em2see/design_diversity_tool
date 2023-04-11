import { FIELD_SIZE } from './consts'
import { update_size, prepare_text_params } from './utils'
import { Cloud } from '.'
import React from 'react'
import { Set, Rect, Text } from 'react-raphael'
import { cloneDeep as _cloneDeep, get as _get } from 'lodash'

// dont' like such a solution
// possibly we need to create TextGroup
const get_text_data = (children, attr) => {
    let out = [""]
    let res
    if (React.Children.count(children) > 0) {
        out = React.Children.toArray(children).reduce((acc, item) => {
            if (typeof(item) === 'string') {
                acc.push({text: item, attr: attr})
            } else if (item.type.name === Text.name) {
                res = get_text_data(item.props.children, item.props.attr)
                if (res.length === 1) {
                    res = res[0]
                }
                acc.push(res)
            }
            
            return acc
        }, [])
    }

    return out
}

const TextDraw = ({text, element}) => {
    let out = null
    let line_space = parseFloat(_get(prepare_text_params(element, text), "attr.font-size", '0'))
    line_space = line_space * 2 + line_space / 2
    
    let top_position = element.y - line_space / 2
    let element_props = {...element}
    element_props.attr = {}

    if (text === undefined) {
        return out
    }
    
    if (!Array.isArray(text)) {
        element.attr = _get(text, 'attr', {'fill': 'black'})
        out = <Text {...prepare_text_params(element, text.text)}/>
    } else {
        out = text.map((itext, i) => {
            element_props = {...element_props}
            element_props.y = top_position + i * line_space
            return <TextDraw key={i + '_text_list'} element={element_props} text={itext} />
        })
    }
    
    return out
}


class DoubleElement extends React.Component {
    
    elemRender(elem, props) {
        switch (elem) {
            case Rect:
                return <Rect {...props}/>
            case Cloud:
                return <Cloud {...props}/>
            default:
                return React.createElement(elem, props, null)
        }
    }

    render() {
        const props = this.props
        const depth = props.depth ? props.depth : 1
        let indent = 0; // 0.025 + 0.025 * depth;
        
        // console.log("PROPS", props.qty)
        const qty = Array.isArray(props.qty) ? props.qty.length : props.qty

        const colors = {"blue": "#b6dde7", "dark_blue": "#92ccdc", "gray": "#f2f2f2", "sand": "#fbd4b4"};
        let color = props.color ? props.color : "blue";
        color = colors[color]
        let text_data = [""]
        
        text_data = get_text_data(this.props.children)
        
        let data = [{x: props.x + indent * props.height, 
                     y: props.y + 2 * indent * props.height, 
                     width: props.width, 
                     height: (1 - 4 * indent) * props.height,
                     r: 0.02 * FIELD_SIZE / (depth + 1),
                     attr:{"fill":color,"stroke-width":1},
                     text: text_data[0]}]

        if (qty === 2) {
            indent = props.offset
            let top_element = _cloneDeep(data[0])
            let bottom_elem = _cloneDeep(data[0])

            top_element.height = top_element.height / 2 - (indent * depth)
            bottom_elem.height = top_element.height

            bottom_elem.y += bottom_elem.height + indent * depth * 2
            if (text_data.length === 3) {
                top_element.text = text_data[1]
                bottom_elem.text = text_data[2]
            } else if (text_data.length === 2){
                bottom_elem.text = text_data[0]
                bottom_elem.text = text_data[1]
            } else if (text_data.length === 1){
                bottom_elem.text = text_data[0]
            }
            data = []

            if (Array.isArray(props.qty)) {
                props.qty[0] && data.push(top_element)
                props.qty[1] && data.push(bottom_elem)
            } else {
                data.push(top_element)
                data.push(bottom_elem)
            }
            
        }
        data = data.map(i => update_size(i))
        
        return data.map(({text, ...ele}, pos) => {
                    // let ele2 = {...ele, className: 'newClass'}
                    return <Set key={"diagram_rect_" + pos}>
                            {this.elemRender(this.props.elem, ele)} 
                            <TextDraw text={text} element={ele}/>
                        </Set>
                })
            }
}


const RectElement = (props) => {
    let var2 
    if (props.color !== 'sand') {
        var2 = 1 + Math.random()
    }
 
    return <DoubleElement {...props} elem={Rect} var={var2}/>
}

const CloudElement = (props) => {
    // if (props.visible === false) {
    //     return null
    // }
    return <DoubleElement {...props} elem={Cloud} />
}

export {RectElement, CloudElement}