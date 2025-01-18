"use client";

import { PaymentsTable } from "@/app/admin/components/PaymentsTable";

export default function PaymentsPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Payments</h1>
      <PaymentsTable payments={[]} />
    </div>
  );
}