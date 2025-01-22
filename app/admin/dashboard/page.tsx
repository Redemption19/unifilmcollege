"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PaymentsTable } from "@/app/admin/components/PaymentsTable";
import { StudentTable } from "@/app/admin/components/StudentTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Users, Wallet, GraduationCap, Calendar } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if JWT token exists in the cookies
    const token = document.cookie.split("; ").find(row => row.startsWith("auth-token="))?.split("=")[1];

    if (!token) {
      toast.error("You need to log in to access the dashboard.");
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // If user is not authenticated, return a loading screen or prevent rendering
  if (!isAuthenticated) return <div>Loading...</div>;

  return (
    <div className="container py-6 space-y-6">
      <div>
        <DashboardStats />
        <Card>
          <CardHeader>
            <CardTitle>Recent Students</CardTitle>
          </CardHeader>
          <CardContent>
            <StudentTable students={[]} className="h-[400px]" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentsTable payments={[]} className="h-[400px]" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button>Add New Student</Button>
        <Button variant="outline">View All Payments</Button>
        <Button variant="outline">Manage Applications</Button>
      </div>
    </div>
  );
}