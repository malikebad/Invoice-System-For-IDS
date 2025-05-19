import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const initialCompanyData = {
  name: "Your Company Name",
  address: "123 Business Street",
  city: "Business City",
  state: "State",
  zip: "12345",
  phone: "(123) 456-7890",
  email: "contact@yourcompany.com",
  website: "www.yourcompany.com",
};

const initialClientData = {
  name: "Client Name",
  address: "456 Client Street",
  city: "Client City",
  state: "State",
  zip: "67890",
  phone: "(098) 765-4321",
  email: "client@example.com",
};

const initialItemsData = [
  {
    id: 1,
    description: "Product or Service",
    quantity: 1,
    price: 100,
    tax: 10,
  },
];

export const getInitialInvoiceData = (type) => ({
  type: type,
  number: type === "invoice" ? `INV-${Date.now().toString().slice(-4)}` : `QUO-${Date.now().toString().slice(-4)}`,
  date: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  company: { ...initialCompanyData },
  client: { ...initialClientData },
  items: [...initialItemsData.map(item => ({...item}))],
  notes: "Thank you for your business!",
  terms: "Payment is due within 30 days.",
  currency: "USD",
  taxRate: 10,
});

export const handlePdfDownloadLogic = async (pdfPrintRef, invoiceData, toast) => {
  if (!pdfPrintRef.current) {
    toast({ title: "Error", description: "Preview element not found for PDF generation.", variant: "destructive" });
    return;
  }
  const element = pdfPrintRef.current;
  
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: null, // Ensure transparency if needed, or set to card background for consistency
    onclone: (document) => {
      const clonedElement = document.querySelector('.invoice-print-container');
      if (clonedElement) {
        clonedElement.style.maxWidth = '210mm'; 
        clonedElement.style.margin = '0 auto';
        // Ensure styling for PDF is consistent with the dark theme for A4
        clonedElement.style.background = 'var(--card)'; 
        clonedElement.style.color = 'var(--card-foreground)';
      }
    }
  });
  
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });
  
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${invoiceData.type === "invoice" ? "Invoice" : "Quotation"}_${invoiceData.number}.pdf`);
  
  toast({
    title: "Download successful",
    description: `Your ${invoiceData.type} has been downloaded as a PDF.`,
    className: "bg-secondary text-primary border-secondary",
  });
};

export const handleLogoChangeLogic = (e, setLogo, toast) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      setLogo(event.target.result);
    };
    reader.readAsDataURL(file);
    toast({
      title: "Logo updated",
      description: "Your company logo has been updated successfully.",
      className: "bg-secondary text-primary border-secondary",
    });
  }
};

export const handleDetailChangeLogic = (setInvoiceData, detailType, field, value) => {
  setInvoiceData(prev => ({
    ...prev,
    [detailType]: { ...prev[detailType], [field]: value },
  }));
};

export const handleItemsLogic = (setInvoiceData, toast) => {
  const handleItemChange = (index, field, value) => {
    setInvoiceData(prev => {
      const updatedItems = [...prev.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: field === "quantity" || field === "price" || field === "tax" ? parseFloat(value) || 0 : value,
      };
      return { ...prev, items: updatedItems };
    });
  };

  const addItem = (defaultTaxRate) => {
    setInvoiceData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: prev.items.length > 0 ? Math.max(...prev.items.map(i => i.id)) + 1 : 1,
          description: "",
          quantity: 1,
          price: 0,
          tax: defaultTaxRate !== undefined ? defaultTaxRate : prev.taxRate,
        },
      ],
    }));
  };

  const removeItem = (index) => {
    setInvoiceData(prev => {
      if (prev.items.length <= 1) {
        toast({
          title: "Cannot remove item",
          description: "You need at least one item.",
          variant: "destructive",
        });
        return prev;
      }
      const updatedItems = [...prev.items];
      updatedItems.splice(index, 1);
      return { ...prev, items: updatedItems };
    });
  };
  
  return { handleItemChange, addItem, removeItem };
};

export const calculateTotalsLogic = {
  subtotal: (items) => items.reduce((sum, item) => sum + item.quantity * item.price, 0),
  tax: (items) => items.reduce((sum, item) => sum + (item.quantity * item.price * item.tax) / 100, 0),
  total: function(items) { return this.subtotal(items) + this.tax(items); },
};

export const formatCurrencyLogic = (amount, currencyCode) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
};

export const resetFormLogic = (currentType, setInvoiceData, setLogo, toast) => {
  if (window.confirm("Are you sure you want to reset the form? All unsaved changes will be lost.")) {
    setInvoiceData(getInitialInvoiceData(currentType));
    setLogo(null);
    toast({
      title: "Form reset",
      description: "The form has been reset to default values.",
      className: "bg-secondary text-primary border-secondary",
    });
  }
};