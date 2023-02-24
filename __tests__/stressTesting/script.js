import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  stages: [
    { duration: '3s', target: 1000 },
    { duration: '30s', target: 1000 }
  ]
};

// output results into a graphic html file
// export function handleSummary(data) {
//   return {
//     "summary.html": htmlReport(data)
//   }
// }

// for testing post requests
// export default function() {
//   const url = 'http://127.0.0.1:3000/api/reviews';
//   const payload = JSON.stringify({
//     "product_id": 1,
//     "rating": 3,
//     "summary": "testing testing testing.",
//     "body": "testing testing testing",
//     "recommend": true,
//     "name": "jrod",
//     "email": "testyboi@gmail.com",
//     "photos": ["http://testphotourl.com"],
//     "characteristics": {
//         "1": 3,
//         "2": 3,
//         "3": 2,
//         "4": 5
//     }
//   });

//   const params = {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };

//   http.post(url, payload, params);
//   sleep(1);
// };



export default function () {
  http.get(`http://127.0.0.1:3000/api/reviews?product_id=${Math.floor(Math.random() * 1000010) + 1}`);
  sleep(1);
}