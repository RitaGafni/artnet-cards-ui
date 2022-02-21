import {getDataFromStorage} from './FirebaseStorageServices'

export async function fetchUsers(customerId){
    const allUsers =  await getDataFromStorage('users')
    return allUsers.filter((user) => user.customerId === customerId)



}


