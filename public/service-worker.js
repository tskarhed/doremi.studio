importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

workbox.core.skipWaiting();
workbox.core.clientsClaim();

const getSampleUrl = (note) => `https://raw.githubusercontent.com/googlecreativelab/aiexperiments-ai-duet/master/static/audio/Salamander/${note}.mp3`;
const sampleUrls = [
  'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7',
  'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7',
].map((note) => ({
  url: getSampleUrl(note),
  revision: null,
}));

workbox.precaching.precacheAndRoute(sampleUrls);