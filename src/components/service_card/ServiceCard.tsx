import { Card } from "primereact/card";
import { ClientService, ClientServiceStatus } from "../../models/ClientService";
import WarningIcon from "../Icons/WarningIcon";
import StatusIndicator from "./StatusIndicator";
import "./service_card.css";
import { formatDate } from "../../utils/dateHelper";
import { DeleteIcon } from "../Icons/DeleteIcon";
import React from "react";

type ServiceCardProps = {
  isLoading: boolean;
  service: ClientService;
  onClick: () => void;
  handleDeleteClick: () => void;
};

const ServiceCard = (props: ServiceCardProps) => {
  return props.isLoading ? (
    <Card className="shimmerBG elevated" />
  ) : (
    <div className="client-service-card-wrapper" onClick={props.onClick}>
      <div className="status-container">
        {props.service.status == ClientServiceStatus.Overdue ? (
          <WarningIcon />
        ) : (
          <StatusIndicator status={props.service.status} />
        )}
      </div>
      <span className="client-service-name">{props.service.service.name}</span>
      <small className="client-service-created-date">
        {props.service.description}
      </small>
      <small className="client-service-due-date">
        {formatDate(props.service.dueDate)}
      </small>
      <div onClick={props.handleDeleteClick} className="delete-icon-container">
        <DeleteIcon
          onClick={(e) => {
            e.stopPropagation();
            props.handleDeleteClick();
          }}
        />
      </div>
    </div>
  );
};

export default ServiceCard;
