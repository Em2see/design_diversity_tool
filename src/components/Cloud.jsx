import {Path} from 'react-raphael'


const Cloud = (props) => {

    // props = update_size(_cloneDeep(props))
    const size = {height: 146, width:181 }
    let scale = {x: props.width /size.width, y: props.height / size.height}
    let data = [
        "m " + [18 + props.x / scale.x, 53 + props.y / scale.y].join(' '),
        "c -8.38 -31.45 26.21 -49.62 43.68 -29.7",
        "c -9.78 -17.12 28.65 -26.91 31.8 -3.5",
        "c -1.05 -22.71 32.49 -24.11 28.65 -5.59",
        "c 17.12 -28.65 40.18 -4.89 38.09 8.39",
        "c 20.26 1.05 17.82 31.1 6.99 36.69",
        "c 30.05 -23.76 2.79 79.32 -20.97 19.91",
        "c 24.81 38.79 -19.57 62.2 -26.91 38.44",
        "c -2.44 25.51 -37.03 41.23 -50.31 12.58",
        "c -13.98 12.23 -42.98 5.24 -41.93 -11.88",
        "c -26.91 4.89 -33.9 -33.55 -9.09 -30.75",
        "c -31.44 -5.94 -12.58 -49.62 0 -34.59"
    ]
    scale = [scale.x, scale.y].join(',')
    return <Path d={data} attr={{"stroke":"#000000", "stroke-width": 1, "fill": "#b6dde7"}} transform={['S' + scale + ',0,0']}/>
}

export default Cloud