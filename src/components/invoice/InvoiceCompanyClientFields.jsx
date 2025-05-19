import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InvoiceCompanyClientFields = ({ invoiceData, handleCompanyChange, handleClientChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Your Company</h3>
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={invoiceData.company.name}
            onChange={(e) => handleCompanyChange("name", e.target.value)}
            className="input-animated"
          />
        </div>
        <div>
          <Label htmlFor="companyAddress">Address</Label>
          <Input
            id="companyAddress"
            value={invoiceData.company.address}
            onChange={(e) => handleCompanyChange("address", e.target.value)}
            className="input-animated"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="companyCity">City</Label>
            <Input
              id="companyCity"
              value={invoiceData.company.city}
              onChange={(e) => handleCompanyChange("city", e.target.value)}
              className="input-animated"
            />
          </div>
          <div>
            <Label htmlFor="companyState">State</Label>
            <Input
              id="companyState"
              value={invoiceData.company.state}
              onChange={(e) => handleCompanyChange("state", e.target.value)}
              className="input-animated"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="companyZip">ZIP Code</Label>
            <Input
              id="companyZip"
              value={invoiceData.company.zip}
              onChange={(e) => handleCompanyChange("zip", e.target.value)}
              className="input-animated"
            />
          </div>
          <div>
            <Label htmlFor="companyPhone">Phone</Label>
            <Input
              id="companyPhone"
              value={invoiceData.company.phone}
              onChange={(e) => handleCompanyChange("phone", e.target.value)}
              className="input-animated"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="companyEmail">Email</Label>
          <Input
            id="companyEmail"
            type="email"
            value={invoiceData.company.email}
            onChange={(e) => handleCompanyChange("email", e.target.value)}
            className="input-animated"
          />
        </div>
        <div>
          <Label htmlFor="companyWebsite">Website</Label>
          <Input
            id="companyWebsite"
            value={invoiceData.company.website}
            onChange={(e) => handleCompanyChange("website", e.target.value)}
            className="input-animated"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Client Information</h3>
        <div>
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            value={invoiceData.client.name}
            onChange={(e) => handleClientChange("name", e.target.value)}
            className="input-animated"
          />
        </div>
        <div>
          <Label htmlFor="clientAddress">Address</Label>
          <Input
            id="clientAddress"
            value={invoiceData.client.address}
            onChange={(e) => handleClientChange("address", e.target.value)}
            className="input-animated"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="clientCity">City</Label>
            <Input
              id="clientCity"
              value={invoiceData.client.city}
              onChange={(e) => handleClientChange("city", e.target.value)}
              className="input-animated"
            />
          </div>
          <div>
            <Label htmlFor="clientState">State</Label>
            <Input
              id="clientState"
              value={invoiceData.client.state}
              onChange={(e) => handleClientChange("state", e.target.value)}
              className="input-animated"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="clientZip">ZIP Code</Label>
            <Input
              id="clientZip"
              value={invoiceData.client.zip}
              onChange={(e) => handleClientChange("zip", e.target.value)}
              className="input-animated"
            />
          </div>
          <div>
            <Label htmlFor="clientPhone">Phone</Label>
            <Input
              id="clientPhone"
              value={invoiceData.client.phone}
              onChange={(e) => handleClientChange("phone", e.target.value)}
              className="input-animated"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="clientEmail">Email</Label>
          <Input
            id="clientEmail"
            type="email"
            value={invoiceData.client.email}
            onChange={(e) => handleClientChange("email", e.target.value)}
            className="input-animated"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceCompanyClientFields;