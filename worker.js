// Cloudflare Worker to fix MIME types for Cloudflare Pages
// Deploy this as a separate Worker and route traffic through it

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Proxy request to Cloudflare Pages
  const pagesUrl = `https://companion-journey.pages.dev${url.pathname}${url.search}`
  const response = await fetch(pagesUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  })
  
  // Clone response to modify headers
  const newResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: new Headers(response.headers),
  })
  
  // Fix MIME types
  if (url.pathname.match(/\.(js|mjs)$/)) {
    newResponse.headers.set('Content-Type', 'application/javascript; charset=utf-8')
  } else if (url.pathname.endsWith('.css')) {
    newResponse.headers.set('Content-Type', 'text/css; charset=utf-8')
  } else if (url.pathname.endsWith('.json')) {
    newResponse.headers.set('Content-Type', 'application/json; charset=utf-8')
  } else if (url.pathname.endsWith('.html')) {
    newResponse.headers.set('Content-Type', 'text/html; charset=utf-8')
  }
  
  // Security headers
  newResponse.headers.set('X-Content-Type-Options', 'nosniff')
  newResponse.headers.set('X-Frame-Options', 'DENY')
  newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  return newResponse
}

