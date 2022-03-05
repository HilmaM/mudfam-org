import { isAfter, isSameDay, isSameSecond, isSameMinute, isSameHour, parseISO, subDays, subHours, subMinutes, subSeconds } from 'date-fns';

function humanReadableDate(comparisonDate) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const _MS_PER_HOUR = 1000 * 60 * 60;
  const _MS_PER_MINUTE = 1000 * 60;
  const _MS_PER_SECOND = 1000;

  // Create a function to add and subtract dates
  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  const today = new Date();

  // Get the days
  const a = new Date(comparisonDate),
    b = new Date(today),
    difference = dateDiffInDays(a, b);

  //Get the Difference in number of days
  const days = subDays(today, difference);

  // Create a function to add and subtract dates
  function minuteDiff(t1, t2) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(t1.getFullYear(), t1.getMonth(), t1.getDate(), t1.getTime());
    const utc2 = Date.UTC(t2.getFullYear(), t2.getMonth(), t2.getDate(), t2.getTime());
  
    return Math.floor((utc2 - utc1) / _MS_PER_HOUR);
  }

  const t1 = new Date(comparisonDate),
    t2 = new Date(today),
    timeDiff = minuteDiff(t1, t2);

  //Get the Difference in number of hours, mnutes and seconds
  const sec = subSeconds(today, timeDiff);
  const min = subMinutes(today, timeDiff);
  const hou = subHours(today, timeDiff);

  // Get the date in English locale to match English day of week keys
  const compare = parseISO(comparisonDate);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  let result = '';
  if (isSameDay(compare, days) && difference < 1) {
    const diffInTime = compare.getTime() - hou;
    result = rtf.format(diffInTime / (60 * 60 * 1000), "hour");
  } else if (isSameDay(compare, days) && difference >= 1 && difference < 7) {
    if (difference === 1) {
      result = rtf.format(-(difference), "day");
    } else if (difference === 2) {
      result = rtf.format(-(difference), "day");
    } else if (difference === 3) {
      result = rtf.format(-(difference), "day");
    } else if (difference === 4) {
      result = rtf.format(-(difference), "day");
    } else if (difference === 5) {
      result = rtf.format(-(difference), "day");
    } else if (difference === 6) {
      result = rtf.format(-(difference), "day");
    } else if (difference === 7) {
      const diffInTime = compare.getTime() - days.getime();
      result = rtf.format(diffInTime / (1000 * 3600 * 24), 'day');
    }
  } else if (isAfter(compare, days) && difference > 7 && difference < 31) {
    if (difference >= 8 && difference < 14) {
      result = rtf.format(-1, "week");
    } else if (difference >= 14 && difference < 21) {
      result = rtf.format(-2, "week");
    } else if (difference >= 21 && difference < 28) {
      result = rtf.format(-3, "week");
    } else if (difference >= 21 && difference < 31) {
      result = rtf.format(-4, "week");
    }
  } else if (isAfter(compare, days) && difference > 31 && difference < 365) {
    if (isAfter(compare, days) && difference > 31 && difference < 60) {
      result = rtf.format(-1, "month");
    } else if (isAfter(compare, days) && difference > 60 && difference < 90) {
      result = rtf.format(-2, "month");
    } else if (isAfter(compare, days) && difference > 90 && difference < 120) {
      result = rtf.format(-3, "month");
    } else if (isAfter(compare, days) && difference > 120 && difference < 150) {
      result = rtf.format(-4, "month");
    } else if (isAfter(compare, days) && difference > 150 && difference < 180) {
      result = rtf.format(-5, "month");
    } else if (isAfter(compare, days) && difference > 180 && difference < 210) {
      result = rtf.format(-6, "month");
    } else if (isAfter(compare, days) && difference > 210 && difference < 240) {
      result = rtf.format(-7, "month");
    } else if (isAfter(compare, days) && difference > 240 && difference < 270) {
      result = rtf.format(-8, "month");
    } else if (isAfter(compare, days) && difference > 270 && difference < 300) {
      result = rtf.format(-9, "month");
    } else if (isAfter(compare, days) && difference > 300 && difference < 330) {
      result = rtf.format(-10, "month");
    } else if (isAfter(compare, days) && difference > 330 && difference < 360) {
      result = rtf.format(-11, "month");
    } else if (isAfter(compare, days) && difference > 360 && difference < 390) {
      result = rtf.format(-12, "month");
    } 
  } else if (isAfter(compare, days) && difference > 365) {
    result = rtf.format(-1, "year");
  }

  return `Last updated ${result}`;
}

export default humanReadableDate;
