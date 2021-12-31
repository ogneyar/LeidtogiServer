const axios  = require("axios")
const qs = require('qs')

const Calculator = require("./Calculator")


module.exports = class Pek {
    
    static url = process.env.PEK_URL
    
    constructor() {
        // console.log("PEK START");
    }

    static async curl(parameters) {
        // console.log("PEK CURL RUN");

        let { data, url } = parameters
        let method = "post"
        let response

        let headers = {
            'content-type': 'application/json;charset=utf-8',
            'accept': 'application/json'
        }
        // headers = {...headers, 'authorization': 'Basic  ' + this.token}
        
        try {
            let options = { method, headers, data, url }
            await axios(options)
                .then(data => {
                    response = data.data
                })
                .catch(error => {
                    // console.log("PEK CURL ERROR: ",error);
                    response = { error }
                })
        }catch(e) {  
            // console.log("PEK CURL THROW: ",e);
            response = { error:e }
        }
        // console.log("PEK CURL RESPONSE: ",response);
        return response
    }

}