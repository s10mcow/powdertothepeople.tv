importScripts('workbox-sw.prod.v2.1.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "9e75a0da1e3eb158df5c.js",
    "revision": "090e3479c74a343e1b3e36606634294e"
  },
  {
    "url": "index.html",
    "revision": "669cabac2d91209ee2f807a2669d71c9"
  },
  {
    "url": "style.css",
    "revision": "6b1a7ce893780dddc0b1e711c36a1e3d"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
