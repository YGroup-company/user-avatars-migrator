import { readFile } from "fs/promises";

const json = await readFile("./users.json", "utf8");
const { data } = JSON.parse(json);

let validUrlsCount = 0;
let invalidUrlsCount = 0;

const urlsSet = new Set();

const userIdsSet = new Set();

for (const userId of Object.keys(data)) {
  if (userIdsSet.has(userId)) {
    console.log(`Duplicate user ID: ${userId}`);
  } else {
    userIdsSet.add(userId);
  }
}

for (const user of Object.values(data)) {
  const { photo_url } = user;
  if (photo_url) {
    if (!urlsSet.has(photo_url)) {
      urlsSet.add(photo_url);
    } else {
      console.log(`Duplicate URL: ${photo_url}`);
    }

    if (photo_url.includes("https://")) {
      validUrlsCount++;
    } else {
      invalidUrlsCount++;
    }
  }
}

console.log(`Valid URLs: ${validUrlsCount}`);
console.log(`Invalid URLs: ${invalidUrlsCount}`);
