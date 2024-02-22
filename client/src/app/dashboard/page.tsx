import DashBoard from '@/components/dashboard/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ShutterSync - Dashboard',
  description: 'Dashboard page',
  keywords: 'dashboard, albums, photos',
  robots: 'noindex, nofollow',
};

// export { metadata };

export default async function Page({}) {
  return (
    <div>
      <DashBoard />
    </div>
  );
}

