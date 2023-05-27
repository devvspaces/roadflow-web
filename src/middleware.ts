import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { PAYLOAD_KEY } from './common/constants'
import { LOGIN_URL } from './router/routes';
import { JwtPayload } from './common/interfaces/token';
import { api } from './services/api';
import { processJWTPayload } from './services/authenticate';
import { FetchHandler } from './services/http_handlers/fetchHandler';

/**
 * Middleware to check if the user is logged in.
 * if not, redirect to login page.
 * if the access token is expired, refresh it.
 * if the refresh token is expired, redirect to login page.
 */
export async function middleware(request: NextRequest) {
  const jwt_payload = request.cookies.get(PAYLOAD_KEY)?.value;

  function clearAndRedirect() {
    const login_url = new URL(LOGIN_URL, request.url)
    const r_response = NextResponse.redirect(login_url);
    request.cookies.getAll().forEach((cookie) => {
      r_response.cookies.delete(cookie.name)
    })
    return r_response
  }

  if (!jwt_payload || jwt_payload == undefined) {
    console.error("No payload found")
    return clearAndRedirect()
  }

  let jwt_payload_decoded: JwtPayload;

  try {
    jwt_payload_decoded = JSON.parse(jwt_payload);
  } catch (e) {
    return clearAndRedirect()
  }

  if (jwt_payload_decoded.access_expires_at < Date.now()) {

    if (jwt_payload_decoded.refresh_expires_at < Date.now()) {
      return clearAndRedirect()
    }

    api.setHttpHandler(new FetchHandler())
    const response = await api.refreshJwt(jwt_payload_decoded.refresh)
    if (!response.success || !response.result.data) {
      return clearAndRedirect()
    }

    const result = response.result.data
    console.log(result)

    // Update the payload
    console.log("Updating payload")
    const r_response = NextResponse.redirect(request.url);
    r_response.cookies.set(PAYLOAD_KEY, JSON.stringify(
      processJWTPayload({
        access: result.access,
        refresh: jwt_payload_decoded.refresh,
        access_expires_at: result.access_expires_at,
        refresh_expires_at: jwt_payload_decoded.refresh_expires_at
      })
    ))
    return r_response
  }
}

export const config = {
  matcher: '/app/:path*',
}
