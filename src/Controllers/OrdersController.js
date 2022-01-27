import axios from 'axios'
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
    return await axios.post('http://localhost:5000/orders/', {
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