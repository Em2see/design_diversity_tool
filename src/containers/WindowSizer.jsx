import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {applyWindowSize} from '../actions'
import {CURRENT_SIZE, MAIN_SIZE} from '../components/consts'

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const prepare_w_size = (w_width, w_height) => {
    let width, height
    if (w_width > 2 * MAIN_SIZE.width) {
        width = MAIN_SIZE.width
        height = MAIN_SIZE.height
    } else {
        width = w_width / 2
        height = MAIN_SIZE.height * width / MAIN_SIZE.width
    }

    return {width, height}
}

const WindowSizer = () => {
    const { height: w_height, width: w_width } = useWindowDimensions();
    const dispatch = useDispatch()
    const {draw} = useSelector(state => state)
    
    let {width, height} = prepare_w_size(w_width, w_height)
    
    if (draw.height !== height || draw.width !== width) {
        //console.log(draw.height, draw.width, height, width)
        setTimeout(() => {
            // console.log(new_ckts)
            dispatch(applyWindowSize(width, height))
            CURRENT_SIZE.width = width
            CURRENT_SIZE.height = height
        }, 100)
    }
    return null;
    return (
      <div>
        width: {width} ~ height: {height}<br/>
        w_width: {w_width} ~ w_height: {w_height}<br/>
      </div>
    );
  }

export default WindowSizer