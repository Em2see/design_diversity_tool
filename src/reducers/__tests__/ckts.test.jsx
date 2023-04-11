import { ckts } from '../ckts'
import { updateCkts } from '../../actions'
import { def_state } from '../../store/const'
import {empty_ckt_data} from './test_stores'

const init_state = {
    ...def_state.ckts,
    ckt_1: {
        access_type: 'wired',
        access_type_b: '',
        as_type: '',
        circuit_type: 'eth',
        internet_access_type: ''
      },
    ckt_2: {
    access_type: 'wired',
    access_type_b: '',
    as_type: '',
    circuit_type: 'eth',
    internet_access_type: ''
    }
}

test('Shold change to P2P', () => {
    const data = {...empty_ckt_data, circuit_type: 'p2p'}

    const new_state = ckts(undefined, updateCkts('ckt_1', data))
    
    expect(new_state).toEqual(
        expect.objectContaining({
            ckt_1: {
                access_type: '',
                access_type_b: '',
                as_type: '',
                circuit_type: 'p2p',
                internet_access_type: ''
            },
            ckt_2: {
                access_type: '',
                access_type_b: '',
                as_type: '',
                circuit_type: 'p2p',
                internet_access_type: '',
                p2p: false,
            }
        })
    )
})

test('Shold change to P2P', () => {
    const data = {...empty_ckt_data, 
        circuit_type: 'p2p',
        access_type: 'wired',
        access_type_b: 'radio'
    }

    let new_state = ckts(undefined, updateCkts('ckt_1', data))
    new_state = ckts(new_state, updateCkts('ckt_1', data))
    new_state = ckts(new_state, updateCkts('ckt_2', data))
    expect(new_state).toEqual(
        expect.objectContaining({
            ckt_1: {
                access_type: 'wired',
                access_type_b: 'radio',
                as_type: '',
                circuit_type: 'p2p',
                internet_access_type: ''
            },
            ckt_2: {
                access_type: 'wired',
                access_type_b: 'radio',
                as_type: '',
                circuit_type: 'p2p',
                internet_access_type: ''
            }
        })
    )
})

test('Should clean up after change to P2P', () => {
    const data = {...empty_ckt_data, circuit_type: 'p2p'}

    let new_state = ckts(init_state, updateCkts('ckt_1', data))
    new_state = ckts(new_state, updateCkts('ckt_1', data))
    new_state = ckts(new_state, updateCkts('ckt_2', data))
    
    expect(new_state).toEqual(
        expect.objectContaining({
            ckt_1: {
                access_type: '',
                access_type_b: '',
                as_type: '',
                circuit_type: 'p2p',
                internet_access_type: ''
            },
            ckt_2: {
                access_type: '',
                access_type_b: '',
                as_type: '',
                circuit_type: 'p2p',
                internet_access_type: ''
            }
        })
    )
})

test('Should clean up after change to P2P', () => {
    const data = {...empty_ckt_data, circuit_type: 'p2p'}

    let new_state = ckts(init_state, updateCkts('ckt_1', data))
    new_state = ckts(new_state, updateCkts('ckt_1', data))
    new_state = ckts(new_state, updateCkts('ckt_2', data))
    
    expect(new_state).toEqual(
        expect.objectContaining({
            ckt_1: {
                access_type: '',
                access_type_b: '',
                as_type: '',
                circuit_type: 'p2p',
                internet_access_type: ''
            },
            ckt_2: {
                access_type: '',
                access_type_b: '',
                as_type: '',
                circuit_type: 'p2p',
                internet_access_type: ''
            }
        })
    )
})


test('Should add blocked building entrance diversity eth/internet', () => {

    const data = {...empty_ckt_data, 
        circuit_type: 'eth',
        access_type: 'radio',
    }

    let new_state = ckts(init_state, updateCkts('ckt_1', data))
    
    expect(new_state).toEqual(
        expect.objectContaining({
            diversity: {
                a_side: { checked: ['entr'], blocked: ['entr'] }
            }
        })
    )

    new_state = ckts(new_state, updateCkts('ckt_1', {...data, access_type: 'wired'}))

    expect(new_state).toEqual(
        expect.objectContaining({
            diversity: {
                a_side: { checked: ['entr'], blocked: [] }
            }
        })
    )
})

test('Should add blocked building entrance diversity eth/internet', () => {

    const data = {...empty_ckt_data, 
        circuit_type: 'eth',
        access_type: 'radio',
    }

    let new_state = ckts(init_state, updateCkts('ckt_1', data))
    
    expect(new_state).toEqual(
        expect.objectContaining({
            diversity: {
                a_side: { checked: ['entr'], blocked: ['entr'] }
            }
        })
    )

    new_state = ckts(new_state, updateCkts('ckt_1', {...data, access_type: 'wired'}))

    expect(new_state).toEqual(
        expect.objectContaining({
            diversity: {
                a_side: { checked: ['entr'], blocked: [] }
            }
        })
    )
})


test('Should add blocked Service Edge for internet/internet', () => {

    const state = {...init_state,
        ckt_2: {...init_state.ckt_2,
            circuit_type: 'internet',
            access_type: ''
        }
    }

    const data = {...empty_ckt_data, 
        circuit_type: 'internet',
    }

    let new_state = ckts(state, updateCkts('ckt_1', data))
    
    expect(new_state).toEqual(
        expect.objectContaining({
            diversity: {
                a_side: { checked: [], blocked: ['se'] }
            }
        })
    )
})

test('Should add blocked Service Edge for eth/internet', () => {

    const data = {...empty_ckt_data,
        circuit_type: 'internet'
    }

    let new_state = ckts(init_state, updateCkts('ckt_1', data))
    
    expect(new_state).toEqual(
        expect.objectContaining({
            diversity: {
                a_side: { checked: ['entr', 'se'], blocked: ['entr', 'se'] }  // additional entr
            }
        })
    )

    new_state = ckts(new_state, updateCkts('ckt_1', {...data, circuit_type: 'eth'}))

    expect(new_state).toEqual(
        expect.objectContaining({
            diversity: {
                a_side: { checked: ['entr', 'se'], blocked: ['entr'] }  // additional entr
            }
        })
    )
})


test('Should add blocked Service Edge for internet/internet', () => {

    const state = {...init_state,
        ckt_2: {...init_state.ckt_1,
            circuit_type: 'internet',
            access_type: ''
        },
        ckt_1: {...init_state.ckt_2,
            circuit_type: '',
            access_type: ''
        }
    }

    const data = {...empty_ckt_data,
        circuit_type: 'internet'
    }

    let new_state = ckts(state, updateCkts('ckt_1', data))
    
    expect(new_state).toEqual(
        expect.objectContaining({
            diversity: {
                a_side: { checked: [], blocked: ['se'] }
            }
        })
    )

    new_state = ckts(new_state, updateCkts('ckt_2', {...data, circuit_type: 'eth'}))

    expect(new_state).toEqual(
        expect.objectContaining({
            diversity: {
                a_side: { checked: ['se'], blocked: ['se'] }
            }
        })
    )

    new_state = ckts(new_state, updateCkts('ckt_1', {...data, as_type: 'eas'}))
    
    expect(new_state).toEqual(
        expect.objectContaining({
            diversity: {
                a_side: { checked: ['cloud', 'se'], blocked: ['cloud', 'nni', 'l2a', 'se'] }
            }
        })
    )
})

test('Should add blocked Service Edge for eas & broad', () => {

    const state = {...init_state,
        ckt_2: {...init_state.ckt_2,
            circuit_type: 'internet',
            access_type: ''
        },
        ckt_1: {...init_state.ckt_1,
            circuit_type: 'internet',
            access_type: ''
        }
    }

    const data = {...empty_ckt_data,
        circuit_type: 'internet',
        as_type: 'eas'
    }

    let new_state = ckts(state, updateCkts('ckt_1', {...data, as_type: 'eas'}))

    expect(new_state).toEqual(
        expect.objectContaining({
            diversity: {
                a_side: { checked: ['cloud'], blocked: ['cloud', 'nni', 'l2a', 'se'] }
            }
        })
    )

    new_state = ckts(new_state, updateCkts('ckt_1', {...data, internet_access_type: 'broad'}))

    expect(new_state).toEqual(
        expect.objectContaining({
            diversity: {
                a_side: { checked: ['ntu', 'cloud'], blocked: ['ntu', 'entr', 'exchange', 'cloud', 'nni', 'l2a', 'se'] }  // missing
            }
        })
    )
})


test('Should add blocked Service Edge for eas & broad', () => {

    const state = {...init_state,
        ckt_2: {...init_state.ckt_2,
            circuit_type: 'internet',
            access_type: ''
        },
        ckt_1: {...init_state.ckt_1,
            circuit_type: 'internet',
            as_type: 'eas',
            internet_access_type: 'dia',
            access_type: ''
        }
    }

    const data = {...empty_ckt_data,
        circuit_type: 'internet',
        as_type: 'eas',
        internet_access_type: 'dia',
        access_type: '5g'
    }

    let new_state = ckts(state, updateCkts('ckt_1', data))
    
    expect(new_state).toEqual(
        expect.objectContaining({
            diversity: {
                a_side: { checked: ['cloud'], blocked: ['exchange', 'cloud', 'nni', 'l2a', 'se'] }
            }
        })
    )
})