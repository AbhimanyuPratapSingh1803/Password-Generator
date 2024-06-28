import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(number) str += "0123456789";
    if(char) str += "!@#$%^&*-_+=[]{}`~"

    for (let i = 1; i <= length; i++) {
      const idx = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(idx);
    }

    setPassword(pass);

  }, [length, number, char, setPassword]);

  useEffect(() => {
    passwordGenerator()
  }, [length, number, char, passwordGenerator])

  function copyPassword(){
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
    alert("Password successfully copied");
  }


  return (
    <div className='mx-auto mt-20 w-1/2 rounded-2xl bg-slate-800'>
      <h1 className='text-center text-white text-4xl pt-4 mb-4 font-bold'>Password Generator</h1>

      <div className='flex gap-3 overflow-hidden rounded-lg mb-6 px-4'>
        <input
        type="text"
        value={password}
        readOnly
        className='outline-none w-full rounded-xl mx-auto py-3 text-xl text-orange-500 font-semibold pl-3'
        placeholder='Password'
        ref={passRef}
        />
        <button className='bg-blue-500 px-4 rounded-xl outline-none py-3 text-white font-semibold hover:bg-blue-600 text-lg' onClick={copyPassword}>Copy</button>
      </div>

      

      <div className='flex justify-evenly w-full px-4'>
        <div className='flex items-center gap-3 py-3'>
          <input
          type="range"
          min={8}
          max={20}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label className='text-white text-lg font-semibold'>Length : {length}</label>
        </div>

        <div className='flex items-center gap-3 py-3'>
          <input
          type="checkbox"
          defaultChecked = {number}
          className='cursor-pointer'
          onChange={(prev) => {
            setNumber((prev) => !prev);
          }}
          />
          <label className='text-white text-lg font-semibold'>Numbers</label>
        </div>

        <div className='flex items-center gap-3 py-3'>
          <input
          type="checkbox"
          defaultChecked = {char}
          className='cursor-pointer'
          onChange={(prev) => {
            setChar((prev) => !prev);
          }}
          />
          <label className='text-white text-lg font-semibold'>Special Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
