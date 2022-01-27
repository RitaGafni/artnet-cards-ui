import axios from 'axios'
const API_ADRESS = 'http://localhost:5000'


export async function fetchUsers(customerId){
    return await axios(`${API_ADRESS}/customers/${customerId}/users`);

}


