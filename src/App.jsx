import { useState, useCallback, useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [length ,setLength] = useState(8)
  const[numberAllowed, setNumberAllowed]= useState(false)
  const[charAllowed, setCharAllowed] = useState(false)
  const[passworld, setPassworld] = useState("")

  //use ref hook
  const passwordRef = useRef(null);

  const passworldGenerator = useCallback(()=>{

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      str+= "0123456789"
    }

    if(charAllowed){
      str+= "!@#$%&*{}[]"
    }

    for(let i =1; i<=length; i++){
      let char = Math.floor(Math.random()*str.length +1);
      pass+= str.charAt(char);

    }

    setPassworld(pass)


  }, [length, numberAllowed, charAllowed, setPassworld]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    
    window.navigator.clipboard.writeText(passworld)
  } ,[passworld])

  useEffect(() => {
    passworldGenerator()
  }, [length, numberAllowed, charAllowed, passworldGenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 '>
    <h1 className=' text-lg text-white text-center my-3'>Password Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4 mx-4">
        <input
        type="text"
        value={passworld}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref ={passwordRef}
        />

        <button
         onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy
         </button>


      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex item-center gap-x-1'>
          <input
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=> {setLength(e.target.value)}}
          />
          <label>length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setNumberAllowed((prev)=> !prev)
          }}
          />
          <label htmlFor="NumberInput">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={()=>{
            setCharAllowed((prev)=> !prev)
          }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>

      </div>

    </div>
    </>
  )
}

export default App
