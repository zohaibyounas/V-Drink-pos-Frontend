import React from "react";
import Card from "./Card";
export default function TaxSummaryCard({ label, value }) {
  return (
    <Card title={label}>
      <p className="text-2xl font-semibold">
        PKR {(value || 0).toLocaleString()}
      </p>
    </Card>
  );
}
