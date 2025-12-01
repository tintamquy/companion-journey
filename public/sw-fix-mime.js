// Service Worker to fix MIME types
// This will intercept requests and fix Content-Type headers

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).then((response) => {
      const url = new URL(event.request.url)
      const pathname = url.pathname
      
      // Only fix MIME types for our assets
      if (pathname.match(/\.(js|mjs)$/)) {
        const newHeaders = new Headers(response.headers)
        newHeaders.set('Content-Type', 'application/javascript; charset=utf-8')
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        })
      } else if (pathname.endsWith('.css')) {
        const newHeaders = new Headers(response.headers)
        newHeaders.set('Content-Type', 'text/css; charset=utf-8')
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        })
      } else if (pathname.endsWith('.json')) {
        const newHeaders = new Headers(response.headers)
        newHeaders.set('Content-Type', 'application/json; charset=utf-8')
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        })
      }
      
      return response
    })
  )
})

