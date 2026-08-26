export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-gray-800 text-white font-bold">
        Panel del Dashboard
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}