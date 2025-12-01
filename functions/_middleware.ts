// Cloudflare Pages Function - Auto-fix MIME types
// This runs on every request to fix Content-Type headers

export async function onRequest({ request, next }: any) {
  const response = await next()
  const url = new URL(request.url)
  const pathname = url.pathname
  
  // Clone response to modify headers
  const newResponse = new Response(response.body, response)
  
  // Fix MIME types based on file extension
  if (pathname.match(/\.(js|mjs)$/)) {
    newResponse.headers.set('Content-Type', 'application/javascript; charset=utf-8')
  } else if (pathname.endsWith('.css')) {
    newResponse.headers.set('Content-Type', 'text/css; charset=utf-8')
  } else if (pathname.endsWith('.json')) {
    newResponse.headers.set('Content-Type', 'application/json; charset=utf-8')
  } else if (pathname.endsWith('.html')) {
    newResponse.headers.set('Content-Type', 'text/html; charset=utf-8')
  }
  
  // Security headers
  newResponse.headers.set('X-Content-Type-Options', 'nosniff')
  newResponse.headers.set('X-Frame-Options', 'DENY')
  newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  return newResponse
}
