import React from "react";

const InvoicePreview = React.forwardRef(({ 
  invoiceData, 
  logo, 
  formatCurrency, 
  calculateSubtotal, 
  calculateTax, 
  calculateTotal,
  previewType = "A4" 
}, ref) => {

  const headerStyleA4 = {
    background: "linear-gradient(to right, var(--colors-primary), hsl(var(--secondary)))",
    color: "hsl(var(--primary-foreground))",
  };
  
  if (invoiceData.type === "invoice" || invoiceData.type === "quotation") {
     headerStyleA4.background = "linear-gradient(to right, hsl(0 0% 0%), hsl(60 100% 30%))";
     headerStyleA4.color = "hsl(var(--secondary))";
  }


  if (previewType === "thermal") {
    return (
      <div ref={ref} className="thermal-print-container bg-white text-black p-2 font-mono text-xs">
        <h1 className="text-center font-bold text-sm mb-1">{invoiceData.company.name}</h1>
        {invoiceData.company.address && <p className="text-center text-xs mb-0.5">{invoiceData.company.address}</p>}
        {invoiceData.company.phone && <p className="text-center text-xs mb-1">{invoiceData.company.phone}</p>}
        
        <h2 className="text-center font-semibold text-xs my-1 uppercase">{invoiceData.type} #{invoiceData.number}</h2>
        <p className="text-xs">Date: {new Date(invoiceData.date).toLocaleDateString()}</p>
        {invoiceData.type === "invoice" && <p className="text-xs">Due: {new Date(invoiceData.dueDate).toLocaleDateString()}</p>}
        
        <p className="text-xs mt-1">Client: {invoiceData.client.name}</p>
        
        <hr className="my-1 border-dashed border-black"/>
        {invoiceData.items.map((item) => (
          <div key={item.id} className="text-xs mb-0.5">
            <p>{item.description}</p>
            <div className="flex justify-between">
              <span>{item.quantity} x {formatCurrency(item.price, invoiceData.currency)}</span>
              <span>{formatCurrency(item.quantity * item.price, invoiceData.currency)}</span>
            </div>
            {item.tax > 0 && (
              <div className="flex justify-end text-xs">
                <span>Tax ({item.tax}%): {formatCurrency(item.quantity * item.price * (item.tax / 100), invoiceData.currency)}</span>
              </div>
            )}
          </div>
        ))}
        <hr className="my-1 border-dashed border-black"/>
        
        <div className="text-xs">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{formatCurrency(calculateSubtotal(), invoiceData.currency)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>{formatCurrency(calculateTax(), invoiceData.currency)}</span>
          </div>
          <div className="flex justify-between font-bold text-sm mt-0.5">
            <span>Total:</span>
            <span>{formatCurrency(calculateTotal(), invoiceData.currency)}</span>
          </div>
        </div>
        
        {invoiceData.notes && <p className="text-xs mt-1">Notes: {invoiceData.notes}</p>}
        <p className="text-center text-xs mt-2">{invoiceData.terms || "Thank you!"}</p>
      </div>
    );
  }
  
  return (
    <div ref={ref} className="invoice-print-container p-4 bg-card text-card-foreground shadow-lg">
      <div style={headerStyleA4} className="invoice-header flex flex-col md:flex-row justify-between items-start md:items-center p-6 rounded-t-lg">
        <div className="flex items-center mb-4 md:mb-0">
          {logo && (
            <div className="mr-4 bg-background p-1 rounded-md shadow-sm">
              <img src={logo} alt="Company logo" className="h-16 w-auto object-contain" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold">{invoiceData.company.name}</h1>
            <p className="text-sm opacity-90">{invoiceData.company.email}</p>
            <p className="text-sm opacity-90">{invoiceData.company.phone}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold uppercase">
            {invoiceData.type === "invoice" ? "Invoice" : "Quotation"}
          </h2>
          <p className="text-sm opacity-90">#{invoiceData.number}</p>
          <p className="text-sm opacity-90">Date: {new Date(invoiceData.date).toLocaleDateString()}</p>
          <p className="text-sm opacity-90">Due: {new Date(invoiceData.dueDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="invoice-body p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-muted-foreground font-medium mb-2 text-sm uppercase">From</h3>
            <p className="font-semibold text-lg">{invoiceData.company.name}</p>
            <p>{invoiceData.company.address}</p>
            <p>
              {invoiceData.company.city}, {invoiceData.company.state} {invoiceData.company.zip}
            </p>
            <p>{invoiceData.company.phone}</p>
            <p>{invoiceData.company.email}</p>
            {invoiceData.company.website && <p className="text-secondary hover:underline">{invoiceData.company.website}</p>}
          </div>
          <div>
            <h3 className="text-muted-foreground font-medium mb-2 text-sm uppercase">Bill To</h3>
            <p className="font-semibold text-lg">{invoiceData.client.name}</p>
            <p>{invoiceData.client.address}</p>
            <p>
              {invoiceData.client.city}, {invoiceData.client.state} {invoiceData.client.zip}
            </p>
            <p>{invoiceData.client.phone}</p>
            <p>{invoiceData.client.email}</p>
          </div>
        </div>

        <table className="invoice-table mb-8 w-full">
          <thead className="border-b-2 border-secondary">
            <tr>
              <th className="text-left p-3 text-secondary uppercase tracking-wider">Description</th>
              <th className="text-right p-3 text-secondary uppercase tracking-wider">Qty</th>
              <th className="text-right p-3 text-secondary uppercase tracking-wider">Price</th>
              <th className="text-right p-3 text-secondary uppercase tracking-wider">Tax</th>
              <th className="text-right p-3 text-secondary uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item) => (
              <tr key={item.id} className="border-b border-border hover:bg-muted/30">
                <td className="text-left p-3">{item.description}</td>
                <td className="text-right p-3">{item.quantity}</td>
                <td className="text-right p-3">{formatCurrency(item.price, invoiceData.currency)}</td>
                <td className="text-right p-3">{item.tax}%</td>
                <td className="text-right font-medium p-3 text-neon-yellow">
                  {formatCurrency(item.quantity * item.price * (1 + item.tax / 100), invoiceData.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-8">
          <div className="w-full max-w-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="font-medium">Subtotal:</span>
              <span>{formatCurrency(calculateSubtotal(), invoiceData.currency)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="font-medium">Tax:</span>
              <span>{formatCurrency(calculateTax(), invoiceData.currency)}</span>
            </div>
            <div className="flex justify-between py-3 mt-2">
              <span className="font-bold text-xl text-secondary uppercase">Total:</span>
              <span className="font-bold text-xl text-neon-yellow">{formatCurrency(calculateTotal(), invoiceData.currency)}</span>
            </div>
          </div>
        </div>

        {(invoiceData.notes || invoiceData.terms) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mt-8 pt-6 border-t border-border">
            {invoiceData.notes && (
              <div>
                <h3 className="font-medium mb-2 text-secondary uppercase tracking-wider">Notes</h3>
                <p className="text-muted-foreground">{invoiceData.notes}</p>
              </div>
            )}
            {invoiceData.terms && (
              <div>
                <h3 className="font-medium mb-2 text-secondary uppercase tracking-wider">Terms & Conditions</h3>
                <p className="text-muted-foreground">{invoiceData.terms}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="invoice-footer p-6 bg-primary text-center text-sm text-secondary rounded-b-lg">
        <p>Thank you for choosing InvoiceZap!</p>
      </div>
    </div>
  );
});

InvoicePreview.displayName = "InvoicePreview";
export default InvoicePreview;