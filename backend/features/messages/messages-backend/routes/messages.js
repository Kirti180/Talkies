const moment = require("moment");

const formateMessage = (username,text)=>{
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formateMessage;