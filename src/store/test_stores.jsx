import { initial_state } from '../reducers/__tests__/test_stores'

export const empty_ckt_data = {
  access_type: '',
  access_type_b: '',
  as_type: '',
  circuit_type: '',
  internet_access_type: ''
}

const state_diffs = [{
    test_text: "Default",
    state: initial_state,
    design_code: "V2-10020-10020-0000-0000",
    cost: "$$"
}, 
{
    test_text: "1 star",
    state: {...initial_state,
        ckts: {
            ckt_1: {
              access_type: 'wired',
              access_type_b: '',
              as_type: '',
              circuit_type: 'eth',
              internet_access_type: ''
            },
            ckt_2: {
              access_type: '5g',
              access_type_b: '',
              as_type: 'eas',
              circuit_type: 'internet',
              internet_access_type: 'broad'
            },
            diversity: {
              a_side: { checked: ['cloud','ntu','se','entr'],
                        blocked: ['se', 'l2a', 'nni', 'cloud', 'ntu', 'exchange', 'entr']
                      }
            }
        }
    },
    design_code: "V2-10020-30231-0088-0000"
}, {
    test_text: "2 star",
    state: {...initial_state,
      ckts: {
        ckt_1: {
          access_type: '',
          access_type_b: '',
          as_type: '',
          circuit_type: 'eth',
          internet_access_type: ''
        },
        ckt_2: {
          access_type: 'wired',
          access_type_b: '',
          as_type: 'eas',
          circuit_type: 'internet',
          internet_access_type: 'broad'
        },
        diversity: {
          a_side: {
            checked: [
              'cloud',
              'ntu',
              'se'
            ],
            blocked: [
              'se',
              'l2a',
              'nni',
              'cloud',
              'ntu',
              'exchange',
              'entr'
            ]
          }
        },
      },
    },
    design_code: "V2-10020-10231-0088-0000"
}, {
    test_text: "3 star",
    state: {...initial_state,
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
          as_type: 'ias',
          circuit_type: 'internet',
          internet_access_type: ''
        },
        diversity: {
          a_side: {
            checked: [
              'se',
              'nni'
            ],
            blocked: [
              'se'
            ]
          }
        },
      },
    },
    design_code: "V2-10020-10130-0004-0000"
}, 
{
    test_text: "4 star",
    state: {...initial_state,
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
                checked: [
                  'ntu',
                  'exchange',
                  'cloud',
                  'nni',
                  'l2a',
                  'se'
                ],
                blocked: []
              }
            },
        }
    },
    design_code: "V2-10020-10020-009f-0000",
    cost: "$$"
}, {
    test_text: "5 star",
    state: {...initial_state,
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
                checked: [
                  'cpe',
                  'ntu',
                  'entr',
                  'exchange',
                  'cloud',
                  'nni',
                  'l2a',
                  'se'
                ],
                blocked: []
              }
            },
        }
    },
    design_code: "V2-10020-10020-01df-0000",
    cost: "$$$$"
}, 
{
    test_text: "Node diversity",
    state: {...initial_state,
      ckts: {
        ckt_1: {
          access_type: 'wired',
          access_type_b: 'wired',
          as_type: '',
          circuit_type: 'eth',
          internet_access_type: ''
        },
        ckt_2: {
          access_type: 'wired',
          access_type_b: '',
          as_type: 'ias',
          circuit_type: 'internet',
          internet_access_type: ''
        },
        diversity: {
          a_side: {
            checked: [
              'se'
            ],
            blocked: [
              'se'
            ]
          }
        },
      }
    },
    design_code: "V2-11020-11020-0087-0000"
}, {
    test_text: "Carrier Diversity",
    state: {...initial_state,
      ckts: {
        ckt_1: {
          access_type: 'wired',
          access_type_b: 'wired',
          as_type: '',
          circuit_type: 'eth',
          internet_access_type: ''
        },
        ckt_2: {
          access_type: 'wired',
          access_type_b: '',
          as_type: 'ias',
          circuit_type: 'internet',
          internet_access_type: ''
        },
        diversity: {
          a_side: {
            checked: [
              'se'
            ],
            blocked: [
              'se'
            ]
          }
        },
      }
    },
    design_code: "V2-11020-11020-00ac-0000"
}, 
{
    test_text: "Node & Carrier Diversity",
    state: {...initial_state,
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
              access_type_b: 'wired',
              as_type: '',
              circuit_type: 'eth',
              internet_access_type: ''
            },
            diversity: {
              a_side: {
                checked: [
                  'cpe',
                  'ntu',
                  'lcar',
                  'exchange',
                  'cloud',
                  'nni',
                  'l2a',
                  'se'
                ],
                blocked: [
                  'nni',
                  'cloud'
                ]
              }
            },
        }
    },
    design_code: "V2-10020-11020-01bf-0000",
    cost: "$$$$$"
}, {
    test_text: "$",
    state: {...initial_state,
        ckts: {
            ckt_1: {
              access_type: 'wired',
              access_type_b: '',
              as_type: 'eas',
              circuit_type: 'internet',
              internet_access_type: 'broad'
            },
            ckt_2: {
              access_type: '5g',
              access_type_b: '',
              as_type: 'eas',
              circuit_type: 'internet',
              internet_access_type: 'broad'
            },
            diversity: {
              a_side: {
                checked: [
                  'cloud',
                  'ntu',
                  'entr'
                ],
                blocked: [
                  'se',
                  'l2a',
                  'nni',
                  'cloud',
                  'ntu',
                  'exchange',
                  'entr'
                ]
              }
            },
        }
    },
    design_code: "V2-10231-30231-00c8-0000",
    cost: "$"
    //design_code: "V2-10231-30231-0088-0000"
}, {
    test_text: "$$",
    state: {...initial_state,
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
              as_type: 'eas',
              circuit_type: 'internet',
              internet_access_type: 'broad'
            },
            diversity: {
              a_side: {
                checked: [
                  'cloud',
                  'ntu',
                  'se'
                ],
                blocked: [
                  'se',
                  'l2a',
                  'nni',
                  'cloud',
                  'ntu',
                  'exchange',
                  'entr'
                ]
              }
            },
        }
    },
    design_code: "V2-10020-10231-0089-0000",
    cost: "$$"
    //design_code: "V2-10020-10231-0088-0000"
}, {
    test_text: "$$$",
    state: {...initial_state,
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
                checked: [
                  'cpe',
                  'nni',
                  'l2a',
                  'se'
                ],
                blocked: []
              }
            },
        }
    },
    design_code: "V2-10020-10020-0107-0000",
    cost: "$$$"
}, {
    test_text: "$$$$",
    state: {...initial_state,
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
                checked: [
                  'cpe',
                  'ntu',
                  'entr',
                  'exchange',
                  'cloud',
                  'nni',
                  'l2a',
                  'se'
                ],
                blocked: []
              }
            },
        }
    },
    design_code: "V2-10020-10020-01df-0000",
    cost: "$$$$"
}, {
    test_text: "$$$$$",
    state: {...initial_state,
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
                checked: [
                  'cpe',
                  'ntu',
                  'entr',
                  'lcar',
                  'exchange',
                  'cloud',
                  'nni',
                  'l2a',
                  'se'
                ],
                blocked: [
                  'nni',
                  'cloud'
                ]
              }
            },
        }
    },
    design_code: "V2-10020-10020-01ff-0000",
    cost: "$$$$$"
},

]

export default state_diffs