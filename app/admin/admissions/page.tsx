"use client";

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Trash2 } from "lucide-react";
import { DeleteAlert } from "@/components/DeleteAlert";
import toast from 'react-hot-toast';
import type { Payment } from '@/types/payment';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'successful':
      return 'bg-green-500 text-white hover:bg-green-600';
    case 'failed':
      return 'bg-red-500 text-white hover:bg-red-600';
    case 'pending':
      return 'bg-yellow-500 text-white hover:bg-yellow-600';
    default:
      return 'bg-gray-500 text-white hover:bg-gray-600';
  }
};

export default function AdminAdmissionsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/admin/payments");
      if (!res.ok) throw new Error("Failed to fetch payments");
      const data = await res.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;

    setDeleteLoading(deleteId);
    const deletePromise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`/api/admin/payments/${deleteId}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Failed to delete payment");
        }

        await fetchPayments();
        resolve("Payment deleted successfully");
      } catch (error) {
        console.error("Error deleting payment:", error);
        reject(error);
      } finally {
        setDeleteLoading(null);
        setDeleteId(null);
      }
    });

    toast.promise(deletePromise, {
      loading: 'Deleting payment...',
      success: 'Payment deleted successfully',
      error: 'Failed to delete payment'
    });
  };

  const handleDeleteCancel = () => {
    setDeleteId(null);
  };

  const filteredPayments = payments.filter(payment => 
    payment.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.phone.includes(searchTerm) ||
    payment.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Admissions</CardTitle>
            <div className="flex items-center gap-4 w-full max-w-sm">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Form Sent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{formatDate(payment.createdAt)}</TableCell>
                  <TableCell>{payment.fullName}</TableCell>
                  <TableCell>{payment.email}</TableCell>
                  <TableCell>{payment.phone}</TableCell>
                  <TableCell>GHS {payment.amount / 100}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.status)}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">{payment.reference}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={payment.formSent ? "success" : "secondary"}>
                      {payment.formSent ? "Sent" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(payment._id)}
                      disabled={deleteLoading === payment._id}
                    >
                      {deleteLoading === payment._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DeleteAlert
        isOpen={!!deleteId}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Payment"
        description="Are you sure you want to delete this payment record? This action cannot be undone."
      />
    </div>
  );
} 