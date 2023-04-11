import React from 'react'
import {updatePathPoints} from '../actions'
import { get as _get } from 'lodash'
import {Set, Circle, Line} from 'react-raphael'
import {connect} from 'react-redux'
import {uniqWith as _uniqWith, isEqual as _isEqual, filter as _filter, sortBy as _sortBy, clone as _clone} from 'lodash'
import {update_size} from "../components/utils"

let point_collection = []

class PathDrawC extends React.Component{
    componentDidUpdate(prevProps, prevState) {
        if ((this.props.points.length === 0)) {
            setTimeout(()=> {
                this.props.updatePoints(point_collection)
            }, 300)
        }
    }

    componentDidMount() {
        setTimeout(()=> {
            if ((this.props.points.length !== point_collection.length)) {
                this.props.updatePoints(point_collection)
            }
        }, 300)
    }

    getLineOnPoints(left, right) {
        return ({
            x1: left.x,
            y1: left.y,
            x2: right.x,
            y2: right.y,
            attr: left.attr ? {...left.attr, 'stroke-width': 5, 'stroke': left.color} : {'stroke-width': 5, 'stroke': left.color}
        })
    }

    prepareLines(color, points) {
        let line_points = _filter(points, p => p.color === color)
        line_points = _sortBy(line_points, [i => i.x])
        line_points = line_points.reduce(({out_point, list}, lpoint) => {
            let point = update_size(lpoint)
            if (point.type === 'out') {
                out_point = point
            } else if (point.type === 'in' && out_point !== null) {
                if (Math.abs(out_point.x - point.x) < 5) {
                    list.push(this.getLineOnPoints(out_point, point))
                } else {
                    let mid_x = (out_point.x + point.x) / 2
                    list.push(this.getLineOnPoints(out_point, {...out_point, x: mid_x}))
                    list.push(this.getLineOnPoints({...out_point, x: mid_x}, {...point, x: mid_x}))
                    list.push(this.getLineOnPoints({...point, x: mid_x}, point))
                }
                out_point = null

            }
            return {out_point, list}
        }, {out_point: null, list:[]})
        return line_points.list
    }
    
    render(){
        // console.log('PathDrawC.render', this.props.points)
        return <Set>
            {this.props.points.map((lpoint, i) => {
                let point = update_size(_clone(lpoint))
                return <Circle key={"frame_out_" + ("" + Math.random()).substring(2, 7)} x={point.x} y={point.y} r={3} attr={{'fill': point.color}} />
            }
                
            )}
            {this.prepareLines('blue', this.props.points).map((propz, i) => 
                <Line key={"line_blue_" + ("" + Math.random()).substring(2, 7)} {...propz}/>
            )}
            {this.prepareLines('red', this.props.points).map((propz, i) => 
                <Line key={"line_red_" + ("" + Math.random()).substring(2, 7)} {...propz}/>
            )}
        </Set>
    }
}

const addPoints = (points) => {
    point_collection = _uniqWith([...point_collection, ...points], _isEqual)
}

const cleanPoints = () => {
    point_collection = []
}

const mapStateToProps = (state, ownProps) => {
    const points = _get(state, "draw.points", [])
    const {height, width} = _get(state, "draw")
    // console.log("Points", points)
    return {points, height, width}
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePoints(points) {
            dispatch(updatePathPoints(points))
        }
    }
}


const PathDraw = connect(
    mapStateToProps, mapDispatchToProps
)(PathDrawC)

PathDrawC.points = point_collection;

export {PathDraw, addPoints, cleanPoints};