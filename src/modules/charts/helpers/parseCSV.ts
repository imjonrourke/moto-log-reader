type CSVTable = {
    headings: string[];
    body: string[][];
};

export const parseCSV: (csv: string) => CSVTable = (csv) => {
    const rows = csv.split("\n");
    const originalHeadings = rows[0].split(",");
    const emptyIndices: { [key: string]: boolean } = {};
    const body = rows.slice(1).map((row) => {
        return row.split(",").filter((rowItem, index) => {
            if (!rowItem && rowItem !== '0') {
                emptyIndices[index] = true;
            }
            if (rowItem) {
                return rowItem;
            }
        });
    });
    const headings = originalHeadings.filter((heading, index) => {
        if (!emptyIndices[index]) {
            return heading;
        }
    })

    return {
        headings,
        body,
    };
};
