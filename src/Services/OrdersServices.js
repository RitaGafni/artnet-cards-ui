import {getDataFromStorage} from './FirebaseStorageServices'


export async function fetchOrdersList(){
    return getDataFromStorage('orders')
}