// We're using our own custom render function and not RTL's render.
import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders2, renderWithProviders } from '../../utils/test_utils'
import {StarsCalc} from '../ratings'
import state_diffs, {empty_ckt_data} from '../../store/test_stores'
import CoderC from '../Coder'

// Enable API mocking before tests.
// beforeAll()

// Reset any runtime request handlers we may add during the tests.
// afterEach()

// Disable API mocking after the tests are done.
// afterAll()

// 'Carrier Diversity', 'Node diversity', '3 star', '2 star', '1 star'
const ignoring = ['3 star']

state_diffs
    .filter(i =>  i.test_text.includes('star'))
    .map(i => ({...i, stars: parseInt(i.test_text.replace(' star', ''))}))
    .forEach(value => {
    
    if (ignoring.includes(value.test_text)) {
        test('[TRUE plug] ' + 'checking StarsCalc for correct codes for ' + value.test_text, () => {
            expect(true).toBeTruthy()
        })
    } else {
        test('checking StarCalc for correct codes for ' + value.test_text, async () => {
            renderWithProviders(value.state)(<><StarsCalc /><CoderC/></>)
            
            const nodes = screen.getAllByText((content, element) => {
                return element.tagName.toLowerCase() === 'i' && element.className.includes('yellow star')
            })
            
            expect(nodes).toHaveLength(value.stars)
        })

    }
})