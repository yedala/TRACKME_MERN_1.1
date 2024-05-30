 const DEV_ENDPOINT= "http://localhost:5000";
 const PROD_ENDPOINT= "https://mrn1-task.onrender.com";

let ENV;
 const verifyEnv = (env)=>{
    if(env=='production'){
        ENV=PROD_ENDPOINT;
    }
    else
     ENV=DEV_ENDPOINT;
}

verifyEnv('production');

export default ENV;



//  "http://localhost:5000";
// const ENDPOINT = "https://mrn1-task.onrender.com";