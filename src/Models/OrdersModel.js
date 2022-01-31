


export function filterData(rows, currentUserRole, isAdmin,  statusFilter, customerId,  basicQ, AdvQ, AdvCat) {
    
      // filter by status and custumer id
      const newData = rows.filter(
        (row) =>
          currentUserRole !== 'admin' &&
          (row.customerId === customerId || isAdmin) &&
          Object.keys(statusFilter).some(
            (status) => statusFilter[status] && row.status === status
          )
      );
      if (basicQ) {
        return search(newData, basicQ);
      } else if (AdvQ[0] || AdvQ[1]) {
        return advSearch(newData, AdvCat, AdvQ);
      } else return newData;
    
  }

  export function advSearch(rows, AdvCat, AdvQ) {
    console.log('cat1, ', AdvCat[0]);

    console.log('cat2, ', AdvCat[1]);
    return rows.filter(
      (row) =>
        (![AdvQ[0]] ||
          row[AdvCat[0]]
            .toString()
            .toLowerCase()
            .indexOf(AdvQ[0].toLowerCase()) > -1) &&
        (!AdvQ[1] ||
          row[AdvCat[1]]
            .toString()
            .toLowerCase()
            .indexOf(AdvQ[1].toLowerCase()) > -1)
    );
  }

  export function search(rows, basicQ) {
    if (rows[0]) {
      const allColumns = rows[0] && Object.keys(rows[0]);
      const searchColumns = allColumns.filter((col) => col !== 'img');

      return rows.filter((row) => 
         searchColumns.some(
          (column) => {
              if (row[column]){
           return  row[column].toString().toLowerCase().indexOf(basicQ.toLowerCase()) >
            -1} else {
                 return null
                }}
        )
      );
    }
  }