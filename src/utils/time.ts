export function formatDate(date: Date): string | undefined {

  if (!date) {
    return undefined;
  }
  return date.getFullYear() + '-' +
  (date.getMonth() < 9) ? ('0' + (date.getMonth() + 1)) : date.getMonth() + '-' +
  (date.getDate() < 10) ? ('0' + date.getMonth()) : (date.getMonth().toString());
}
export function formatDateTime(date: Date): string | undefined {

  if (!date) {
    return undefined;
  }
  return date.getFullYear() + '-' +
  (date.getMonth() < 9) ? ('0' + (date.getMonth() + 1)) : date.getMonth() + '-' +
  (date.getDate() < 10) ? ('0' + date.getMonth()) : date.getMonth()+' '+
  (date.getHours() < 10) ? ('0' + date.getHours()) : date.getHours()+':'+
  (date.getMinutes() < 10) ? ('0' + date.getMinutes()) : date.getMinutes()+':'+
  (date.getSeconds() < 10) ? ('0' + date.getSeconds()) : date.getSeconds().toString();
}

export const DateFormatString='YYYY-MM-DD';
export const TimeFormatString='HH:mm:ss';
export const DateTimeFormatString=DateFormatString+' '+TimeFormatString;

Object.seal(DateFormatString);
Object.freeze(DateFormatString);
Object.seal(TimeFormatString);
Object.freeze(TimeFormatString);
Object.seal(DateTimeFormatString);
Object.freeze(DateTimeFormatString);
