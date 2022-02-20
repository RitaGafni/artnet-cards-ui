import { db } from '../firebase';
import { collection, getDocs , addDoc} from '@firebase/firestore'
import axios from 'axios'


export function getData(){

    let AllUsers
    
    const colRef = collection(db, 'customers')

    getDocs(colRef)
    .then((snapshot) => {
        let users = []
        snapshot.docs.forEach((doc) => {
            users.push({...doc.data(), id: doc.id})
        })
        console.log(users);
    })
    .catch(err => {
        console.log(err.message);
    })

     async function FetchAllUsers(){
        const {data} =  await axios(`http://localhost:5000/customers`);
    AllUsers = data;
    console.log('users');
    console.log(AllUsers);
    AllUsers.forEach((user) => 
    addDoc(colRef, 
      user
    )
    );

    }

    FetchAllUsers()

 
     
    

    

}

