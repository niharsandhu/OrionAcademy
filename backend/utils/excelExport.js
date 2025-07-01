const xlsx = require("xlsx");
const fs = require("fs");

exports.exportToExcel = (data, filename, res) => {
  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Data");

  const filePath = `./exports/${filename}.xlsx`;
  xlsx.writeFile(workbook, filePath);

  res.download(filePath, filename + ".xlsx", () => {
    fs.unlinkSync(filePath); // Delete after download
  });
};
