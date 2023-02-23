import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { duration: '3s', target: 1000 },
    { duration: '30s', target: 1000 }
  ]
};

// export function handleSummary(data) {
//   return {
//     "summary.html": htmlReport(data)
//   }
// }

export default function () {
  http.get(`http://127.0.0.1:3000/api/reviews?product_id=${Math.floor(Math.random() * 1000010) + 1}`)
  sleep(1);
}