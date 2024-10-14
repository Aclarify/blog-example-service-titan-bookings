export type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type Contact = {
  type: "Phone" | "Email";
  value: string;
};

export interface CreateBookingOutboundDto {
  source: string;
  name: string;
  summary: string;
  isFirstTimeClient: boolean;
  externalId: string;
  address: Address;
  contacts: Contact[];
}

export type CreateBookingFormDto = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
};
