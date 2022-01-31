import axios from 'axios'
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';


const API_ADRESS = 'http://localhost:5000'

export async function fetchOrdersList(){
    return await axios(`${API_ADRESS}/orders`);

}

export async function updateOrder(order, URL){
    console.log('order to put', order);
    return  await axios.put(`${API_ADRESS}/orders/${order.id}`, {
        id: order.id,
        employeeName: order.employeeName,
        company: order.company,
        status: order.status,
        creationDate: order.creationDate,
        TZ: order.TZ,
        customerId: order.customerId,
        img: URL,
      });
}

export async function postOrder(order, newURL){
    return await axios.post( `${API_ADRESS}/orders/`, {
        id: '',
        employeeName: order.employeeName,
        company: order.company,
        status: order.status,
        creationDate: order.creationDate,
        TZ: order.TZ,
        customerId: order.customerId,
        img: newURL,
      });
}

export async function deleteOrder(id){
   return await  axios.delete(
        `${API_ADRESS}/orders/${id}`
      );
}

export async function getURLOfImg(logo, customerName){
    const uploadNewLogoRef = ref(storage, `${customerName}.png`);
    const snapshot = await uploadBytes(uploadNewLogoRef, logo);
    console.log(snapshot);
    const newURL =  await getDownloadURL(uploadNewLogoRef);
    return newURL
}