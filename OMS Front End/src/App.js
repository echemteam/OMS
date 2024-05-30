import React from 'react'
import AppRoutes from './layouts/navigation/AppRoutes'
import { ComponentNavigation } from './layouts/navigation/ComponentNavigation'

const App = () => {
  return (
    <div>
      <AppRoutes  componentRoutes={ComponentNavigation}/>
    </div>
  )
}

export default App 