import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  console.log(token);
  // if (
  //   token &&
  //   (req.nextUrl.pathname === '/signin' ||
  //     req.nextUrl.pathname === '/signup' ||
  //     req.nextUrl.pathname === '/')
  // ) {
  //   return NextResponse.redirect(new URL('/dashboard', req.url));
  // }
  // if (
  //   !token &&
  //   req.nextUrl.pathname !== '/signin' &&
  //   req.nextUrl.pathname !== '/signup' &&
  //   req.nextUrl.pathname !== '/'
  // ) {
  //   return NextResponse.redirect(new URL('/signin', req.url));
  // }

  return NextResponse.next();
}

// export default withAuth({
//   callbacks: {
//     authorized: async ({ req, token }) => {
//       const pathname = req.nextUrl.pathname;
//       // console.log(pathname);

//       // if
//       // if (pathname.endsWith('/')){
//       //   return true;
//       // };

//       // return true;
//       return token ? true : false;
//     },
//     // redirect: async ({ req, res, token }) => {
//     //   if (!token) {
//     //     res.writeHead(302, { Location: '/login' });
//     //     res.end();
//     //     return;
//     //   }
//     // }
//   },
//   secret: process.env.JWT_SECRET,
// });

// export const config = {
//   matcher: ['/dashboard'],
// };

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.webp$).*)'],
};
