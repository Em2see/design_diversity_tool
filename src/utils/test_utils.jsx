import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { setupStore } from '../store'
import { Provider } from 'react-redux'
// As a basic setup, import your same slice reducers
import { top_level } from '../reducers'
import { preloadedState } from '../reducers/__tests__/test_stores'

export const renderWithProviders = (preloadedState) => (
  ui,
  {
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) => {

  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
  }
  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const renderWithProviders2 = (
  ui,
  {
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) => {

  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
  }
  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}