import React from 'react'
import { render } from 'react-dom'

import { App } from './components'

const mountNode = document.getElementById('app') || document.body

render(<App/>, mountNode)
