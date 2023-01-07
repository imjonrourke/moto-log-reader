type CSVTable = {
  headings: string[];
  body: string[][];
};
type CSVData = {
  [key: string]: string[] | number[];
};

export const parseCSV: (csv: string) => CSVTable = (csv) => {
  const rows = csv.split("\n");
  const headingsObj = rows[0].split(",").reduce<{ [key: number]: string }>((acc, row, index) => {
    return {
      ...acc,
      [index]: row
    };
  }, {});
  const originalHeadings = rows[0].split(",");
  const emptyIndices: { [key: string]: boolean } = {};
  const body = rows.slice(1).map((row) =>
    row.split(",").filter((rowItem, index) => {
      // if (index === 1) {
      //   if (!rowItem && rowItem === '') {
      //     emptyIndices[index] = true;
      //   }
      // }
      // if (rowItem || rowItem != '') {
      //   return rowItem;
      // }
      return rowItem;
    }));
  const headings = originalHeadings.filter((heading, index) => {
    return heading;
    if (!emptyIndices[index]) {
      return heading;
    }
  })

  return {
    headings,
    body,
  };
};

export const parseCSVToArrs: (csv: string) => CSVData = (csv) => {
  const rows = csv.split("\n");
  const headings = rows[0].split(",").reduce<{ [key: number]: string }>((acc, row, index) => {
    return {
      ...acc,
      [index]: row
    };
  }, {});
  return rows.slice(1).reduce<{[key: string]: string[]}>((acc, row) => {
    row.split(",").map((rowItem, index) => {
      if (!acc[headings[index]]) {
        acc[headings[index]] = [];
      }
      if (rowItem && rowItem.trim() !== '') {
        acc[headings[index]].push(rowItem);
      }
    });
    return acc;
  }, {});
};
