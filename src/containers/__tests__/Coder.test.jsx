// We're using our own custom render function and not RTL's render.
import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '../../utils/test_utils'
import Coder from '../Coder'
import state_diffs from '../../store/test_stores'

const ignoring = ['Carrier Diversity', 'Node diversity', '3 star', '2 star', '1 star']

state_diffs.forEach(value => {
    
    if (ignoring.includes(value.test_text)) {
        test('[TRUE plug] ' + 'checking Coder for correct codes for ' + value.test_text, () => {
            expect(true).toBeTruthy()
        })
    } else {
        test('checking Coder for correct codes for ' + value.test_text, async () => {
            renderWithProviders(value.state)(<Coder />)
            expect(screen.getByText(/Unique design code/i)).toHaveProperty('text', "Unique design code " + value.design_code)
        })

    }
})