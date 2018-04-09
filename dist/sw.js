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
    "url": "3816a0c7a5a718d1ad03.js",
    "revision": "3776b9e6258ae0e6b87dba0d13ccc7d6"
  },
  {
    "url": "b3efaca6820cf7239aae.js",
    "revision": "c104f1ffb6fa8750ea58c84ea2debb35"
  },
  {
    "url": "index.html",
    "revision": "2878b778afd607bf48d48b55bbccad4c"
  },
  {
    "url": "style.css",
    "revision": "dc73b3a4eb1d47f9a377c164084b49ad"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
