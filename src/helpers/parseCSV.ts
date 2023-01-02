type CSVTable = {
    headings: string[];
    body: string[][];
};

export const parseCSV: (csv: string) => CSVTable = (csv) => {
    const rows = csv.split("\n");
    const headings = rows[0].split(",");
    const body = rows.slice(1).map((row) => {
        return row.split(",");
    });

    return {
        headings,
        body,
    };
};
