export interface IUser {
  id: number;
  name: string;
}

export class User implements IUser {
  id: number;
  name: string;

  constructor(params: any) {
    this.id = params.id ? parseInt(params.id, 10) : 0;
    this.name = params.name || 'Unnamed';
  }
}