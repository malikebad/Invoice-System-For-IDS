import React from "react";

const InvoiceTotals = ({ subtotal, tax, total, formatCurrency, currency }) => {
  return (
    <div className="flex justify-end mt-4">
      <div className="w-full max-w-xs space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Subtotal:</span>
          <span className="font-medium">{formatCurrency(subtotal, currency)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Tax:</span>
          <span className="font-medium">{formatCurrency(tax, currency)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t">
          <span className="font-semibold">Total:</span>
          <span className="font-bold text-lg">{formatCurrency(total, currency)}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTotals;