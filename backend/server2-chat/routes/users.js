const users = [];

const userJoin = (id,username,room) =>{
    const user = {username,id,room};
    users.push(user);
    return user;
}

const getRoomUsers = (room)=>{
       return users.filter(user=>user.room==room);
}

const getCurrentUser = (id)=>{
    return users.find(user=>user.id==id);
}

const userLeave = (id)=>{
    const index = users.findIndex(user=>user.id==id);
    console.log(index);
    if(index != -1) {
        return users.splice(index,1)[0];
    }
}

module.exports = {userJoin,getRoomUsers,getCurrentUser,userLeave}