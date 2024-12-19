import "./globals.css";

export const metadata = {
  title: 'Xamkflix',
  description: 'Elokuvatietokanta',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi" className="dark">
      <body>
        {children}
      </body>
    </html>
  );
}


