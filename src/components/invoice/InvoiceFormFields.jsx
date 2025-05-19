import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image as ImageIcon } from "lucide-react";

const InvoiceFormFields = ({ invoiceData, setInvoiceData, logo, handleLogoChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="invoiceType" className="text-neon-yellow">Document Type</Label>
          <Select
            value={invoiceData.type}
            onValueChange={(value) => setInvoiceData({ ...invoiceData, type: value, number: value === "invoice" ? `INV-${Date.now().toString().slice(-4)}` : `QUO-${Date.now().toString().slice(-4)}` })}
          >
            <SelectTrigger id="invoiceType" className="input-animated focus:ring-secondary focus:border-secondary">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-card border-secondary text-foreground">
              <SelectItem value="invoice" className="hover:bg-secondary/20">Invoice</SelectItem>
              <SelectItem value="quotation" className="hover:bg-secondary/20">Quotation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="invoiceNumber">Number</Label>
          <Input
            id="invoiceNumber"
            value={invoiceData.number}
            onChange={(e) => setInvoiceData({ ...invoiceData, number: e.target.value })}
            className="input-animated"
          />
        </div>
        <div>
          <Label htmlFor="invoiceDate">Date</Label>
          <Input
            id="invoiceDate"
            type="date"
            value={invoiceData.date}
            onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
            className="input-animated"
            style={{ colorScheme: 'dark' }}
          />
        </div>
        <div>
          <Label htmlFor="invoiceDueDate">Due Date</Label>
          <Input
            id="invoiceDueDate"
            type="date"
            value={invoiceData.dueDate}
            onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
            className="input-animated"
            style={{ colorScheme: 'dark' }}
          />
        </div>
        <div>
          <Label htmlFor="currency" className="text-neon-yellow">Currency</Label>
          <Select
            value={invoiceData.currency}
            onValueChange={(value) => setInvoiceData({ ...invoiceData, currency: value })}
          >
            <SelectTrigger id="currency" className="input-animated focus:ring-secondary focus:border-secondary">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent className="bg-card border-secondary text-foreground">
              <SelectItem value="USD" className="hover:bg-secondary/20">USD - US Dollar</SelectItem>
              <SelectItem value="EUR" className="hover:bg-secondary/20">EUR - Euro</SelectItem>
              <SelectItem value="GBP" className="hover:bg-secondary/20">GBP - British Pound</SelectItem>
              <SelectItem value="INR" className="hover:bg-secondary/20">INR - Indian Rupee</SelectItem>
              <SelectItem value="JPY" className="hover:bg-secondary/20">JPY - Japanese Yen</SelectItem>
              <SelectItem value="CAD" className="hover:bg-secondary/20">CAD - Canadian Dollar</SelectItem>
              <SelectItem value="AUD" className="hover:bg-secondary/20">AUD - Australian Dollar</SelectItem>
              <SelectItem value="PKR" className="hover:bg-secondary/20">PKR - Pakistani Rupee</SelectItem>
              <SelectItem value="SAR" className="hover:bg-secondary/20">SAR - Saudi Riyal</SelectItem>
              <SelectItem value="AED" className="hover:bg-secondary/20">AED - UAE Dirham</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="logo" className="text-neon-yellow">Company Logo</Label>
          <div className="flex items-center gap-4 mt-2">
            <div className="h-20 w-20 border border-border rounded-md flex items-center justify-center overflow-hidden bg-input">
              {logo ? (
                <img src={logo} alt="Company logo" className="h-full w-full object-contain" />
              ) : (
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
              <Label
                htmlFor="logo"
                className="inline-flex items-center px-4 py-2 bg-secondary text-primary rounded-md cursor-pointer hover:bg-yellow-400 transition-colors button-animated"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Upload Logo
              </Label>
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
          <Input
            id="taxRate"
            type="number"
            value={invoiceData.taxRate}
            onChange={(e) => setInvoiceData({ ...invoiceData, taxRate: parseFloat(e.target.value) || 0 })}
            className="input-animated"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceFormFields;