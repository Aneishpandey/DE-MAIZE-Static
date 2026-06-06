import { AdminLayoutClient } from '@/components/admin/admin-layout-client'

export const metadata = {
  title: 'Admin | DE-MAIZE',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
}
