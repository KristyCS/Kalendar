const dayjs = require("dayjs");

const firstDateInMonth = dayjs().startOf("month");
const firstDateCurrentPeriod = firstDateInMonth.subtract(
  firstDateInMonth.day(),
  "day"
);

// export const todayIdx = (today)=>{
    
// }
              
const MonthFrame = new Array(5);
let runner = firstDateCurrentPeriod;
for (let i = 0; i < 5; i++) {
    MonthFrame[i] = []
  for (let j = 0; j < 7; j++) {
      MonthFrame[i].push(runner);
      runner = runner.add(1, "day");
  }
}
export default MonthFrame;

