import axios from 'axios'
const API_ADRESS = 'http://localhost:5000'


export async function fetchCompanies(customerId){
    return await axios(`${API_ADRESS}/customers/${customerId}/companies`);

}