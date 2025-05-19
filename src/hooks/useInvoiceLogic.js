import { useState, useCallback } from "react";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { 
  getInitialInvoiceData, 
  handlePdfDownloadLogic, 
  handleLogoChangeLogic, 
  handleDetailChangeLogic, 
  handleItemsLogic,
  calculateTotalsLogic,
  formatCurrencyLogic,
  resetFormLogic
} from "./invoiceLogicUtils";

export const useInvoiceLogic = (type, printRef, toast) => {
  const [logo, setLogo] = useState(null);
  const [invoiceData, setInvoiceData] = useState(getInitialInvoiceData(type));

  const handleActualPrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${invoiceData.type === "invoice" ? "Invoice" : "Quotation"}_${invoiceData.number}`,
    onAfterPrint: () => {
      toast({
        title: "Print successful",
        description: `Your ${invoiceData.type} has been sent to the printer.`,
        className: "bg-secondary text-primary border-secondary",
      });
    },
    pageStyle: `
      @media print {
        @page {
          size: A4;
          margin: 20mm;
        }
        .invoice-print-container {
          width: 100%;
          margin: 0;
          padding: 0;
          box-shadow: none;
          border: none;
        }
        .thermal-print-container {
          display: none;
        }
      }
    `
  });

  const handlePrint = () => {
    if (printRef.current) {
      const previewElement = printRef.current;
      if (previewElement.classList.contains('thermal-print-container')) {
        previewElement.classList.remove('thermal-print-container');
        previewElement.classList.add('invoice-print-container');
      }
    }
    handleActualPrint();
  };
  
  const handleDownloadPDF = useCallback(async (pdfPrintRef) => {
    await handlePdfDownloadLogic(pdfPrintRef, invoiceData, toast);
  }, [invoiceData, toast]);

  const handleLogoChange = useCallback((e) => {
    handleLogoChangeLogic(e, setLogo, toast);
  }, [toast]);

  const handleCompanyChange = useCallback((field, value) => {
    handleDetailChangeLogic(setInvoiceData, 'company', field, value);
  }, []);

  const handleClientChange = useCallback((field, value) => {
    handleDetailChangeLogic(setInvoiceData, 'client', field, value);
  }, []);

  const { handleItemChange, addItem, removeItem } = handleItemsLogic(setInvoiceData, toast);
  
  const calculateSubtotal = useCallback(() => {
    return calculateTotalsLogic.subtotal(invoiceData.items);
  }, [invoiceData.items]);

  const calculateTax = useCallback(() => {
    return calculateTotalsLogic.tax(invoiceData.items);
  }, [invoiceData.items]);

  const calculateTotal = useCallback(() => {
    return calculateTotalsLogic.total(invoiceData.items);
  }, [invoiceData.items]);

  const formatCurrency = useCallback((amount, currencyCode) => {
    return formatCurrencyLogic(amount, currencyCode || invoiceData.currency);
  }, [invoiceData.currency]);

  const resetForm = useCallback((currentType) => {
    resetFormLogic(currentType, setInvoiceData, setLogo, toast);
  }, [toast]);
  
  return {
    logo,
    setLogo,
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
  };
};