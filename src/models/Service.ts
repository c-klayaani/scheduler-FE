import BaseModel from "./BaseModel";

class Service extends BaseModel {
  name: string;
  constructor(apiResponse: any) {
    super(apiResponse.id, apiResponse.created_at, apiResponse.updated_at);
    this.name = apiResponse.name;
  }
}

export default Service;
