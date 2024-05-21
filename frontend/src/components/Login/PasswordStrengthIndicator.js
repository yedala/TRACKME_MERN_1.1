import React from 'react'

const PasswordStrengthIndicator = ({password}) => {
    const generateStrength=  ()=>{
        const len = password?.length;
        if(len<4) return "";
        else if(len == 4)return "Poor";
        else if(len <= 6)return "Weak";
        else if(len <=9) return "Medium";
        else{
            if(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(password))return "Very Strong";
            else return "Good";
        }
    }
    const strengthCheck = generateStrength();
    if(!strengthCheck) return <React.Fragment/>
  return (
    <div className='p-3 m-4'>
      Strength: <span className='p-3 m-4 text-gray-700 font-bold'>{strengthCheck}</span>  
    </div>
  )
}

export default PasswordStrengthIndicator