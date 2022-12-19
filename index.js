/**
    * Example someHost is set up to take in a JSON request
    * Replace url with the host you wish to send requests to
    * @param {string} someHost the host to send the request to
    * @param {string} url the URL to send the request to
*/
 
/**
    * gatherResponse awaits and returns a response body as a string.
    * Use await gatherResponse(..) in an async function to get the response body
    * @param {Response} response
*/
async function gatherResponse(response) {
    const { headers } = response;
    const contentType = headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        return JSON.stringify(await response.json());
    }
    return response.text();
}
 
async function handleRequest(request) {
    const { pathname } = new URL(request.url)
    if (!pathname.startsWith("/invite")) return new Response("Not Found", { status: 404 })

    const init = {
        headers: {
            'content-type': 'application/json'
        }
   };
   const response = await fetch(`https://discord.com/api/v10/invites/${pathname.replace('/invite/', '')}`, init);
   const results = await gatherResponse(response);
   return new Response(results, init);
}
 
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})
