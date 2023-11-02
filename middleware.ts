import { getIronSession } from "iron-session/edge";
import { NextRequest, NextResponse, userAgent } from "next/server";
import { LOGIN_PAGE, PROFILE_PAGE } from "./constants/urls";

export const middleware = async (request: NextRequest) => {
  if (userAgent(request).isBot) {
    // 새로운 error 화면을 만들고 그쪽으로 rewrite 시켜줄것
  }

  const res = NextResponse.next();
  const session = await getIronSession(request, res, {
    cookieName: process.env.COOKIE_NAME!,
    password: process.env.IRON_PW!,
    cookieOptions: {
      secure: process.env.NODE_ENV! === "production", // if you are using https
    },
  });

  if (!session.user && request.nextUrl.pathname.startsWith(PROFILE_PAGE)) {
    request.nextUrl.searchParams.set("from", request.nextUrl.pathname);
    request.nextUrl.pathname = LOGIN_PAGE;
    return NextResponse.redirect(request.nextUrl);
  }
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
