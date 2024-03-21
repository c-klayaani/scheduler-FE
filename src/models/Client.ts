import BaseModel from "./BaseModel";

class Client extends BaseModel {
  name: string;
  constructor(apiResponse: any) {
    super(
      apiResponse.id,
      new Date().toLocaleString(),
      new Date().toLocaleString()
    );
    this.name = apiResponse.name;
  }
}

export default Client;
