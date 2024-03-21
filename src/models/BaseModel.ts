class BaseModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number, createdAt: string, updatedAt: string) {
    this.id = id;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}

export default BaseModel;