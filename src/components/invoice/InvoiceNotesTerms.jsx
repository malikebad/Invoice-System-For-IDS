import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const InvoiceNotesTerms = ({ invoiceData, setInvoiceData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={invoiceData.notes}
          onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
          placeholder="Additional notes for the client..."
          className="h-24 input-animated"
        />
      </div>
      <div>
        <Label htmlFor="terms">Terms & Conditions</Label>
        <Textarea
          id="terms"
          value={invoiceData.terms}
          onChange={(e) => setInvoiceData({ ...invoiceData, terms: e.target.value })}
          placeholder="Terms and conditions..."
          className="h-24 input-animated"
        />
      </div>
    </div>
  );
};

export default InvoiceNotesTerms;