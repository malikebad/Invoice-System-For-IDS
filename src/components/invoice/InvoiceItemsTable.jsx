import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";

const InvoiceItemsTable = ({ items, taxRate, currency, handleItemChange, addItem, removeItem, formatCurrency }) => {
  return (
    <div className="pt-4 border-t">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Items</h3>
        <Button 
          onClick={() => addItem(taxRate)} 
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
              <TableHead className="w-[100px]">Quantity</TableHead>
              <TableHead className="w-[150px]">Price</TableHead>
              <TableHead className="w-[100px]">Tax (%)</TableHead>
              <TableHead className="w-[150px]">Total</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
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
                  {formatCurrency(item.quantity * item.price * (1 + item.tax / 100), currency)}
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
    </div>
  );
};

export default InvoiceItemsTable;