import "@/styles/table/table.css";
import { ReviewStatus } from "@/types/cultivarTypes";
import { translationStatusType } from "@/types/statusType";

interface StatusColumnProps {
  status: ReviewStatus;
}

export default function StatusColumn({ status }: StatusColumnProps) {
  const statusMap = {
    APPROVED: "success",
    PENDING: "warning",
    REJECTED: "danger",
    CHANGES_REQUESTED: "info",
  };
  const className = statusMap[status] || "default";

  return (
    <div className={`statusColumnWrapper ${className}`}>
      <p>{translationStatusType[status]}</p>
    </div>
  );
}
