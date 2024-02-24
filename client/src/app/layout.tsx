import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import { ThemeProvider } from '@/components/theme-provider';
import { Session } from '@/components/user-provider';
import { UserProvider } from '@/contexts/user-context';
import QueryProvider from '@/components/QueryProvider';
import { getServerSession } from 'next-auth';
import ThemeToggle from '@/components/theme-toggle';
import { authOptions } from './api/auth/[...nextauth]/options';
const sans = Source_Sans_3({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShutterSync - Home',
  description: 'ShutterSync',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  props: { session: any };
}>) {
  const session = getServerSession(authOptions);
  return (
    <html lang="en">
      {/* <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description as string} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
      </head> */}
      <body className={sans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Session session={session}>
            <UserProvider>
              <QueryProvider>
                <Header />
                <div className="relative">
                  {children}
                  <ThemeToggle />
                </div>
              </QueryProvider>
            </UserProvider>
          </Session>
        </ThemeProvider>
      </body>
    </html>
  );
}
