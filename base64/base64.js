(function () {
  var url = location.href;
  var search = url.split("?")[1];
  if (search) {
    var parts = search.split("&");
    var data = null;
    var fileName = null;
    parts.forEach(function (p) {
      if (p.indexOf("base64") > -1) {
        data = p.replace("base64=", "");
      } else if (p.indexOf("fileName") > -1) {
        fileName = p.replace("fileName=", "");
      }
    });
    if (data && fileName) {
      var a = document.createElement("a");
      a.download = fileName;
      a.href = data;
      a.click();
    }
  }
})();