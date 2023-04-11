import { Path, Set, Ellipse } from 'react-raphael'
import { update_size } from './utils'
// import { clone as _clone } from 'lodash'

const default_params = {height: 17, width: 35, x:0, y:0 }

const NNI = (propz) => {
    const size = default_params
    let props = update_size(propz, size, ['x', 'y'])
    let scale = {x: props.width / size.width, y: props.height / size.height}
    const rect_data = [
        "m ", [props.x, props.y].join(' '),
        "h 33 a 9 3 90 0 1 0 16.5 h -32.955 z"
    ]    
    let scale_txt = [scale.x, scale.y].join(',')
    return <Set>
        <Path d={rect_data} attr={{"stroke":"#567597", "stroke-width": 2, "fill": "#bfbfbf"}} transform={['S' + scale_txt + ',0,0']}/>
        <Ellipse x={props.x * scale.x} y={(props.y * scale.y + props.height / 2) } ry={props.height / 2.1} rx={props.height / (5 * scale.y)} attr={{"fill":"#d8d8d8","stroke":"#567597", "stroke-width": 2,}} />
    </Set>
}

NNI.default_size = default_params

export default NNI