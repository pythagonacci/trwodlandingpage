import type { ReactNode } from "react";

export default function AdminLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">{children}</div>
    </div>
  );
}
