/**
 * @param {string} dateString string in a valid date fromat
 * @returns date string in the format DD Mon YYYY (e.g. "25 Mar 1972")
 */
export function formatDate(dateString) {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' })
    .format(Date.parse(dateString));
}

/**
 * @param {number} low lower boundary, inclusive
 * @param {number} hi upper boundary, exclusive
 * @returns integer in range [low, hi)
 */
export function randomInt(low, hi) {
  return Math.floor(Math.random() * (hi - low) + low);
}

/**
 * Delays an operation by given delay in millisecs.
 * Example usage:
 function delayedFetchUserData(millis) {
  return (
    fetchUserData()
      .then(response => sleeper(millis, response))
      .catch(() => console.log("Unexpected error"))
  );
}
 * @param {number} millis delay in milliseconds
 * @param {any} value value to be returned after given delay
 * @returns promise that returns given value
 */
export function sleeper(millis, value) {
  return new Promise(resolve => {
    // setTimeout(resolve, millis, value);
    setTimeout(() => resolve(value), millis); // same result as line above
  })
}

export function maskEmail(email) {
  let end = email.substring(email.indexOf("@"));
  let begin = email.substring(0, 3);
  return begin + "..." + end;
}

/**
 * 
 * @param {string} stringToSearch 
 * @param {string} queryString 
 * @returns true if stringToSearch includes all of the words in query string, 
 * in any order (so if one types the surname before the first name,
 * the return val is still true)
 */
export const includesIgnoreCase = (stringToSearch, queryString) => {
  if (queryString.length === 0) return true;
  queryString = (queryString.trim());
  let queries = queryString.split(/\s+/);

  for (let i = 0; i < queries.length; i++) {
    if (i === queries.length - 1) queries[i] = new RegExp("\\b" + queries[i], "i");
    else queries[i] = new RegExp("\\b" + queries[i] + "\\b", "i");
  }
  for (let i = 0; i < queries.length; i++) {
    if (!stringToSearch.match(queries[i])) return false;
  }

  return true;
};


// source: https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
/**
 * @param {number} timestampInMillis date in UNIX time, in milliseconds
 * @returns {string} interval btw now and timestampInMillis, in human readable form
 */
export function getTimeAgo(timestampInMillis) {
  const seconds = Math.floor((Date.now() - timestampInMillis) / 1000);
  let interval = Math.floor(seconds / 31536000); // 31,536,000 seconds in a year
  if (interval > 1) return `${interval} years`;
  interval = Math.floor(seconds / 2592000); // 2,592,000 seconds in a month/30 days
  if (interval > 1) return `${interval} months`;
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days`;
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours`;
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes`;
  return `${Math.floor(seconds)} seconds`;
}