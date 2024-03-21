import { Divider } from "primereact/divider";
import { ClientServiceStatus } from "../../models/ClientService";
import WarningIcon from "../Icons/WarningIcon";
import StatusIndicator from "./StatusIndicator";

const StatusIndicatorsLegend = () => {
  return (
    <div className="status-indicators-legend-container">
      <div className="row-16">
        <Divider className="legend-divider" layout="vertical">
          <StatusIndicator status={ClientServiceStatus.Pending} />
        </Divider>
        <span>Pending</span>
      </div>
      <div className="row-16">
        <Divider className="legend-divider" layout="vertical">
          <StatusIndicator status={ClientServiceStatus.Inactive} />
        </Divider>
        <span>Inactive</span>
      </div>
      <div className="row-16">
        <Divider className="legend-divider" layout="vertical">
          <StatusIndicator status={ClientServiceStatus.Active} />
        </Divider>
        <span>Active</span>
      </div>
      <div className="row-16">
        <Divider className="legend-divider" layout="vertical">
          <WarningIcon size="24px" />
        </Divider>
        <span>Overdue</span>
      </div>
    </div>
  );
};

export default StatusIndicatorsLegend;
