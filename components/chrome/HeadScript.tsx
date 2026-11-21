// Runs synchronously while <head> parses, before first paint: marks JS, restores the Motion choice, turns on the
// dev grid (?grid=1), marks the first load (data-first: inner posters land once), and flags a JS failure if the
// app has not hydrated 2s after the page and its scripts have loaded, so nothing pre-hidden stays hidden.
// (Arming on load, not at parse time, keeps a slow 3G hydration from flipping the pre-hidden states twice.)
const BOOT = `(function(){var d=document.documentElement;d.setAttribute('data-js','');d.setAttribute('data-first','');
try{if(localStorage.getItem('awsavya-motion')==='off')d.setAttribute('data-motion','off')}catch(e){}
if(/[?&]grid=1/.test(location.search))d.setAttribute('data-grid','');
addEventListener('load',function(){setTimeout(function(){if(!window.__awReady)d.setAttribute('data-js-failed','')},2000)})})()`;

export function HeadScript() {
  return <script dangerouslySetInnerHTML={{ __html: BOOT }} />;
}
