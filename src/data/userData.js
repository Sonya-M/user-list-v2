import User from "../entities/User";
import * as utils from "../utilities/helperFns";

const imgPlaceholders = [
  "https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png",
  "https://www.shareicon.net/data/128x128/2017/06/13/887028_face_512x512.png",
  "https://www.shareicon.net/data/128x128/2017/06/13/887041_face_512x512.png",
  "https://www.shareicon.net/data/128x128/2017/06/13/887039_face_512x512.png",
  "https://www.shareicon.net/data/128x128/2017/06/13/887047_face_512x512.png",
  "https://www.shareicon.net/data/128x128/2017/04/06/882897_people_512x512.png"];

function getRandomImg() {
  return imgPlaceholders[utils.randomInt(0, imgPlaceholders.length)];
}

const placeholderUserList = [
  { id: 1, name: "Oliver", email: "bla@example.com", dob: "05-02-2000", img: getRandomImg(), },
  { id: 2, name: "Mark", email: "hello@example.com", dob: "05-02-2010", img: getRandomImg(), },
  { id: 3, name: "Sonja", email: "sonja@gmail.com", dob: "11-05-1979", img: getRandomImg(), },
  { id: 4, name: "Saša", email: "saša@yahoo.com", dob: "11-12-2000", img: getRandomImg(), },
];


// const dataURL = "https://gist.githubusercontent.com/nenadbugaric/385c0200f1886180f6143cad72fadeac/raw/0bc527c2977debe86e18829b42c3abab235de4ce/RandomUsers.js";
const dataURL = "https://randomuser.me/api/?results=15";

export function fetchUserData() {

  return (
    fetch(dataURL)
      .then((response) => {
        // console.log(response);
        if (!response.ok) {
          throw new Error(`Error on fetching data - status: ${response.status}`)
        } else {
          return response.json();
        }
      })
      .then((json) => {
        //   let fetchedUserData = [];
        //   for (let user of json.results) {
        //     fetchedUserData.push({
        //       id: user.login.uuid,
        //       name: user.name.first + " " + user.name.last,
        //       email: utils.maskEmail(user.email),
        //       // parse date string and format it
        //       dob: utils.formatDate(user.dob.date),
        //       img: user.picture.large
        //     });
        //   }
        //   return fetchedUserData;
        // })
        return json.results.map((user) => {
          return new User(user.login.uuid, user.name.first, user.name.last,
            user.email, user.dob.date, user.picture.large, user.gender);
        });
      })
    // leave catching errors to the app
    // .catch((error) => {
    // console.log(error);
    // console.log(`Returning placeholder data...`)
    // return placeholderUserList;
    // })
  );
}

// simulate waiting for response:
export function delayedFetchUserData(millis) {
  return (
    fetchUserData()
      .then(response => utils.sleeper(millis, response))
  );
}