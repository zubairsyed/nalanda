export interface IResource {
  search?: any;
  sort?: "asc" | "desc";
  orderBy?: string;
  page?: string;
  limit?: string;
  filters?: any; // replace any with strong type
  dateFrom?: string;
  dateTo?: string;
}
