// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { JWTExtended } from "./types/Auth";
// import { getToken } from "next-auth/jwt";
// import environment from "./config/environment";

// export async function middleware(request: NextRequest) {
//   const token: JWTExtended | null = await getToken({
//     req: request,
//     secret: environment.AUTH_SECRET,
//   });

//   const { pathname } = request.nextUrl;

//   const adminRoles = ["SUPERADMIN", "ADMIN"];
//   const daerahRoles = ["DAERAH", "SUBDAERAH"];
//   const desaRoles = ["DESA", "SUBDESA"];
//   const kelompokRoles = ["KELOMPOK", "SUBKELOMPOK"];

//   if (
//     pathname === "/" ||
//     pathname === "/auth/login" ||
//     pathname === "/auth/register"
//   ) {
//     if (token) {
//       const role = token?.user?.role ?? "";
//       if (adminRoles.includes(role)) {
//         return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//       } else if (daerahRoles.includes(role)) {
//         return NextResponse.redirect(new URL("/daerah/dashboard", request.url));
//       } else if (desaRoles.includes(role)) {
//         return NextResponse.redirect(new URL("/village/dashboard", request.url));
//       } else if (kelompokRoles.includes(role)) {
//         return NextResponse.redirect(
//           new URL("/group/dashboard", request.url)
//         );
//       }
//     }
//   }

//   // 🔒 Proteksi halaman ADMIN
//   if (pathname.startsWith("/admin")) {
//     if (!token) {
//       const url = new URL("/auth/login", request.url);
//       url.searchParams.set("callbackUrl", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }
//     if (!adminRoles.includes(token?.user?.role ?? "")) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//     if (pathname === "/admin") {
//       return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//     }
//   }

//   // 🔒 Proteksi halaman DAERAH
//   if (pathname.startsWith("/daerah")) {
//     if (!token) {
//       const url = new URL("/auth/login", request.url);
//       url.searchParams.set("callbackUrl", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }
//     if (!daerahRoles.includes(token?.user?.role ?? "")) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//     if (pathname === "/daerah") {
//       return NextResponse.redirect(new URL("/daerah/dashboard", request.url));
//     }
//   }

//   // 🔒 Proteksi halaman DESA
//   if (pathname.startsWith("/village")) {
//     if (!token) {
//       const url = new URL("/auth/login", request.url);
//       url.searchParams.set("callbackUrl", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }
//     if (!desaRoles.includes(token?.user?.role ?? "")) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//     if (pathname === "/village") {
//       return NextResponse.redirect(new URL("/village/dashboard", request.url));
//     }
//   }

//   // 🔒 Proteksi halaman KELOMPOK
//   if (pathname.startsWith("/group")) {
//     if (!token) {
//       const url = new URL("/auth/login", request.url);
//       url.searchParams.set("callbackUrl", encodeURI(request.url));
//       return NextResponse.redirect(url);
//     }
//     if (!kelompokRoles.includes(token?.user?.role ?? "")) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//     if (pathname === "/group") {
//       return NextResponse.redirect(new URL("/group/dashboard", request.url));
//     }
//   }
// }

// export const config = {
//   matcher: [
//     "/",
//     "/auth/:path*",
//     "/admin/:path*",
//     "/daerah/:path*",
//     "/village/:path*",
//     "/kelompok/:path*",
//   ],
// };
