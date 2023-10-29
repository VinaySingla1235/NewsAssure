import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NewsDetect from './components/NewsDetect'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <NewsDetect />
      </div>
    </>
  )
}

export default App
