import React, { useState, useContext, useEffect } from "react";
import LocalContext from "./LocalContext";
import { get } from "lodash";

export default function ServerTime() {
  const { serverTime, isDev } = useContext(LocalContext);
  const [_serverTime, _setServerTime] = useState(serverTime);
  useEffect(() => {
    if (isDev) {
      setInterval(() => {
        _setServerTime({ serverTime: `${Date.now()}` });
      }, 1000);
    } else {
      _setServerTime({ ...serverTime });
    }
  }, [_serverTime]);
  const { ymd, hms } = formatTimestamp(
    parseInt(get(_serverTime, "serverTime")),
  );
  return (
    <div>
      {ymd} {hms}
    </div>
  );
}

/**
 *
 * @param {Number} timestamp
 */
function formatTimestamp(timestamp) {
  if (isNaN(timestamp)) return { ymd: "", hms: "" };
  const date = new Date(timestamp);
  return {
    ymd: `${date.getFullYear()}-${fixToDigits(
      date.getMonth() + 1,
    )}-${fixToDigits(date.getDate())}`,
    hms: `${fixToDigits(date.getHours())}:${fixToDigits(
      date.getMinutes(),
    )}:${fixToDigits(date.getSeconds())}`,
  };
}
/**
 *
 * @param {Number | String} d
 * @param {Number} n add prefix zeroes before d in order to make d in n digits
 * @returns {String}
 */
function fixToDigits(d, n = 2) {
  const ds = `${d}`;
  return ds.length >= n ? ds : [...Array(n - ds.length).fill(0), d].join("");
}
