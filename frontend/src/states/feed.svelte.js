let feed = $state({});

export function getFeed() {
  return feed;
}

export function setFeed(newFeed) {
  feed = newFeed;
}
