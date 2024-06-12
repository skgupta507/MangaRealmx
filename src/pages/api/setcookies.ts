import type { APIRoute } from 'astro';

interface _Setcookie {
  key: string,
  value: string,
  maxAge: number,
  secure?: boolean,
  httpOnly?: boolean,
}

// to deletcookies, just set the max-age to 0
export const POST: APIRoute = async ({ request }) => {
  const url = new URL(request.url)
  const rawData = url.searchParams.get("data")

  if (!rawData) {
    const response = new Response(
      JSON.stringify({
        message: 'no data',
      })
    );
    return response;
  }

  const data: _Setcookie[] = JSON.parse(rawData) 
  const THIRTY_DAYS_SECONDS = 30 * 24 * 60 * 60;


  const response = new Response(
    JSON.stringify({
      message: 'cookie set successfully',
    })
  );

  for (let i=0; i < data.length; i++) {
    const { key, value, maxAge, secure, httpOnly } = data[i];
    const cookieOptions = {
      'max-age': maxAge || THIRTY_DAYS_SECONDS, 
      secure: secure || true, 
      httpOnly: httpOnly || true, 
    };
    response.headers.append('Set-Cookie', `${key}=${value}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`);
  }

  return response;
};