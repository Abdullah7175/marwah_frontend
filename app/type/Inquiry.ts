export default class Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  updated_at: string;

  constructor(id: string, name: string, email: string, phone: string, message: string, created_at: string, updated_at: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.message = message;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromJson(data: any): Inquiry {
    return new Inquiry(
      data.id,
      data.name,
      data.email,
      data.phone,
      data.message,
      data.created_at,
      data.updated_at
    );
  }

  toJson(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      message: this.message,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }

  static getDummy(): Inquiry {
    return new Inquiry('', '', '', '', '', '', '');
  }
}
