import './global.css';

export const metadata = {
  title: 'SBSC AI',
  description: 'Generated by create-nx-workspace',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
