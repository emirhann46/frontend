export type User = {
  id: number;
  username?: string;
  email?: string;
  rol?: "user" | "organizer" | "admin";
  provider?: string;
  blocked?: boolean;
  confirmed?: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  documentId?: string;
  attributes?: {
    username: string;
    email: string;
    address: string;
    rol: "user" | "organizer" | "admin";
    tickets?: Ticket[];
    organizer?: Organizer;
  };
};

export type Organizer = {
  id: number;
  attributes: {
    companyName: string;
    taxNumber: string;
    description: string;
    logo?: {
      url: string;
    };
    approved: boolean;
    user: User;
    events: Event[];
  };
};

export type Event = {
  id: number;
  attributes: {
    title: string;
    shortDescription: string;
    longDescription: string;
    price: number;
    date: string;
    location: string;
    capacity: number;
    remainingTickets: number;
    featured: boolean;
    status: "draft" | "published";
    organizer: Organizer;
    category: Category;
    tickets: Ticket[];
  };
};

export type Category = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    image?: {
      url: string;
    };
    events: Event[];
  };
};

export type Ticket = {
  id: number;
  attributes: {
    ticketCode: string;
    quantity: number;
    totalPrice: number;
    purchaseDate: string;
    status: "active" | "used" | "cancelled";
    user: User;
    event: Event;
    payment: Payment;
  };
};

export type Payment = {
  id: number;
  attributes: {
    paymentCode: string;
    amount: number;
    paymentMethod: "credit_card" | "paypal" | "bank_transfer";
    status: "pending" | "completed" | "failed";
    transactionId: string;
    user: User;
    tickets: Ticket[];
  };
};
