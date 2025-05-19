import React, { useRef } from "react";
import { motion } from "framer-motion";
import { 
  Download, 
  Printer, 
  Save, 
  FileText, 
  RefreshCw
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

import InvoiceFormFields from "@/components/invoice/InvoiceFormFields";
import InvoiceCompanyClientFields from "@/components/invoice/InvoiceCompanyClientFields";
import InvoiceItemsTable from "@/components/invoice/InvoiceItemsTable";
import InvoiceTotals from "@/components/invoice/InvoiceTotals";
import InvoiceNotesTerms from "@/components/invoice/InvoiceNotesTerms";
import InvoicePreview from "@/components/invoice/InvoicePreview";

import { useInvoiceLogic } from "@/hooks/useInvoiceLogic";

const InvoiceForm = ({ type = "invoice" }) => {
  const { toast } = useToast();
  const invoiceRef = useRef();
  
  const {
    logo,
    invoiceData,
    setInvoiceData,
    handlePrint,
    handleDownloadPDF,
    handleLogoChange,
    handleCompanyChange,
    handleClientChange,
    handleItemChange,
    addItem,
    removeItem,
    calculateSubtotal,
    calculateTax,
    calculateTotal,
    formatCurrency,
    resetForm,
  } = useInvoiceLogic(type, invoiceRef, toast);

  const saveInvoice = () => {
    const savedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");
    const existingIndex = savedInvoices.findIndex(inv => inv.number === invoiceData.number);
    
    if (existingIndex >= 0) {
      savedInvoices[existingIndex] = { ...invoiceData, logo };
    } else {
      savedInvoices.push({ ...invoiceData, logo });
    }
    
    localStorage.setItem("invoices", JSON.stringify(savedInvoices));
    
    toast({
      title: "Saved successfully",
      description: `Your ${invoiceData.type} has been saved.`,
      className: "bg-secondary text-primary border-secondary",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-extrabold text-center mb-2">
          <span className="text-neon-yellow">{invoiceData.type === "invoice" ? "INVOICE" : "QUOTATION"}</span> GENERATOR
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Craft stunning {invoiceData.type === "invoice" ? "invoices" : "quotations"} with our sleek, customizable generator. Download or print in style.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="glassmorphism border-secondary/30">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-2xl text-neon-yellow">
                {invoiceData.type === "invoice" ? "Invoice" : "Quotation"} Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <InvoiceFormFields 
                invoiceData={invoiceData} 
                setInvoiceData={setInvoiceData} 
                logo={logo}
                handleLogoChange={handleLogoChange}
              />
              <InvoiceCompanyClientFields 
                invoiceData={invoiceData} 
                handleCompanyChange={handleCompanyChange} 
                handleClientChange={handleClientChange} 
              />
              <InvoiceItemsTable 
                items={invoiceData.items}
                taxRate={invoiceData.taxRate}
                currency={invoiceData.currency}
                handleItemChange={handleItemChange}
                addItem={addItem}
                removeItem={removeItem}
                formatCurrency={formatCurrency}
              />
              <InvoiceTotals 
                subtotal={calculateSubtotal()}
                tax={calculateTax()}
                total={calculateTotal()}
                formatCurrency={formatCurrency}
                currency={invoiceData.currency}
              />
              <InvoiceNotesTerms 
                invoiceData={invoiceData} 
                setInvoiceData={setInvoiceData} 
              />
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3 justify-between border-t border-border pt-6">
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={saveInvoice} 
                  className="button-animated bg-secondary text-primary hover:bg-yellow-400 shadow-md shadow-secondary/30"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button 
                  onClick={() => resetForm(type)} 
                  variant="outline" 
                  className="button-animated border-secondary text-secondary hover:bg-secondary hover:text-primary"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={() => handlePrint(invoiceRef)} 
                  variant="outline" 
                  className="button-animated border-muted-foreground text-muted-foreground hover:border-secondary hover:text-secondary"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print A4
                </Button>
                <Button 
                  onClick={() => handleDownloadPDF(invoiceRef)} 
                  className="button-animated bg-primary text-secondary border border-secondary hover:bg-secondary hover:text-primary"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-8">
            <Card className="neumorphism overflow-hidden border border-secondary/20">
              <CardHeader className="bg-primary text-secondary border-b border-secondary/50">
                <CardTitle className="flex items-center text-neon-yellow">
                  <FileText className="h-5 w-5 mr-2" />
                  A4 Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[800px] overflow-y-auto p-1 bg-background">
                  <InvoicePreview 
                    ref={invoiceRef}
                    invoiceData={invoiceData}
                    logo={logo}
                    formatCurrency={formatCurrency}
                    calculateSubtotal={calculateSubtotal}
                    calculateTax={calculateTax}
                    calculateTotal={calculateTotal}
                    previewType="A4"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InvoiceForm;