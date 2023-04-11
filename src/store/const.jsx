const MAX_STARS = 5;

const def_state = {
    draw: {
        background: "p2p",
        a_side: {
            diversity: [],
            access_a: "",
            access_b: "",
        },
        b_side: {
            diversity: [],
            access_a: "",
            access_b: "",
        },
        unvisible: [],
        points: [],
        paperSave: false,
        code: "V2-10020-10020-0000-0000",
        height: 300,
        width: 800
    },
    availability: {
        stars: 0
    },
    ckts: {
        ckt_1: {
            circuit_type: "",
            as_type: "",
            access_type: "",
            internet_access_type: "",
            p2p: false,
        },
        ckt_2: {
            circuit_type: "",
            as_type: "",
            access_type: "",
            internet_access_type: "",
            p2p: false,
        },
        diversity: {
            a_side: {
                blocked: [],
                checked: []
            }
        },
        diversity_results: {
            a_side: {
                blocked: [],
                checked: [],
            }
        }
    }
}

export {def_state, MAX_STARS}
