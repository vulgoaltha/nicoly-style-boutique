let a;function s(e){a={error:e,at:Date.now()}}typeof globalThis.addEventListener=="function"&&(globalThis.addEventListener("error",e=>s(e.error??e)),globalThis.addEventListener("unhandledrejection",e=>s(e.reason)));function l(){if(!a)return;if(Date.now()-a.at>5e3){a=void 0;return}const{error:e}=a;return a=void 0,e}function u(){return`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`}let o;async function h(){return o||(o=import("./vendor-Dk_8eqOG.mjs").then(e=>e.s).then(e=>e.default??e)),o}function i(){return new Response(u(),{status:500,headers:{"content-type":"text/html; charset=utf-8"}})}function f(e,n){let r;try{r=JSON.parse(e)}catch{return!1}if(!r||Array.isArray(r)||typeof r!="object")return!1;const t=r,d=new Set(["message","status","unhandled"]);return Object.keys(t).every(c=>d.has(c))?t.unhandled===!0&&t.message==="HTTPError"&&(t.status===void 0||t.status===n):!1}async function p(e){if(e.status<500||!(e.headers.get("content-type")??"").includes("application/json"))return e;const n=await e.clone().text();return f(n,e.status)?(console.error(l()??new Error(`h3 swallowed SSR error: ${n}`)),i()):e}const m={async fetch(e,n,r){try{const t=await(await h()).fetch(e,n,r);return await p(t)}catch(t){return console.error(t),i()}}};export{m as default,u as r};
