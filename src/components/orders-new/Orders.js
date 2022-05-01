import React, { useState, useEffect } from 'react';
import './Orders.css';
import OrdersActions from './OrdersActions';
import OrdersAddButton from './OrdersAddButton';
import OrdersTable from './OrdersDataTable';
import OrdersDatePicker from './OrdersDatePicker';
import OrdersStatusFilter from './OrdersStatusFilter';
import { fetchOrders } from '../../services/CustomerViewServices';
import { useAuth } from '../../context/AuthContext';
import { filterData } from '../../models/OrdersModel';
import OrdersWizard from './OrdersWizard';
import BasicSearch from '../BasicSearch';

export default function Orders({ customerId, isAdmin }) {
  const { currentUserRole } = useAuth();

  const [ordersData, setOrdersData] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [searchQ, setSearchQ] = useState('');

  // change names - seceted orders!!
  const [multipleSelectedOrders, setMultipleSelectedOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState({
    new: true,
    approved: false,
    printed: false,
    shipped: false,
  });
  const [editMode, setEditMode] = useState();
  const [selectedOrder, setSelectedOrder] = useState();

  //Rita - check if necessary
  const [reloadOrders, setReloadOrders] = useState(true);

  useEffect(() => {
    async function fetchOrdersList() {
      const allOrders = await fetchOrders();
      setOrdersData(allOrders);
      setReloadOrders(false);
    }
    if (reloadOrders) {
      fetchOrdersList();
    }
  }, [setOrdersData, reloadOrders]);

  function handleFilterData(rows) {
    if (rows[0]) {
      return filterData(
        rows,
        currentUserRole,
        isAdmin,
        statusFilter,
        customerId,
        searchQ
      );
    }
    return ordersData;
  }

  return (
    <div className='orders'>
      <OrdersWizard
        selectedOrder={selectedOrder}
        editMode={editMode}
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
        customerId={customerId}
        setReloadOrders={setReloadOrders}
      />
      <div className='primary-actions'>
        <div className='filter'>
          <div className='status-filter'>
            <OrdersStatusFilter
              setStatusFilter={setStatusFilter}
              statusFilter={statusFilter}
            />
          </div>
          <div className='date-picker'>
            <OrdersDatePicker />
          </div>
        </div>
        <div className='add-button'>
          <OrdersAddButton
            setSelectedOrder={setSelectedOrder}
            setEditMode={setEditMode}
            setOpenEdit={setOpenEdit}
            customerId={customerId}
          />
        </div>
      </div>
      <div className='select-and-actions'>
        <div className='search'>
          <BasicSearch
            searchQ={searchQ}
            setSearchQ={setSearchQ}
            category='orders'
          />
        </div>
        {multipleSelectedOrders[0] && (
          <div>
            <OrdersActions selectedOrders={multipleSelectedOrders} />
          </div>
        )}
      </div>

      {ordersData && ordersData[0] && (
        <div className='data-table'>
          <OrdersTable
            ordersData={handleFilterData(ordersData)}
            customerId={customerId}
            setReloadOrders={setReloadOrders}
            setSelectedOrders={setMultipleSelectedOrders}
            selectedOrders={multipleSelectedOrders}
          />
        </div>
      )}
    </div>
  );
}
