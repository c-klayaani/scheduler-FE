import BaseModel from "./BaseModel";

class Contact extends BaseModel {
  email: string;
  name: string;
  isDefault: boolean;

  constructor(apiResponse: any) {
    super(apiResponse.id, apiResponse.created_at, apiResponse.updated_at);
    this.email = apiResponse.email;
    this.name = apiResponse.name;
    this.isDefault = Boolean(apiResponse.is_default);
  }
}

export default Contact;
