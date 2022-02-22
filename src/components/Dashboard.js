import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CustomerView from './CustomerView';

export default function Dashboard() {
  const [customerId, setCustomerId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const id = history.location.search.substring(1);
    setCustomerId(id);
  }, [history.location.search]);

  return (
    <div
      style={{
        textAlign: '-webkit-center',
      }}
    >
      {customerId && <CustomerView customerId={customerId} />}
    </div>
  );
}
