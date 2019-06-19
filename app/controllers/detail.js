// var args = $.args;
var args = arguments[0] || {};

Ti.API.debug("detail open, args = "+JSON.stringify(args));

$.detailWin.title = args.name;
$.numberLbl.text = args.number;