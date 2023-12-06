function Validation(values) {
    let error={}
    const email_pattern=/^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2,6}$/
    const pass_pattern=/^(?=.*\d)(?=.*[a-a])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.username===""){
        error.username="name should not be empty"
    }
    if(values.userid===""){
        error.userid="userid should not be empty"
    }
    else if(!email_pattern.test(values.userid)){
        error.userid="please enter valid email"
    }
    if(values.pass===""){
        error.pass="password should not be empty"
    }else if(pass_pattern.test(values.pass)){
        error.pass="please enter valid password"
    }
    if(values.pass!==values.rePass){
        error.rePass="password not matched"
    }

    return error;
}

export default Validation;