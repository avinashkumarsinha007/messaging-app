# messaging-app

There are 2 folders in it. Go to each folder and do "npm i" to both.

To run the server, go to inside server folder and run the command "npm start". Nodemon will aotomatically take care the server to be run in the background in port 3001.

To run the Client, go to inside client folder and run the command "npm start". React js will aotomatically take care the react-server to be run in the background in port 3000.

Open another tab in the browser and type name and Room Id. Now, Open another tab and open the port 3000 and enter the same Room Id.

Within the same room id, we can chat and the whole chat is E2E-encrypted.

# was not able to add public key and private key functionality in react but those are working fine in server, we can see in console of server the encrypted text and decrypted text. the logic of encryption and decryption is written in index.js file in server repo.
