var Excel = new ActiveXObject("Excel.Application");
var ExcelSheet = new ActiveXObject("Excel.Sheet");
// Make Excel visible through the Application object.
ExcelSheet.Application.Visible = true;
set = function(a, b, val) {
    ExcelSheet.ActiveSheet.Cells(a, b).Value = val
}
get = function(a, b) {
    return ExcelSheet.ActiveSheet.Cells(a, b)
}

