import { db } from '../firebase';
import { collection, getDocs , addDoc, setDoc, doc, deleteDoc } from '@firebase/firestore'

export const getDataFromStorage = async (collectionName) => {
  const colRef = collection(db, collectionName)
  try {
    const snapshot = await getDocs(colRef)
  let data = []
  snapshot.docs.forEach((doc) => {
      data.push({...doc.data(), id: doc.id})
  })
  return data
  } catch (error) {
    console.log(error.message)
  }
}

export const addDataToStorage = async (collectionName, newData) => {
  const colRef = collection(db, collectionName)
  try {
    await addDoc(colRef, newData)
  } catch (error) {
    console.log(error.message)
  }
}

export const editDataInStorage = async (collectionName, docId, newData ) => {
  const docRef = doc(db, collectionName, docId)
  try {
    await setDoc(docRef, newData)
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteDataFromStorage = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId)
  try {
    await deleteDoc(docRef)
  } catch (error) {
    console.log(error.message)

  }}
