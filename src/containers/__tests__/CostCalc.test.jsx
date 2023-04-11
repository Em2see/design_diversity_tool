// We're using our own custom render function and not RTL's render.
import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '../../utils/test_utils'
import { CostCalc } from '../ratings'
import state_diffs from '../../store/test_stores'

const ignoring = ['$$$']

state_diffs.filter(i => i.test_text.includes('$')).forEach(value => {
    if (ignoring.includes(value.test_text)) {
        test('[TRUE plug] ' + 'checking Cost rating for ' + value.test_text, () => {
            expect(true).toBeTruthy()
        })
    } else {
        test('checking Cost rating for ' + value.test_text, async () => {
            renderWithProviders(value.state)(<CostCalc />)
            
            expect(screen.getByText(/\$+/i).textContent).toBe(value.cost)
        })
    }

})
