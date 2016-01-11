$(function() {
  $("#convBtn").on("click", convert);
  $("#backBtn").on("click", back);
  $("#jsonRes").on("click", selectRes);
  $("#toggleParams").on("click", toggleParams);
});

var defParam = (new csvtojson.Converter({})).param;
var paramsOn = false;

function toggleParams() {
  if (paramsOn) {
    paramsOn = false;
    $("#paramBox").fadeOut();
    $("#toggleParams").removeClass("on");
  } else {
    paramsOn = true;
    $("#paramBox").fadeIn();
    $("#toggleParams").addClass("on");
    var params = defParam;
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        var val = params[key];
        var obj = $("#conf_" + key);
        if (obj.attr("type") === "checkbox") {
          if (val) {
            obj.attr("checked", "true");
          } else {
            obj.removeAttr("checked");
          }
        } else if (key === "headers") {
          if (val) {
            obj.val(JSON.stringify(val));
          }
        } else {
          obj.val(val);
        }
      }
    }
  }
}

function getParams(defParam) {
  var params = {};
  for (var key in defParam) {
    if (defParam.hasOwnProperty(key)) {
      var obj = $("#conf_" + key);
      if (obj.length ===0){
        params[key]=defParam[key];
        continue;
      }
      if (obj.attr("type") === "checkbox") {
        if (obj.is(":checked")) {
          params[key] = true;
        } else {
          params[key] = false;
        }
      } else if (key === "headers") {
        var val=obj.val();
        if (val) {
          try {
            params[key] = JSON.parse(val);
          } catch (e) {
            console.error(e);
            alert(e.toString());
          }
        }
      } else if (key === "maxRowLength") {
        params[key] = parseInt(obj.val());
        if (isNaN(params[key])) {
          params[key] = 0;
        }
      } else {
        params[key] = obj.val();
      }
    }
  }
  return params;
}

function convert() {
  var csv = $("#csvTxt").val();
  var conv;
  var params = {};
  if (paramsOn) {
    params = getParams(defParam);
  }
  var conv = new csvtojson.Converter(params);
  conv.fromString(csv, function(err, result) {
    if (err){
      alert(err.toString());
      return;
    }
    $("#jsonRes").val(JSON.stringify(result, null, 2));
    $("#source").hide();
    $("#result").fadeIn();
  });
}

function back() {
  $("#source").fadeIn();
  $("#result").hide();
}

function selectRes() {
  $("#jsonRes").select();
}
