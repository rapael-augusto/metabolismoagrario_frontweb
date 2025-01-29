export type CultivarParams = {
  name: string;
};

export type CreateCultivarResponseType = {
  status: number;
  mensagem: string;
};

export type ReviewStatus = "Approved" | "Pending" | "Declined";

export type cultivarsData = {
  id: string;
  cropId: string;
  name: string;
};
