/**
 * Function with multiple parameters and pagination for apps script api. Should be called like this:
 * https://script.google.com/macros/s/AKfycb.../exec?customerCode=12345
 * It gets the data from a table and filters by the query params.
 * @param e 
 * @returns 
 */

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();

  // Convert rows to objects
  let json = data.map(row => {
    let obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });

  // Apply filters based on query parameters
  for (let key in e.parameter) {
    if (key !== "page" && key !== "limit") {
      const value = e.parameter[key];
      json = json.filter(row => String(row[key]) === value);
    }
  }

  // Pagination
  const page = parseInt(e.parameter.page) || 1;
  const limit = parseInt(e.parameter.limit) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = json.slice(start, end);

  // Response
  const response = {
    page: page,
    limit: limit,
    total: json.length,
    data: paginatedData
  };

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
