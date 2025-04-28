import "./globals.css";

export const metadata = {
  title: "Task Tracker",
  description: "A system for caseworkers to efficiently manage tasks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
