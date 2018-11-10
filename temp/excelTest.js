const excel = require('exceljs');
const readFile = async(fileName) => await new Promise(resolve => new excel.Workbook().xlsx.readFile(fileName).then(res => resolve(res)));

/** manipulate one excel file */
const path = "C:\\Users\\Eric\\Desktop\\New Microsoft Excel Worksheet.xlsx";
readFile(path).then((wb) => {
    const ws = wb.getWorksheet(1);
    ws.getCell("A1").value = 12;  // set value
    console.log(ws.getCell("A1").value);  // get value
    console.log(ws.rowCount);  // 1 -> iLastRow
    console.log(ws.columnCount);
    wb.xlsx.writeFile(path);
});

/** manipulate multiple excel file */
const path2 = "C:\\Users\\Eric\\Desktop\\abc.xlsm";
Promise.all([readFile(path), readFile(path2)]).then(wbs => {
    const vals = wbs.map(wb => wb.getWorksheet(1).getCell("A1").value);
    console.log(vals.reduce((prev, val) => prev + val));
});
