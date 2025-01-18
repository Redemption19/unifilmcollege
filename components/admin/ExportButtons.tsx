import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FileText, Loader2 } from "lucide-react";
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useState } from "react";

// Add type augmentation for jsPDF
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface Payment {
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  amount: number;
  status: string;
  reference: string;
  formSent: boolean;
}

interface ExportButtonsProps {
  data: Payment[];
  filename: string;
}

export function ExportButtons({ data, filename }: ExportButtonsProps) {
  const [exporting, setExporting] = useState<'excel' | 'pdf' | null>(null);

  const exportToExcel = async () => {
    try {
      setExporting('excel');
      const ws = XLSX.utils.json_to_sheet(data.map(item => ({
        Date: new Date(item.createdAt).toLocaleDateString(),
        Name: item.fullName,
        Email: item.email,
        Phone: item.phone,
        Amount: `GHS ${item.amount / 100}`,
        Status: item.status,
        Reference: item.reference,
        'Form Sent': item.formSent ? 'Yes' : 'No'
      })));

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Payments');
      XLSX.writeFile(wb, `${filename}.xlsx`);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    } finally {
      setExporting(null);
    }
  };

  const exportToPDF = async () => {
    try {
      setExporting('pdf');
      const doc = new jsPDF();

      const tableColumn = ["Date", "Name", "Email", "Phone", "Amount", "Status", "Reference"];
      const tableRows = data.map(item => [
        new Date(item.createdAt).toLocaleDateString(),
        item.fullName,
        item.email,
        item.phone,
        `GHS ${item.amount / 100}`,
        item.status,
        item.reference
      ]);

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] },
      });

      doc.save(`${filename}.pdf`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    } finally {
      setExporting(null);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={exportToExcel}
        disabled={exporting !== null}
      >
        {exporting === 'excel' ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <FileSpreadsheet className="h-4 w-4 mr-2" />
        )}
        Export Excel
      </Button>
      <Button
        variant="outline"
        onClick={exportToPDF}
        disabled={exporting !== null}
      >
        {exporting === 'pdf' ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <FileText className="h-4 w-4 mr-2" />
        )}
        Export PDF
      </Button>
    </div>
  );
}