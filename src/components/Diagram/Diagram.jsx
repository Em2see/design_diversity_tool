import {Switch} from ".."
import DiagramInternet from "./DiagramInternet"
import DiagramP2P from "./DiagramP2P"


const get_carrier_name_fn = (props) => (side, ckt) => {
    let diversity
    if (side === "a_end") {
        diversity = 1
        diversity.includes('carrier')
    } else if (side === "b_end") {
        diversity.includes('carrier')
    }
    
}

const nni_visibility_fn = (get_access, get_qty) => (name)  => {
    let out = false
    switch(name) {
        case 'single':
            out = get_access("ckt_1", "wired") && get_access("ckt_2", "wired") && get_qty('entr') === 1
        break;
        case 'ckt_1':
            out = get_access("ckt_1", "wired") && !get_access("ckt_2", "wired")
            out |= (get_access("ckt_1", "wired") && get_access("ckt_2", "wired") && get_qty('entr') === 2)
        break;
        case 'ckt_2':
            out = get_access("ckt_2", "wired") && !get_access("ckt_1", "wired")
            out |= (get_access("ckt_1", "wired") && get_access("ckt_2", "wired") && get_qty('entr') === 2)
        break;
        case 'single_b':
            out = get_access("ckt_1_b", "wired") && get_access("ckt_2_b", "wired") && get_qty('entr_b') === 1
        break;
        case 'ckt_1_b':
            out = get_access("ckt_1_b", "wired") && !get_access("ckt_2_b", "wired")
            out |= (get_access("ckt_1_b", "wired") && get_access("ckt_2_b", "wired") && get_qty('entr_b') === 2)
        break;
        case 'ckt_2_b':
            out = get_access("ckt_2_b", "wired") && !get_access("ckt_1_b", "wired")
            out |= (get_access("ckt_1_b", "wired") && get_access("ckt_2_b", "wired") && get_qty('entr_b') === 2)
        break;
        default:
            out = false;
    }
    return Boolean(out)
}

const Diagram = (props) => {
    let background = props.background ? props.background : "p2p";
    const get_access = (ckt, name) => props.access[ckt] === name
    const get_qty = (name) => props.diversity.includes(name) ? 2 : 1
    const get_carrier_name = get_carrier_name_fn(props)
    const nni_visibility = nni_visibility_fn(get_access, get_qty)
    const bb_visibility = (ckt_name) => props.access_params[ckt_name].internet_access_type === 'broad'

    const line_guide_visibility = (side='a_side') => {
        const siffix = side === 'b_side' ? "_b" : ""
        
        return get_access("ckt_1" + siffix, "wired") && 
            get_access("ckt_2" + siffix, "wired") && 
            get_qty("entr" + siffix) === 2 &&
            get_qty("lcar" + siffix) === 2  // && get_qty("exchange") === 2
    }   
    
    let propz = {...props, get_access, get_qty, get_carrier_name, nni_visibility, bb_visibility, line_guide_visibility}
    
    return <Switch test={background}>
                <DiagramP2P value={"p2p"} {...propz} />
                <DiagramInternet value={null} {...propz}/>
            </Switch>
}

export default Diagram