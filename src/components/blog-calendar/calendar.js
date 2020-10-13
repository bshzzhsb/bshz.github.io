/** @jsx jsx */
import { jsx } from "theme-ui"

function getYearDaysCount(year, month = 12, day = 0) {
  let days = 0;
  for (let i = 1; i <= month; i++) {
    days += new Date(year, i, i === month ? day : 0).getDate();
  }
  return days;
}

const getYearDates = (year, preOffset) => {
  let yearDates = [];
  for (let i = preOffset - 1; i >= 0; i--) {
    yearDates.push(new Date(year - 1, 11, 31 - preOffset).toDateString());
  }
  for (let i = 0; i < 12; i++) {
    for (let day = 1; day <= new Date(year, i + 1, 0).getDate(); day++) {
      yearDates.push(new Date(year, i, day).toDateString());
    }
  }
  return yearDates;
}

function Calendar({ dateArr, year = new Date().getFullYear() }) {
  let yearDays = getYearDaysCount(year);
  let preOffset = new Date(year, 0, 1).getDay();
  let cols = new Array(Math.ceil((yearDays + preOffset) / 7)).fill('');
  let arr = new Array(preOffset + yearDays).fill(0);
  for (let date of dateArr) {
    if (date[0] === year) {
      let index = getYearDaysCount(date[0], date[1], date[2]) + preOffset;
      arr[index] += 1;
    }
  }
  let yearDates = getYearDates(year, preOffset);
  let day = 0;
  let firstDaysOfMonth = Array.from({length: 12}).map((_, i) => getYearDaysCount(year, i, 0) + preOffset);
  let week = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <div>
      <ul
        sx={{
          listStyle: `none`,
          display: `flex`,
        }}
      >
        <li>
          <ul
            sx={{
              listStyle: `none`,
              display: `flex`,
              flexDirection: `column`,
            }}
          >
            {week.map((item) => (
              <li
                sx={{
                  width: t => t.space[6],
                  height: t => item ? t.space[4] : t.space[3],
                  fontSize: t => t.fontSizes[0],
                  m: item ? `0` : `2px`,
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </li>
        {Array.from({length: cols.length}).map((_, col) => (
          <li>
            <ul
              sx={{
                listStyle: `none`,
                display: `flex`,
                flexDirection: `column`,
                position: `relative`,
              }}
            >
              {Math.floor(firstDaysOfMonth[0] / 7) === col && firstDaysOfMonth.shift() && (
                <li
                  sx={{
                    position: `absolute`,
                    top: t => `-${t.space[4]}`,
                    fontSize: t => t.fontSizes[0],
                  }}
                >
                  {new Date(year, 11 - firstDaysOfMonth.length, 1).toDateString().split(" ")[1]}
                </li>
              )}
              {Array.from({length: 7}).map((_, index) => (
                <li
                  sx={{
                    position: `relative`,
                  }}
                >
                  <div
                    sx={{
                      backgroundColor: t => arr[col * 7 + index] ? t.colors.green[20] : t => t.colors.grey[10],
                      width: t => t.space[3],
                      height: t => t.space[3],
                      m: `2px`,
                      boxSizing: `border-box`,
                      border: t => `${t.borders[1]} ${t.colors.grey[20]}`,
                      borderRadius: `1px`,
                      "&:hover + div": {
                        display: `inline-block`,
                      },
                    }}
                  />
                  <div
                    sx={{
                      position: `absolute`,
                      display: `none`,
                      zIndex: 100,
                      top: t => `-${t.space[6]}`,
                      left: 0,
                      "&:hover": {
                        display: `inline-block`,
                      },
                    }}
                  >
                    {yearDates[day++]}
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Calendar
