import {getDataFromStorage} from './FirebaseStorageServices'

 export  async function fetchOrders(){
    return getDataFromStorage('orders')
}

export async function fetchCompanies() {
    return getDataFromStorage('companies')

}

export async function fetchCustomers() {
    return getDataFromStorage('customers')

}

export async function fetchUsers(customerId) {
    const allUsers = await getDataFromStorage('users')
    return allUsers.filter((company) =>  company.customerId === customerId)

}