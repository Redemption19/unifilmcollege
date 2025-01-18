"use client";
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Payment {
  _id: string;
  reference: string;
  email: string;
  fullName: string;
  phone: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface PaymentsTableProps {
  payments: Payment[];
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter payments based on search and status
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.email.toLowerCase().includes(search.toLowerCase()) ||
      payment.fullName.toLowerCase().includes(search.toLowerCase()) ||
      payment.reference.toLowerCase().includes(search.toLowerCase()) ||
      payment.phone.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' || payment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by email, name or reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="successful">Successful</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPayments.map((payment) => (
            <TableRow key={payment._id}>
              <TableCell className="font-mono">{payment.reference}</TableCell>
              <TableCell>{payment.fullName}</TableCell>
              <TableCell>{payment.email}</TableCell>
              <TableCell>{payment.phone}</TableCell>
              <TableCell>GHS {payment.amount / 100}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    payment.status === 'successful' ? 'success' :
                    payment.status === 'pending' ? 'warning' : 'destructive'
                  }
                >
                  {payment.status}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(payment.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 