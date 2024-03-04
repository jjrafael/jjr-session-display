import * as dayjs from "dayjs";

const customParseFormat = require('dayjs/plugin/customParseFormat');
const isBetween = require('dayjs/plugin/isBetween');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(relativeTime);

export const getNow = (format) => {
  return format ? dayjs().format(format) : dayjs();
}

export const formatDate = (data, format) => {
  const today = dayjs().format('MM/DD/YYYY ');
  return dayjs(format ? data : today+data).format(format || "hh:mm A");
};

export const relTime = (data, isAgo) => {
  return isAgo ? dayjs(data).toNow() : dayjs(data).fromNow();
};