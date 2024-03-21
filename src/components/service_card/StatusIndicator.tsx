import { ClientServiceStatus } from "../../models/ClientService";
import "./service_card.css";

type StatusIndicatorProps = {
  status: ClientServiceStatus;
};

const StatusIndicator = (props: StatusIndicatorProps) => (
  <div className={`status-indicator status-${props.status}`} />
);
export default StatusIndicator;
