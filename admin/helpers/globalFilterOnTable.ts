const globalFilterOnTable = (rows, ids, query) => {
  // rows -> All the Rows + query -> Searched String
  // By default it does fuzzy searching
  const param = query.toLowerCase();
  return rows.filter((row) =>
    row.values?.first_name.toLowerCase().includes(param),
  );
};

export default globalFilterOnTable;
