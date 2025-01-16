import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AdminHeader } from "@/app/admin/components/AdminHeader";
import { PaymentsTable } from "@/app/admin/components/PaymentsTable";
import { authOptions } from "@/lib/auth";

async function getPayments() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/payments`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch payments");
    return res.json();
  } catch (error) {
    console.error("Error fetching payments:", error);
    return [];
  }
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const payments = await getPayments();

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main className="p-4 sm:p-6 space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
            <p className="text-muted-foreground">
              Manage and monitor all form purchases
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">
                  GHS {payments.reduce((acc: number, p: any) => acc + p.amount, 0).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Forms Sold
                </p>
                <p className="text-2xl font-bold">{payments.length}</p>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Success Rate
                </p>
                <p className="text-2xl font-bold">
                  {((payments.filter((p: any) => p.status === "successful").length / payments.length) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
        <PaymentsTable payments={payments} />
      </main>
    </div>
  );
} 