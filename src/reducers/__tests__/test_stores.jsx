
const initial_state = {
    draw: {
      background: 'eth',
      a_side: {
        diversity: [],
        access_a: '',
        access_b: ''
      },
      b_side: {
        diversity: [],
        access_a: '',
        access_b: ''
      },
      unvisible: [],
      points: [],
      paperSave: false,
      code: '',
      height: 300,
      width: 800
    },
    availability: {
      stars: 0
    },
    ckts: {
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
      },
      diversity: {
        a_side: {
          checked: [],
          blocked: []
        }
      },
      diversity_results: {
        a_side: {
          blocked: [],
          checked: []
        }
      }
    }
  }

export {initial_state}