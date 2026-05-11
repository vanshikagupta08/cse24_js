import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroimg from './assets/hero.png'
import './App.css'

import student from './components/student'

function App() {
      
  

  return (
    <><h1>List of various students </h1>
      <student name= {'vanshika'} age={19}/>
      <student name = {'radhika'} age={18}/>
      <student name = {'sarika'} age={16}/>
      <student name = {'akshika'} age={17}/>
      
    </>
  )
}

export default App
