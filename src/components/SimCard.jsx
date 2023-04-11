import {Path, Set} from 'react-raphael'
import { update_size } from './utils'

const default_params = {height: 43, width:27, x:0, y:0}

const SimCard = (propz) => {
    const size = default_params
    let props = update_size(propz, size, ['x', 'y'])
    let scale = {x: props.width / size.width, y: props.height / size.height}
    // console.log(scale, props)
    const base_data = [
        "m " + [0 + props.x, 1.5 + props.y].join(' '),
        "v 39",
        "a 1.5 1.5 90 0 0 1.5 1.5",
        "h 24",
        "a 1.5 1.5 90 0 0 1.5 -1.5",
        "v -33",
        "a 1.5 1.5 90 0 0 -0.597 -1.101",
        "l -4.728 -5.784",
        "a 1.5 1.5 90 0 0 -1.419 -0.663",
        "h -18.756",
        "m 0 0.048",
        "a 1.5 1.5 90 0 0 -1.5 1.5",
        "z"
    ]

    const chip_data = [
        "m " + [6 + props.x, 16.5 + props.y].join(' '),
        "a 3 3 90 0 0 -2.7 2.4",
        "v 15.6",
        "a 3 3 90 0 0 2.7 3",
        "h 14.1",
        "a 3 3 90 0 0 3 -3",
        "v -15.6",
        "a 3 3 90 0 0 -3 -2.4",
        "z"
    ]

    const circuits_data = [
        "M " + [8.124 + props.x, 16.5 + props.y].join(' '),
        "v 6",
        "l 0.876 1.5",
        "h 8.4",
        "l 1.2 -1.5",
        "v -6",
        "m -5.4 0",
        "v 7.5",
        "m -3 0",
        "v 6",
        "h 6.9",
        "l 1.5 1.5",
        "v 6",
        "m -15.3 -10.5",
        "h 6.9",
        "m -1.8 10.5",
        "v -6",
        "l 1.8 -1.5",
        "m -6.9 2.1",
        "h 5.1",
        "m 7.896 -5.169",
        "h 6.804",
        "m -9.9 3.069",
        "v 7.5"
    ]
    scale = [scale.x, scale.y].join(',')
    return <Set>
        <Path d={base_data} attr={{"stroke":"#000000", "stroke-width": 0.5, "fill": "#e5e5e5"}} transform={['S' + scale + ',0,0']}/>
        <Path d={chip_data} attr={{"stroke":"#9f9875", "stroke-width": 1, "fill": "#e8ca83"}} transform={['S' + scale + ',0,0']}/>
        <Path d={circuits_data} attr={{"stroke":"#ab9b61", "stroke-width": 1}} transform={['S' + scale + ',0,0']}/>
        </Set>
}

SimCard.default_params = default_params

export default SimCard