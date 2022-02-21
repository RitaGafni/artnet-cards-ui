import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { addDataToStorage, deleteDataFromStorage, editDataInStorage } from '../services/FirebaseStorageServices';

export async function updateOrder(order, URL){
    const newOrder =  {
        id: order.id,
        employeeName: order.employeeName,
        company: order.company,
        status: order.status,
        creationDate: order.creationDate,
        TZ: order.TZ,
        customerId: order.customerId,
        img: URL,
      }
      return await editDataInStorage('orders', order.id, newOrder )

}

export async function postOrder(order, newURL){
    const newOrder =  {
        id: '',
        employeeName: order.employeeName,
        company: order.company,
        status: order.status,
        creationDate: order.creationDate,
        TZ: order.TZ,
        customerId: order.customerId,
        img: newURL,
    }
      return await addDataToStorage('orders', newOrder)
}

export async function deleteOrder(id){
      return await deleteDataFromStorage('orders', id)
}

export async function getURLOfImg(logo, customerName){
    const uploadNewLogoRef = ref(storage, `${customerName}.png`);
    const snapshot = await uploadBytes(uploadNewLogoRef, logo);
    console.log(snapshot);
    const newURL =  await getDownloadURL(uploadNewLogoRef);
    return newURL
}