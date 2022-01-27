

export function filterCustomersData(rows, searchQ) {
    if (rows[0]) {
      const newData = rows.filter(
        (row) =>
          row.customer_name
            .toString()
            .toLowerCase()
            .indexOf(searchQ.toLowerCase()) > -1
      );
      return newData;
    }
  }

