import { ckts } from '../ckts'
import { updateCkts } from '../../actions'
import { def_state } from '../../store/const'

test('Shold change to P2P', () => {
    const data = {
        access_type: '',
        access_type_b: '',
        as_type: '',
        circuit_type: 'p2p',
        internet_access_type: ''
    }

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
    const data = {
        access_type: 'wired',
        access_type_b: 'radio',
        as_type: '',
        circuit_type: 'p2p',
        internet_access_type: ''
    }

    let new_state = ckts(undefined, updateCkts('ckt_1', data))
    new_state = ckts(new_state, updateCkts('ckt_1', data))
    new_state = ckts(new_state, updateCkts('ckt_2', data))
    expect(new_state).toEqual({
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
            },
            diversity: {
                a_side: { checked: [], blocked: [] },
                b_side: { checked: [], blocked: [] }
            },
            diversity_results: { a_side: { blocked: [], checked: [] } }
        })
})

test('Should clean up after change to P2P', () => {
    
    const state = {
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

    const data = {
        access_type: '',
        access_type_b: '',
        as_type: '',
        circuit_type: 'p2p',
        internet_access_type: ''
    }

    let new_state = ckts(state, updateCkts('ckt_1', data))
    new_state = ckts(new_state, updateCkts('ckt_1', data))
    new_state = ckts(new_state, updateCkts('ckt_2', data))
    
    expect(new_state).toEqual({
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
            },
            diversity: {
                a_side: { checked: [], blocked: [] },
                b_side: { checked: [], blocked: [] }
            },
            diversity_results: { a_side: { blocked: [], checked: [] } }
        })
})