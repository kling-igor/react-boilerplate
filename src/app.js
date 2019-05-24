import React, { PureComponent } from 'react'

import styled, { createGlobalStyle } from 'styled-components'

import { GlobalStyle } from './style'

import { QuickSelect } from './quickselect/component'

export default class App extends PureComponent {
  render() {
    return (
      <>
        <GlobalStyle />
        <QuickSelect
          items={['alpha', 'bravo', 'charlie', 'delta']}
          darkTheme={false}
          onClosed={() => {
            console.log('onClosed')
          }}
        />
      </>
    )
  }
}
