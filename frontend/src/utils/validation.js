const validation = (email,password)=>{
    const emailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    const passwordValid = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(password);

    if(!emailValid &&  !passwordValid) return 'Email and Password not valid'
    if(!emailValid) return 'Email is not valid'
    if(!passwordValid)return 'Password is not valid'
    return null;
}

export default validation