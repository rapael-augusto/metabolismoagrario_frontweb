import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
	{ path: "/", whenAuthenticated: "redirect" },
	{ path: "/calculator", whenAuthenticated: "next" },
	{ path: "/constant/:id", whenAuthenticated: "next" },
	{ path: "/crops", whenAuthenticated: "next" },
	{ path: "/cultivars/:id", whenAuthenticated: "next" },
	{ path: "/forgotPassword", whenAuthenticated: "redirect" },
	{ path: "/forgotPassword/:id", whenAuthenticated: "redirect" },
] as const;

const WHEN_NOT_AUTHENTICATED_ROUTE = "/";

export function middleware(request: NextRequest) {
	const pathName = request.nextUrl.pathname;
	const publicRoute = publicRoutes.find((item) => {
		if (item.path.includes(":id")) {
			const basePath = item.path.split(":id")[0];
			return pathName.startsWith(basePath) && pathName.length > basePath.length;
		}
		return item.path === pathName;
	});
	const token = request.cookies.get("@token");
	console.log("token", token);
	console.log("url", pathName);

	if (publicRoute && !token) {
		return NextResponse.next();
	}

	if (!publicRoute && !token) {
		return NextResponse.redirect(
			new URL(WHEN_NOT_AUTHENTICATED_ROUTE, request.url)
		);
	}

	if (publicRoute && token && publicRoute.whenAuthenticated === "redirect") {
		const newUrl = request.nextUrl.clone();
		newUrl.pathname = "/home";
		return NextResponse.redirect(newUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 * - .svg (arquivos SVG)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*.svg).*)",
	],
};
