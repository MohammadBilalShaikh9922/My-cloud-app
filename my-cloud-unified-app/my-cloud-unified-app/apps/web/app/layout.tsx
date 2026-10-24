import type { Metadata } from 'next';
import './styles.css';
export const metadata: Metadata = { title: 'My Cloud', description: 'A virtual unified layer for your connected cloud accounts.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
