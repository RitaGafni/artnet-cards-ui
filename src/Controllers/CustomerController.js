import axios from 'axios'
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';

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

export async function getURLOfLogo(logo, customerName){
    const uploadNewLogoRef = ref(storage, `${customerName}.png`);
    const snapshot = await uploadBytes(uploadNewLogoRef, logo);
    console.log(snapshot);
    const newURL =  await getDownloadURL(uploadNewLogoRef);
    return newURL
}

export async function updateCustomer(customer, logoURLToUpload){
    return axios.put(
        `${API_ADRESS}/customers/${customer.id}`,
        {
          id: customer.id,
          customer_name: customer.customer_name,
          logo: logoURLToUpload,
          new_orders: 0,
        }
      );
}

export async function deleteCustomer(id){
return await axios.delete(
    `${API_ADRESS}/customers/${id}`
  );
}

export async function PostNewCustomer(customer_name, url){
     return await axios.post('http://localhost:5000/customers/', {
        id: '',
        customer_name: customer_name,
        logo: url,
        new_orders: 0,
      });
}