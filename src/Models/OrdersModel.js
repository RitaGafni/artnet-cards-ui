export function filterData(
  rows,
  currentUserRole,
  isAdmin,
  statusFilter,
  customerId,
  basicQ
) {
  const id = parseInt(customerId);
  const newData = rows.filter(
    (row) =>
      row.customerId === id &&
      Object.keys(statusFilter).some(
        (status) => statusFilter[status] && row.status === status
      )
  );
  if (basicQ) {
    return search(newData, basicQ);
  } else return newData;
}

export function search(rows, basicQ) {
  if (rows[0]) {
    const allColumns = rows[0] && Object.keys(rows[0]);
    const searchColumns = allColumns.filter((col) => col !== 'img');

    return rows.filter((row) =>
      searchColumns.some((column) => {
        if (row[column]) {
          return (
            row[column].toString().toLowerCase().indexOf(basicQ.toLowerCase()) >
            -1
          );
        } else {
          return null;
        }
      })
    );
  }
}
