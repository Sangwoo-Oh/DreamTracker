import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './Login'
import SignUp from './SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="App">
      <Login />
      <SignUp />
    </div>
    </>
  )
}

export default App
