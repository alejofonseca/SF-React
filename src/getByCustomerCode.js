/**
 * Function for apps script api. Should be called like this:
 * https://script.google.com/macros/s/AKfycb.../exec?customerCode=12345
 * It gets the data from a table and filters by the query params.
 * @param e 
 * @returns 
 */

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();

  // Get query parameter
  const customerCode = e.parameter.customerCode;

  // Convert rows to objects
  const json = data.map(row => {
    let obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });

  // Filter by customerCode if provided
  const filtered = customerCode
    ? json.filter(row => row["CustomerCode"] == customerCode)
    : json;

  return ContentService
    .createTextOutput(JSON.stringify(filtered))
    .setMimeType(ContentService.MimeType.JSON);
}
