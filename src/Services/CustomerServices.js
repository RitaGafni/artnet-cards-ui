import axios from 'axios'

const API_ADRESS = 'http://localhost:5000'

//customer view
 export  async function fetchOrders(){
    return await axios(`${API_ADRESS}/orders`);

}

export async function fetchCompanies() {
    return await axios(`${API_ADRESS}/companies`); 
   
}

export async function fetchCustomers() {
    return await axios(`${API_ADRESS}/customers`); 
   
}

export async function fetchUsers() {
    return await axios(`${API_ADRESS}/users`);
}