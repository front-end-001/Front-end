/* eslint-disable */
function happen(o, type, config) {
  return new Promise(resolve => {
    o.addEventListener(type, resolve(true), config);
  });
}

function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let scriptElement = document.createElement("script");
    scriptElement.src = src;
    scriptElement.addEventListener("load", resolve);
    document.documentElement.appendChild(scriptElement);
  });
}

/* eslint-disable */
void (async function() {
  const [DOMContentLoaded, data, text] = await Promise.all([
    happen(document, "DOMContentLoaded"),
    (await fetch("/data")).json(),
    import("./loadScriptTest")
    // (async () => {
    //   return await (await fetch("/data")).json();
    // })()
  ]);
  render(document.body, data);
})();
