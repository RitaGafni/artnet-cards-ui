import {getDataFromStorage} from './FirebaseStorageServices'

export const fetchCompanies = async (customerId) => {
    const allCompanies =  await getDataFromStorage('companies')
    return allCompanies.filter((company) =>  company.customerId === customerId)


}