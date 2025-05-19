import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Printer as PrinterIcon, Plus, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import InvoicePreview from "@/components/invoice/InvoicePreview"; 
import { useInvoiceLogic } from "@/hooks/useInvoiceLogic";
import { useReactToPrint } from "react-to-print";

const ThermalBillPage = () => {
  const { toast } = useToast();
  const thermalPrintRef = useRef();

  const {
    invoiceData,
    setInvoiceData,
    handleItemChange,
    addItem,
    removeItem,
    calculateSubtotal,
    calculateTax,
    calculateTotal,
    formatCurrency,
    resetForm,
  } = useInvoiceLogic("bill", thermalPrintRef, toast);

  const handleThermalPrint = useReactToPrint({
    content: () => thermalPrintRef.current,
    documentTitle: `Thermal_Bill_${invoiceData.number}`,
    pageStyle: `
      @media print {
        @page thermal {
          size: 72mm auto;
          margin: 0;
        }
        .thermal-print-container {
          page: thermal;
          width: 72mm !important;
          margin: 0;
          padding: 0;
          box-shadow: none;
          border: none;
        }
        .invoice-print-container {
          display: none;
        }
      }
    `,
    onAfterPrint: () => {
      toast({
        title: "Print successful",
        description: "Your thermal bill has been sent to the printer.",
      });
    },
  });

  const localResetForm = () => {
     if (window.confirm("Are you sure you want to reset the bill? All unsaved changes will be lost.")) {
      resetForm("bill"); 
      setInvoiceData(prev => ({
        ...prev,
        company: { name: "IDS", address: "Valencia Town", phone: "+923704441788" },
        client: { name: "Customer" },
        notes: "Thank you for your purchase!",
        terms: "",
        currency: "PKR",
        taxRate: 0, 
        number: `BILL-${Date.now().toString().slice(-6)}`
      }));
      toast({
        title: "Bill reset",
        description: "The bill form has been reset.",
      });
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent mb-2">
          Thermal Bill Generator
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Quickly create and print bills for thermal printers.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle>Bill Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="billNumber">Bill Number</Label>
                <Input
                  id="billNumber"
                  value={invoiceData.number}
                  onChange={(e) => setInvoiceData({ ...invoiceData, number: e.target.value })}
                  className="input-animated"
                />
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Items</h3>
                  <Button 
                    onClick={() => addItem(invoiceData.taxRate)} 
                    variant="outline" 
                    size="sm"
                    className="button-animated"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Description</TableHead>
                        <TableHead className="w-[100px]">Qty</TableHead>
                        <TableHead className="w-[150px]">Price</TableHead>
                        <TableHead className="w-[100px]">Tax (%)</TableHead>
                        <TableHead className="w-[150px]">Total</TableHead>
                        <TableHead className="w-[80px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoiceData.items.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Input
                              value={item.description}
                              onChange={(e) => handleItemChange(index, "description", e.target.value)}
                              placeholder="Item description"
                              className="input-animated"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                              className="input-animated"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.price}
                              onChange={(e) => handleItemChange(index, "price", e.target.value)}
                              className="input-animated"
                            />
                          </TableCell>
                           <TableCell>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={item.tax}
                              onChange={(e) => handleItemChange(index, "tax", e.target.value)}
                              className="input-animated"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatCurrency(item.quantity * item.price * (1 + item.tax / 100), invoiceData.currency)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(index)}
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-end mt-4">
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Subtotal:</span>
                      <span className="font-medium">{formatCurrency(calculateSubtotal(), invoiceData.currency)}</span>
                    </div>
                     <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tax:</span>
                      <span className="font-medium">{formatCurrency(calculateTax(), invoiceData.currency)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-lg">{formatCurrency(calculateTotal(), invoiceData.currency)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3 justify-between">
               <Button 
                  onClick={localResetForm} 
                  variant="outline" 
                  className="button-animated"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset Bill
                </Button>
              <Button 
                onClick={handleThermalPrint} 
                className="button-animated bg-green-600 hover:bg-green-700"
              >
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print Thermal Bill
              </Button>
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
            <Card className="neumorphism overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
                <CardTitle>Thermal Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-2 bg-gray-200 flex justify-center">
                <div className="w-[72mm] bg-white shadow-md">
                  <InvoicePreview
                    ref={thermalPrintRef}
                    invoiceData={invoiceData}
                    logo={null} 
                    formatCurrency={formatCurrency}
                    calculateSubtotal={calculateSubtotal}
                    calculateTax={calculateTax}
                    calculateTotal={calculateTotal}
                    previewType="thermal"
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

export default ThermalBillPage;
