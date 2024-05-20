import React, { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { checkBoxes } from "../utils/constants"
import usePasswordGenerator from '../hooks/usePasswordGenerator';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

const GeneratePassword = ({ setgeneratePassword }) => {
  const [length, setlength] = useState(4);
  const [checkBoxData, setcheckBoxData] = useState(checkBoxes);
  const [copied,setcopied] =useState(false);
  const close = () => {
    setgeneratePassword(false);
    setlength(4);
    setcheckBoxData(checkBoxes);
  }
  const handleCheckBox = (i) => {
    const updateData = [...checkBoxData];
    updateData[i].state = !updateData[i].state;
    setcheckBoxData(updateData);
  }
  const { password, errMsg, generatePassword } = usePasswordGenerator();
  const handleCopy = ()=>{
    navigator.clipboard.writeText(password);
    setcopied(true);
    setTimeout(()=>{
      setcopied(false);
    },1000)
  }
  return (
    <>
      <div className='flex justify-end'>
        <button onClick={close} className='p-5'> <IoCloseOutline className='text-4xl' /></button>
      </div>
      <div className='w-screen h-screen flex justify-center'>
        <div className='w-1/2 h-3/4 bg-white  '>
          <p className='text-2xl p-3 flex justify-center'>Password Generator</p>
          <div className='p-3'>
            {password && <div className='flex pt-11 justify-between w- full '>
              <div className='p-2 m-4 w-3/4 bg-gray-300' > {password} </div>
              <button className='m-4 px-2 font-bold bg-green-700 rounded-md'onClick={handleCopy}>{copied? 'copied': 'copy'}</button>
            </div>}
            <label className='p-2 m-4 w-3/4 text-lg'>Characters Length:  {length} </label>

            <input className='p-2 m-4 w-3/4' type="range" min='4' max='20' value={length} onChange={(e) => setlength(e.target.value)} />
            <div className='flex w-3/4 flex-wrap'>
              {checkBoxData.map((e, i) => {
                return (<div className='w-1/2 ' key={i}><input onChange={() => { handleCheckBox(i) }} className='p-2 m-4' type="checkbox" checked={e.state} />{e.title} </div>)
              })}
            </div>
            <div>
            {errMsg && <span className='p-3 m-4 font-bold text-red-500'>{errMsg} </span>}

            </div>
           {password && <PasswordStrengthIndicator password={password}/>}
            <button className='p-3 m-4 rounded-lg bg-green-700' onClick={()=>{generatePassword(checkBoxData,length)}}>Generate Password</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default GeneratePassword