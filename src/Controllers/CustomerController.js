import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { addDataToStorage, deleteDataFromStorage, editDataInStorage } from '../services/FirebaseStorageServices';


export async function getURLOfLogo(logo, customerName){
    const uploadNewLogoRef = ref(storage, `${customerName}.png`);
    const snapshot = await uploadBytes(uploadNewLogoRef, logo);
    console.log(snapshot);
    const newURL =  await getDownloadURL(uploadNewLogoRef);
    return newURL
}

export async function updateCustomer(customer, logoURLToUpload){
    const newCustomer = {
      id: customer.id,
      customer_name: customer.customer_name,
      logo: logoURLToUpload,
      new_orders: 0,
    }
    return await editDataInStorage('customers', customer.id, newCustomer )
  }

export async function deleteCustomer(id){
  return await deleteDataFromStorage('customers', id)
}

export async function PostNewCustomer(customer_name, url){
const newCustomer = {
  id: '',
  customer_name: customer_name,
  logo: url,
  new_orders: 0,
}
return await addDataToStorage('customers', newCustomer)
}