var JapaneseHolidays = require('japanese-holidays');
import {InputHourType} from '~/constants/'

export const currentTime = function() {
  var today = new Date()
  var currenthour = (today.getHours()<10?'0':'') + today.getHours() 

  var currentminute = (today.getMinutes()<10?'0':'') + today.getMinutes() 

  var timeNow =  `${currenthour}:${currentminute}`
  return timeNow
}

export const checkIfOpen = function(directSale) {
  // businessHoursがnullの場合は休業を返す
  if (!directSale.businessHours){
    return false
  }
  let businessHourForToday = getTodayHour(directSale)
  // 時間を比べる際のフォーマットを揃える
  // 5:00 はダメ　05:00でないと比べられない
  if(businessHourForToday.inputType === InputHourType.is_24hrs){
    return true
  }
  else if(businessHourForToday.inputType === InputHourType.is_closed){
    return false
  }
  else if(businessHourForToday.inputType === InputHourType.is_open) {
    let openHour = businessHourForToday.dayHour.start
    let closeHour = businessHourForToday.dayHour.end
    if (!openHour || !closeHour) {
      return false
    } else {
      if(openHour !== '' && openHour.length<5){
        openHour = '0' + openHour
      }
      if(closeHour !== '' && closeHour.length<5){
        closeHour = '0' + closeHour
      }
      if (openHour < currentTime() && currentTime() < closeHour){
        return true
      } else {
        return false
      }
    }
  }
  else{
    return false
  }
}

export const getTodayHour = function(directSale) {
  var today = new Date()
  var currentDay = today.getDay()
  let businessHourForToday = ''
  switch(currentDay){
    case 0:
      businessHourForToday = directSale.businessHours.sunday
      break
    case 1:
      businessHourForToday = directSale.businessHours.monday
      break
    case 2:
      businessHourForToday = directSale.businessHours.tuesday
      break
    case 3:
      businessHourForToday = directSale.businessHours.wednesday
      break
    case 4:
      businessHourForToday = directSale.businessHours.thursday
      break
    case 5:
      businessHourForToday = directSale.businessHours.friday
      break
    case 6:
      businessHourForToday = directSale.businessHours.saturday
      break
    default:
      businessHourForToday = ''
  }
  // 今日が祝日だったら businessHourForTodayを祝日用にする
  var holiday = JapaneseHolidays.isHoliday(today)
  if(holiday){
    businessHourForToday = directSale.businessHours.publicHoliday
  }
  return businessHourForToday
}


export const getAbsentMessage = function(directSale) {
  if (!directSale.businessHours) return "未設定"
  // "未設定"
  
  const today = new Date()
  const keyMap = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday","publicHoliday"]
  const keyIdx = JapaneseHolidays.isHoliday(today) ? 7 : today.getDay()
  
  const businessHourInputType = directSale.businessHours[keyMap[keyIdx]]?.inputType
  const dayHour = directSale.businessHours[keyMap[keyIdx]]?.dayHour

  if (dayHour.start !== "" || dayHour.start !== "") {
    if (businessHourInputType === InputHourType.is_closed) return "休業中"
    if (businessHourInputType === InputHourType.not_set) return "未設定"
    if (businessHourInputType === InputHourType.is_open) return "未設定"
    if (businessHourInputType === InputHourType.is_24hrs) return "営業中"
  } 
  return "未設定"
}
