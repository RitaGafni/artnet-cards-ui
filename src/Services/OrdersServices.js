import axios from 'axios'
const API_ADRESS = 'http://localhost:5000'


export async function fetchOrdersList(){
    return await axios(`${API_ADRESS}/orders`);

}