import moment from "moment";

/**
 * Helper, that is used to forcibly finalize all promises
 * in thunk before running matcher against state.
 *
 * TODO: move this to setupTest or testUtils - it's only used in tests.
 */
export const executeThunk = async (thunk, dispatch, getState = undefined) => {
  await thunk(dispatch, getState);
  await new Promise(setImmediate);
};

/**
 * Utility function for appending the browser timezone to the url
 * Can be used on the backend when the user timezone is not set in the user account
 */
export const appendBrowserTimezoneToUrl = (url: string) => {
  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const urlObject = new URL(url);
  if (browserTimezone) {
    urlObject.searchParams.append("browser_timezone", browserTimezone);
  }
  return urlObject.href;
};

/**
 * Formats a UTC date string to local timezone with specified format
 * @param {string} date - The UTC date string to format
 * @param {string} [format='ll, LT'] - Moment.js format string
 *                                     Default: 'll, LT' (e.g., "Sep 4, 2023, 3:45 PM")
 * @returns {string} The formatted date string in local timezone
 * @example
 * formatToDate('2023-09-04T15:45:00Z')
 * // Returns: "Sep 4, 2023, 3:45 PM"
 *
 * formatToDate('2023-09-04T15:45:00Z', 'YYYY-MM-DD')
 * // Returns: "2023-09-04"
 */
export const formatToDate = (date: string, format = 'll, LT') => moment.utc(date).local().format(format);
