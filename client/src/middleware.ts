
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      const pathname = req.nextUrl.pathname;
      // console.log(pathname);

      // if 
      // if (pathname.endsWith('/')){
      //   return true;
      // };
  
      // return true;
      return token ? true : false;
    },
    // redirect: async ({ req, res, token }) => {
    //   if (!token) {
    //     res.writeHead(302, { Location: '/login' });
    //     res.end();
    //     return;
    //   }
    // }
  },
  secret: process.env.JWT_SECRET,
});

export const config = {
  matcher: ['/dashboard'],
};