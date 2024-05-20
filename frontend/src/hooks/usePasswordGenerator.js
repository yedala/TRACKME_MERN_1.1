import React, { useState } from 'react'

const usePasswordGenerator = () => {
  const [password,setpassword] = useState("");
  const [errMsg ,seterrMsg] =useState("");
  const generatePassword = (checkBoxData,length)=>{
     let generatedPassword="";
     let charset="";
     const selectedOptions = checkBoxData.filter((f)=>f.state==true)
     if(selectedOptions.length == 0){
        seterrMsg("select at least one option");
        setpassword("");
        return;
     }
     selectedOptions.forEach((option)=>{
        switch (option.title){
            case "Include upper Case":
                charset+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                break;
            case "Include lower Case":
                charset+="abcdefghijklmnopqrstuvwxyz"
                break;
            case "Include Number":
                charset+="0123456789";
                break;
            case "Include special character":
                charset+="!@#$%^&*()+-?><.,";
                break;
            default:
                break;          
        }
     });
     for(let i=0;i<length;i++){
        const randomIndex = Math.floor(Math.random() * charset.length);
        generatedPassword += charset[randomIndex];
     }
     setpassword(generatedPassword);
     seterrMsg("");
  }

  return {password,errMsg,generatePassword}
}

export default usePasswordGenerator