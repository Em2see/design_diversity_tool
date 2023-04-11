import {Path, Set} from 'react-raphael'
import { update_size } from './utils'

const default_params = {height: 32, width: 32, x: 0, y: 0}

const Antenna = (propz) => {
    const size = default_params
    let props = update_size(propz, size, ['x', 'y'])
    let scale = {x: props.width / size.width, y: props.height / size.height}
    
    const data = [
        "m " + [10 + props.x, 14.695 + props.y].join(' '),
        "a 6.5 5 90 0 1 0 -10.07",
        "m -4.08 -4.625",
        "l 0 0",
        "a 9.75 5 90 0 0 0 18.91",
        "m 15.24 -14.69",
        "a 6.5 5 90 0 1 0.27 9.795",
        "m 4.625 4.625",
        "a 9.75 5 90 0 0 0.135 -18.095",
        "m -3.945 31.425",
        "l -5.17 -16.73",
        "h -2.445",
        "l -5.17 16.595",
        "m 1.22 -3.4",
        "h 10.48",
        "m -1.77 -5.715",
        "h -6.94",
        "m 5.79 -13.375",
        "a 2.5 2.5 90 1 1 -5 0",
        "a 2.5 2.5 90 0 1 5 0",
        "z"
    ]
    scale = [scale.x, scale.y].join(',')
    return <Set>
        <Path d={data} attr={{"stroke":"#000000", "stroke-width": 3}} transform={['S' + scale + ',0,0']}/>
    </Set>
    
}

export default Antenna