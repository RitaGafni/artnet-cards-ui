export function filterData(
  rows,
  currentUserRole,
  isAdmin,
  statusFilter,
  customerId,
  basicQ,
  AdvQ,
  AdvCat
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
  } else if (AdvQ[0] || AdvQ[1]) {
    return advSearch(newData, AdvCat, AdvQ);
  } else return newData;
}

export function advSearch(rows, AdvCat, AdvQ) {
  return rows.filter(
    (row) =>
      (![AdvQ[0]] ||
        row[AdvCat[0]].toString().toLowerCase().indexOf(AdvQ[0].toLowerCase()) >
          -1) &&
      (!AdvQ[1] ||
        row[AdvCat[1]].toString().toLowerCase().indexOf(AdvQ[1].toLowerCase()) >
          -1)
  );
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
