// Cloudflare Pages Function to set correct MIME types
// This file will be automatically used by Cloudflare Pages

export async function onRequest(context: any) {
  const response = await context.next()
  const url = new URL(context.request.url)
  
  // Set correct Content-Type headers for JavaScript files
  if (url.pathname.match(/\.(js|mjs)$/)) {
    response.headers.set('Content-Type', 'application/javascript; charset=utf-8')
  } else if (url.pathname.endsWith('.css')) {
    response.headers.set('Content-Type', 'text/css; charset=utf-8')
  } else if (url.pathname.endsWith('.json')) {
    response.headers.set('Content-Type', 'application/json; charset=utf-8')
  } else if (url.pathname.endsWith('.html')) {
    response.headers.set('Content-Type', 'text/html; charset=utf-8')
  }
  
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  return response
}
