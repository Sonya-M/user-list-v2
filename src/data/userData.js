import User from "../entities/User";
import * as utils from "../utilities/helperFns";

// const ENDPOINT = "https://gist.githubusercontent.com/nenadbugaric/385c0200f1886180f6143cad72fadeac/raw/0bc527c2977debe86e18829b42c3abab235de4ce/RandomUsers.js";
const ENDPOINT = "https://randomuser.me/api/?results=30";

/**
 * If data is already in local storage, returns stored data,
 * otherwise fetches new content from ENDPOINt and returns it.
 * @returns array of User objects
 */
function getUserData() {
  const userData = localStorage.getItem("userData");
  if (userData) {
    return new Promise(resolve => {
      resolve(mapToUserObjects(JSON.parse(userData)))
    });
  } else {
    return fetchUserData();
  }
}

/**
 * @returns true if user data is stored in local storage, false otherwise
 */
export function dataInStorage() {
  return localStorage.getItem("userData") !== null;
}

/**
 * Fetches user data from the ENDPOINT and stores it in local storage.
 * @returns a list of User objects fetched from ENDPOINT
 */
function fetchUserData() {

  return (
    fetch(ENDPOINT)
      .then((response) => {
        // console.log(response);
        if (!response.ok) {
          throw new Error(`Error on fetching data - status: ${response.status}`)
        } else {
          return response.json();
        }
      })
      .then((json) => {
        localStorage.setItem("userData", JSON.stringify(json.results));
        console.log(json.results);
        return mapToUserObjects(json.results);
      })
    // leave catching errors to the app
  );
}

// simulate waiting for response:
export function delayedRetrieveUserData(fetchNew, millis) {
  return (
    retrieveUserData(fetchNew)
      .then(response => utils.sleeper(millis, response))
  );
}

function mapToUserObjects(rawJsonList) {
  return rawJsonList.map((user) => {
    return new User(user.login.uuid, user.name.first, user.name.last,
      user.email, user.dob.date, user.picture.large, user.gender, user.location, user.cell);
  })
}

/**
 * If fetchNew, fetches new random data from ENDPOINT, otherwise checks if the 
 * data is already stored in local storage, and returns it if present - if not,
 * behaves as if fetchNew were true.
 * @param {boolean} fetchNew fetch new random content ?
 * @returns an array of User objects
 */
export function retrieveUserData(fetchNew) {
  if (fetchNew) return fetchUserData();
  else return getUserData();
}