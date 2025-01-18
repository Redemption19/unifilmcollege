import { Suspense } from "react";
import { PaymentsTable } from "@/app/admin/components/payments-table-full";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

async function getPayments() {
  console.log(
    "Environment variable NEXT_PUBLIC_API_URL:",
    process.env.NEXT_PUBLIC_API_URL
  );
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  console.log("Constructed BASE_URL:", BASE_URL);

  try {
    const res = await fetch(`${BASE_URL}/api/admissions/payment`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error("Failed to fetch payments:", res.statusText);
      throw new Error("Failed to fetch payments");
    }

    return res.json();
  } catch (error: any) {
    console.error("Error fetching payments:", error.message);
    return []; // Return an empty array to avoid breaking the UI
  }
}

function PaymentStats({ payments }: { payments: any[] }) {
  if (payments.length === 0) {
    return <div>No payment data available at this time.</div>;
  }

  const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0) / 100;
  const successfulPayments = payments.filter(
    (p) => p.status === "successful"
  ).length;
  const successRate = payments.length
    ? (successfulPayments / payments.length) * 100
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">GHS {totalRevenue.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Forms Sold</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{payments.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{successRate.toFixed(1)}%</div>
        </CardContent>
      </Card>
    </div>
  );
}

function PaymentsLoading() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[100px]" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-[300px]" />
        </CardContent>
      </Card>
    </div>
  );
}

export default async function PaymentsPage() {
  const payments = await getPayments();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">
          View and manage all admission form payments
        </p>
      </div>

      {payments.length === 0 ? (
        <div>
          <h2 className="text-xl">No payments found</h2>
          <p>Please check back later.</p>
        </div>
      ) : (
        <Suspense fallback={<PaymentsLoading />}>
          <PaymentStats payments={payments} />
          <PaymentsTable payments={payments} />
        </Suspense>
      )}
    </div>
  );
}