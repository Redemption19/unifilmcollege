import Sidebar from "@/components/admin/Sidebar";
import { AdminHeader } from "./components/AdminHeader";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar />
      </div>
      <div className="md:pl-72">
        <AdminHeader />
        <main>{children}</main>
      </div>
      <Toaster position="top-center" />
    </div>
  );
} 