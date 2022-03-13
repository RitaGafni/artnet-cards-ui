import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import {
  addDataToStorage,
  deleteDataFromStorage,
  editDataInStorage,
} from '../services/FirebaseStorageServices';
import { fetchCustomers } from '../services/CustomerViewServices';

export async function getURLOfLogo(logo, customerName) {
  const uploadNewLogoRef = ref(storage, `${customerName}.png`);
  await uploadBytes(uploadNewLogoRef, logo);
  const newURL = await getDownloadURL(uploadNewLogoRef);
  return newURL;
}

export async function updateCustomer(customer, logoURLToUpload) {
  const newCustomer = {
    id: customer.id,
    customer_name: customer.customer_name,
    customerId: customer.customerId,
    logo: logoURLToUpload,
    new_orders: 0,
  };
  return await editDataInStorage('customers', customer.id, newCustomer);
}

export async function deleteCustomer(id) {
  return await deleteDataFromStorage('customers', id);
}

export async function PostNewCustomer(customer_name, url) {
  const newId = await getNewId();
  const newCustomer = {
    id: '',
    customer_name: customer_name,
    customerId: newId,
    logo: url,
    new_orders: 0,
  };
  return await addDataToStorage('customers', newCustomer);
}

const getNewId = async () => {
  const data = await fetchCustomers();
  let allCustomerIds = [];
  data.forEach((customer) => allCustomerIds.push(customer.customerId));
  return Math.max(...allCustomerIds) + 1;
};
