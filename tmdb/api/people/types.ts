export type PeopleListType = "popular";

export type PersonDetailsRequestParams = {
  id: string | number;
  append?: string;
};

export type PeopleListRequestParams = {
  list: PeopleListType;
  page?: string;
};
