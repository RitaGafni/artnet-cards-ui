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

export function filterAllData(rows, searchQ) {
  if (rows[0]) {
    const allColumns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      allColumns.some((column) => {
        if (row[column]) {
          return (
            row[column]
              .toString()
              .toLowerCase()
              .indexOf(searchQ.toLowerCase()) > -1
          );
        } else {
          return null;
        }
      })
    );
  }
}
