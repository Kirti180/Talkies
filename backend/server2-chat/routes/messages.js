const moment = require("moment");

const formateMessage = (username,text)=>{
    return {
        username,
        text,
        time: moment().format('DDTHH:mm:ss')
    }
}

module.exports = formateMessage;