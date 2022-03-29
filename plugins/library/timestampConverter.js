
export function getDateTimeFromTimeStamp(timestamp, noHour) {
  var date = new Date(timestamp?.seconds * 1000);
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var formattedTime = year + '年' + month + '月' + day + '日' + hours + ':' + minutes.substr(-2)
  if(noHour) formattedTime = year + '年' + month + '月' + day + '日'

  return formattedTime
}

export function getDateTime1FromTimeStamp(timestamp, noHour) {
  var date = new Date(timestamp?.seconds * 1000);
  var month = date.getMonth()+1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var formattedTime = month + '/' + day + ' ' + hours + ':' + minutes.substr(-2)

  return formattedTime
}