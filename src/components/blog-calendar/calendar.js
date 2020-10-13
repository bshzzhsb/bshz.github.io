/** @jsx jsx */
import { jsx } from "theme-ui"
import { MoneyBill } from "@styled-icons/fa-solid"

function getYearDays(year, month = 12, day = 0) {
  let days = 0;
  for (let i = 1; i <= month; i++) {
    days += new Date(year, i, i === month ? day : 0).getDate();
  }
  return days;
}

function Calendar({ dateArr, year = new Date().getFullYear() }) {
  let yearDays = getYearDays(year);
  let preOffset = new Date(year, 0, 1).getDay();
  let cols = new Array(Math.ceil((yearDays + preOffset) / 7)).fill('');
  let arr = new Array(preOffset + yearDays).fill(0);
  for (let date of dateArr) {
    if (date[0] === year) {
      let index = getYearDays(date[0], date[1], date[2]) + preOffset;
      arr[index] += 1;
    }
  }
  let firstDaysOfMonth = Array.from({length: 12}).map((_, i) => getYearDays(year, i, 0));
  for (let i = 0; i < 12; i++) {
    let firstDay = firstDaysOfMonth[i];
    arr[Math.floor(firstDay / 7)].push(new Date(year, i, 1).toDateString().split(" ")[1]);
  }
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
        {Array.from({length: cols}).map((_, col) => (
          <li>
            <ul
              sx={{
                listStyle: `none`,
                display: `flex`,
                flexDirection: `column`,
              }}
            >
              {Array.from({length: 7}).map((_, index) => (
                <li
                  sx={{
                    backgroundColor: t => arr[col * 7 + index] ? t.colors.green[20] : t => t.colors.grey[10],
                    width: t => t.space[3],
                    height: t => t.space[3],
                    m: `2px`,
                    boxSizing: `border-box`,
                    border: t => `${t.borders[1]} ${t.colors.grey[20]}`,
                    borderRadius: `1px`,
                  }}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Calendar
