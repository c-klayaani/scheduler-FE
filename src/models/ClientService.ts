import BaseModel from "./BaseModel";
import Service from "./Service";
import Client from "./Client";
class ClientService extends BaseModel {
  service: Service;
  client: Client;
  startDate: Date;
  dueDate: Date;
  status: ClientServiceStatus;
  description: string;

  constructor(apiResponse: any) {
    super(apiResponse.id, apiResponse.created_at, apiResponse.updated_at);
    this.service = new Service(apiResponse.service);
    this.client = new Client(apiResponse.client);
    // this.clientId = apiResponse.client_id;
    this.startDate = new Date(apiResponse.start_date);
    this.dueDate = new Date(apiResponse.due_date);
    this.status =
      ClientServiceStatus[
        apiResponse.status as keyof typeof ClientServiceStatus
      ];
    this.description = apiResponse.description;
  }
}
//   id: number;
//   client_name: string;
//   due_date: string;
//   service_name:string;
//   status:string;
enum ClientServiceStatus {
  Pending = "Pending",
  Active = "Active",
  Inactive = "Inactive",
  Overdue = "Overdue",
}

export { ClientService, ClientServiceStatus };
