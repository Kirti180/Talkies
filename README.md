![icon](https://user-images.githubusercontent.com/112820391/229345379-104d7a8e-6fb3-4c47-b760-8a6acf5f3d97.png)

# Talkies - Real Time Screen Sharing  Chat Application

**Takies is a communications platform that allows users to connect with video, audio, screen share, and chat.**
**The power of collaboration is that it can turn a group of individuals into a team empowered to achieve great things
Talkies is a type of application that enables users to share their computer screens with others in real-time over the internet. 
It includes features that allows user to chat, video call, screen share with each other.**

## Deployment Link - https://talkies-lets-connect.netlify.app/

## Tech Stack

**Client:** HTML | CSS | Javascript | Bootsrap | External CSS library

**Server:** Node.js | Express.js | MongoDB | WebRTC | PeerJS library | Socket.io | Bcrypt | PassPort | cors | Redis | JWT

**github:** To maintain repository and collabration and version control.

**VS Code:** To write HTML,CSS and JavaScript code.

**Microsoft Edge,Google Chrome & Mozilla Firefox:** To check the functionality and run the code.

## Frontend Part

- Home page
- Login/Signup
- Dashboard
- Google OAuth 
- Github OAuth

## Backend Part
- Authentication using JWT
- implementation using Socket.io
- fully functional Video, Audio and Screen Share icons

## Database  
 - MongoDB
 - Redis

## Features 
 -  Screen Sharing 
 -  Chatting 
 -  Video Calling

 ## Application Guide to use features

 ### To use {Screen share} feature -->
-  First Create room 
-  User can share the screen
-  User can join the room using room ID
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

## Complete Work-flow of Talkies

![work-flow](https://user-images.githubusercontent.com/115463536/229331910-ba9200c8-7d65-4c98-b4a1-3f921088107b.jpg)

## Home Page
![home page](https://user-images.githubusercontent.com/112820391/229371183-24ec49f9-2dc6-41e5-bb21-0f340f8dec72.PNG)
## Footer Page
![ooter page](https://user-images.githubusercontent.com/112820391/229371197-2fe56e7e-ff79-46ce-bccd-ad6c84c10ab7.PNG)
## Signing Page
![sigin page](https://user-images.githubusercontent.com/112820391/229371204-bb79974c-4d59-42a5-824c-49f884a4d860.PNG)
## Login Page
![login page](https://user-images.githubusercontent.com/112820391/229371208-37d675ae-2f72-4b28-9951-3de7c3044118.PNG)
## Dashboard Page
![dashboard page](https://user-images.githubusercontent.com/112820391/229371233-bea4c2b8-75d7-4b2b-b6e1-e95bc52a4093.PNG)
## video chat platform
![video chat platform](https://user-images.githubusercontent.com/112820391/229371247-f2d3b3a3-7dff-40cb-9c2e-6770234979d1.PNG)

