import { getDataFromStorage } from './FirebaseStorageServices';

export async function fetchOrders() {
  return getDataFromStorage('orders');
}

export async function fetchCustomers() {
  return getDataFromStorage('customers');
}

export async function fetchUsers(customerId) {
  const allUsers = await getDataFromStorage('users');
  return allUsers.filter((user) => user.customerId.toString() === customerId);
}

export const fetchCompanies = async (customerId) => {
  const allCompanies = await getDataFromStorage('companies');
  return allCompanies.filter(
    (company) => company.customerId.toString() === customerId
  );
};
