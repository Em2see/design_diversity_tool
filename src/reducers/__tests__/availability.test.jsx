import availability from '../availability'
import { updateAvail } from '../../actions'
import { initial_state } from './test_stores'

test('should return the initial state', () => {
    expect(availability(initial_state.availability, updateAvail(5))).toEqual(
        {stars: 5}
    )
  })

test('should return the initial state', () => {
    expect(availability(initial_state.availability, {type: undefined})).toEqual(
        initial_state.availability
    )
  })
  