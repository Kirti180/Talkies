# befitting-harbor-9010
![logo](https://user-images.githubusercontent.com/114337213/228550899-b8c32e8b-a152-4313-b5e6-d517a9417d33.jpeg)

Reatime screen sharing web application..

## Tech Stack

**Client:** HTML,CSS, Javascript,Bootsrap

**Server:** Node.js, Express.js , MongoDB, WebRTC, PeerJS library, Socket.io
## Frontend Part

- Home page
- Login/Signup
- Dashboard
- Google OAuth 
- Github OAuth

## Backend Part
- Authentication using JWT
- Mongoose - connecting the database
- Server side -->> Node.js and Express 
### Database - 
    - MongoDB

## Features 
 -  Screen Sharing 
 -  Chatting 
 -  Vedio calling

 ## Application Guide


 ### To use {Screen share} feature -->
-  First Create room 
-  User can share the screen
-  Than user can join the room using room ID
-  Enter room ID to join 

#### Stop share -->
- Click on stop share option 

### To use {Video calling} feature -->
-  First Create room 
-  User can join the call by using the room ID
-  To end the call click on hang on button

### To use {Chat} feature -->
-  First Create room
-  User can join the room using room ID after login
-  Time is displayed of message
-  Notifies User info


## Examples
 #### Creating connection and accessing user media .
```javascript
    peer = new Peer(room_id);
    peer.on('open', (id) => {
        console.log("Peer has joined ID no", id);
        hideModal()
        // media options...
        getUserMedia({ video: true, audio: true },
            (stream) => {
                local_stream = stream;
                setLocalStream(local_stream)
            }, (err) => {
                console.log(err);
            })
        notify("Waiting for the member to join.")
    })
```

## Group Members Info

1. Kirti Shinde(Team Lead)
   >    - e-Mail: kirti182001@gmail.com
   >    - GitHub: https://github.com/Kirti180


2. Love Porwal
   >    - e-Mail: lluvporwall@gmail.com
   >    - GitHub: https://github.com/love-porwal 


3. Rishab Kumar Chaurasiya
   >    - e-Mail: rkc3660@gmail.com
   >    - GitHub: https://github.com/git-rishab


4. Pankaj Jain
   >    - e-Mail: pj9009815223@gmail.com
   >    - GitHub: https://github.com/pankubhaiya 


5. Veeresh S P
   >    - e-Mail: veereshsp1234@gmail.com
   >    - GitHub: https://github.com/Veeresh-S-P 

<br>

System_design
![Untitled Diagram](https://user-images.githubusercontent.com/87657007/225451422-8d5c05ca-5046-4c10-b890-1f02bbcd3d73.jpg)
