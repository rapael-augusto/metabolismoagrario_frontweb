import "@/styles/table/table.css";
import { translationStatusType } from "@/types/statusType";

interface StatusColumnProps {
  status: "Approved" | "Pending" | "Declined";
}

export default function StatusColumn({ status }: StatusColumnProps) {
  const statusMap = {
    Approved: "success",
    Pending: "warning",
    Declined: "danger",
  };
  const className = statusMap[status] || "default";

  return (
    <div className={`statusColumnWrapper ${className}`}>
      <p>{translationStatusType[status]}</p>
    </div>
  );
}
