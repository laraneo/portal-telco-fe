export const ACTIONS = {
  GET_ALL: "person/get_all",
  GET: "person/get",
  GET_PERSON_TO_ASSIGN: "person/get_persons_to_assign",
  GET_CLIENT: "person/get_client",
  SET_PERSON: "set_person/get",
  SET_PERSON_ASSIGN_PAGINATION: "person/set_person_assign_pagination",
  GET_FAMILY_BY_PERSON: "person/get_family_by_person",
  GET_PARTNER_STATISTICS: "person/get_parnter_statistics",
  GET_FAMILY_STATISTICS: "person/get_family_statistics",
  GET_GUEST_STATISTICS: "person/get_guest_statistics",
  GET_PERSONS_STATISTICS: "person/get_persons_statistics",
  GET_PERSONS_EXCEPTION_STATISTICS: "person/get_persons_exception_statistics",
  GET_PERSONS_BIRTHDAY_STATISTICS: "person/get_persons_birthday_statistics",
  GET_PARTNERS: "person/get_partners",
  SET_LOADING: "person/set_loading",
  SET_SECOND_LOADING: "person/set_second_loading",
  SET_RELATION_LOADING: "person/set_relation_loading",
  SET_FAMILY_LOADING: "person/set_family_loading",
  SET_ASSIGN_LOADING: "person/set_assign_loading",
  SET_REPORT_BY_PARTNER_LOADING: "person/set_report_by_partner_loading",
  SET_FAMILIES_PARTNER_CARD_LOADING: "person/set_families_partner_card_loading",
  SET_PERSON_LOCKERS_BY_LOCATION_LOADING: "person/set_person_lockers_by_location_loading",
  SET_PARTNER_STATISTICS_LOADING: "person/set_parnter_statistics_loading",
  SET_FAMILY_STATISTICS_LOADING: "person/set_family_statistics_loading",
  SET_GUEST_STATISTICS_LOADING: "person/set_guest_statistics_loading",
  SET_PERSONS_STATISTICS_LOADING: "person/set_persons_statistics_loading",
  SET_PERSONS_EXCEPTION_STATISTICS_LOADING: "person/set_persons_exception_statistics_loading",
  SET_PERSONS_BIRTHDAY_STATISTICS_LOADING: "person/set_persons_birthday_statistics_loading",
  SET_CLIENT_LOADING: "person/set_client_loading",
  SET_PERSON_LOCKERS: "person/set_person_lockers",
  SET_PERSON_LOCKERS_LOADING: "person/set_person_lockers_loading",
  GET_PARTNERS_LOADING: "person/set_person_lockers_loading",
  GET_PARTNERS_TO_ASSIGN: "person/get_partners_to_assign",
  GET_TITULAR_TO_ASSIGN: "person/get_titular_to_assign",
  GET_FAMILIES_PARTNER_BY_CARD: "person/get_families_partner_card",
  GET_GUEST_BY_PARTNER: "person/get_guest_by_partner",
  SET_PARTNERS_LOADING: "person/set_partners_loading",
  SET_TITULAR_LOADING: "person/set_titular_loading",
  SET_FAMILY_BY_PERSON_LOADING: "person/set_family_by_person_loading",
  SET_GUEST_BY_PARTNER_LOADING: "person/set_guest_by_partner_loading",
  SET_SELECTED_FAMILIES_BY_PARTNER: "person/set_selected_families_by_partner",
  GET_PERSON_LOCKERS_BY_LOCATION: "person/get_person_lockers_by_location",
  CLEAR: "person/clear",
  CLEAR_PERSONS: "person/clear_persons",
  CLEAR_PERSON_LOCKERS_BY_LOCATION: "person/clear_persons_lockers_by_location",
  SET_PAGINATION: 'person/set_pagination',
};

interface GetPerson {
  type: typeof ACTIONS.GET;
  payload: Array<string | number>;
}

interface GetClient {
  type: typeof ACTIONS.GET_CLIENT;
  payload: Array<string | number>;
}

interface GetPartnerStatistics {
  type: typeof ACTIONS.GET_PARTNER_STATISTICS;
  payload: Array<string | number>;
}

interface GetFamilyStatistics {
  type: typeof ACTIONS.GET_FAMILY_STATISTICS;
  payload: Array<string | number>;
}

interface GetGuestStatistics {
  type: typeof ACTIONS.GET_GUEST_STATISTICS;
  payload: Array<string | number>;
}

interface GetPersonsStatistics {
  type: typeof ACTIONS.GET_PERSONS_STATISTICS;
  payload: Array<string | number>;
}

interface GetPersonsExceptionStatistics {
  type: typeof ACTIONS.GET_PERSONS_EXCEPTION_STATISTICS;
  payload: Array<string | number>;
}

interface GetPersonsBirthdayStatistics {
  type: typeof ACTIONS.GET_PERSONS_BIRTHDAY_STATISTICS;
  payload: Array<string | number>;
}

interface GetPersonLockersByLocation {
  type: typeof ACTIONS.GET_PERSON_LOCKERS_BY_LOCATION;
  payload: Array<string | number>;
}


interface GetGuestByPartner {
  type: typeof ACTIONS.GET_GUEST_BY_PARTNER;
  payload: object;
}

interface GetFamilyByPerson {
  type: typeof ACTIONS.GET_FAMILY_BY_PERSON;
  payload: Array<string | number>;
}

interface GetFamiliesPartnerByCard {
  type: typeof ACTIONS.GET_FAMILIES_PARTNER_BY_CARD;
  payload: Array<string | number>;
}

interface SetPerson {
  type: typeof ACTIONS.SET_PERSON;
  payload: Array<string | number>;
}

interface SetPersonLockers {
  type: typeof ACTIONS.SET_PERSON_LOCKERS_LOADING;
  payload: Array<string | number>;
}

interface SetPersonAssignPagination {
  type: typeof ACTIONS.SET_PERSON_ASSIGN_PAGINATION;
  payload: Array<string | number>;
}

interface GetAllPersons {
  type: typeof ACTIONS.GET_ALL;
  payload: Array<string | number>;
}

interface SetLoading {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

interface SetFamilyByPerson {
  type: typeof ACTIONS.SET_LOADING;
  payload: boolean;
}

interface SetClientLoading {
  type: typeof ACTIONS.SET_CLIENT_LOADING;
  payload: boolean;
}


interface SetPartnersLoading {
  type: typeof ACTIONS.SET_PARTNERS_LOADING;
  payload: boolean;
}

interface SetTitularLoading {
  type: typeof ACTIONS.SET_TITULAR_LOADING;
  payload: boolean;
}

interface SetSecondLoading {
  type: typeof ACTIONS.SET_SECOND_LOADING;
  payload: boolean;
}

interface SetRelationLoading {
  type: typeof ACTIONS.SET_RELATION_LOADING;
  payload: boolean;
}

interface SetReportByPartnerLoading {
  type: typeof ACTIONS.SET_REPORT_BY_PARTNER_LOADING;
  payload: boolean;
}

interface SetPersonLockersByLocationLoading {
  type: typeof ACTIONS.SET_PERSON_LOCKERS_BY_LOCATION_LOADING;
  payload: boolean;
}

interface SetPersonLockersLoading {
  type: typeof ACTIONS.SET_PERSON_LOCKERS_LOADING;
  payload: boolean;
}

interface SetFamiliesPartnerCardLoading {
  type: typeof ACTIONS.SET_FAMILIES_PARTNER_CARD_LOADING;
  payload: boolean;
}

interface SetGuestByPartnerLoading {
  type: typeof ACTIONS.SET_GUEST_BY_PARTNER_LOADING;
  payload: boolean;
}

interface SetPartnerStatisticsLoading {
  type: typeof ACTIONS.SET_PARTNER_STATISTICS_LOADING;
  payload: boolean;
}

interface SetFamilyStatisticsLoading {
  type: typeof ACTIONS.SET_FAMILY_STATISTICS_LOADING;
  payload: boolean;
}

interface SetGuestStatisticsLoading {
  type: typeof ACTIONS.SET_GUEST_STATISTICS_LOADING;
  payload: boolean;
}

interface SetPersonsStatisticsLoading {
  type: typeof ACTIONS.SET_PERSONS_STATISTICS_LOADING;
  payload: boolean;
}

interface SetFamilyLoading {
  type: typeof ACTIONS.SET_PERSONS_STATISTICS_LOADING;
  payload: boolean;
}

interface SetPersonsExceptionStatisticsLoading {
  type: typeof ACTIONS.SET_PERSONS_EXCEPTION_STATISTICS_LOADING;
  payload: boolean;
}

interface SetPersonsBirthdayStatisticsLoading {
  type: typeof ACTIONS.SET_PERSONS_BIRTHDAY_STATISTICS_LOADING;
  payload: boolean;
}

interface GetPartnersToAssign {
  type: typeof ACTIONS.GET_PARTNERS_TO_ASSIGN;
  payload: boolean;
}

interface GetTitularToAssign {
  type: typeof ACTIONS.GET_TITULAR_TO_ASSIGN;
  payload: boolean;
}

interface SetSelectedFamiliesByPartnet {
  type: typeof ACTIONS.SET_SELECTED_FAMILIES_BY_PARTNER;
  payload: Array<string | number>;
}

interface Clear {
  type: typeof ACTIONS.CLEAR;
  payload: Array<string | number>;
}

interface ClearPersons {
  type: typeof ACTIONS.CLEAR_PERSONS;
  payload: Array<string | number>;
}

interface ClearPersonLockersByLocation {
  type: typeof ACTIONS.CLEAR_PERSON_LOCKERS_BY_LOCATION;
  payload: Array<string | number>;
}

interface SetPagination {
  type: typeof ACTIONS.SET_PAGINATION
  payload: Array<string|number>
}

export type ActionTypes =
  | GetPerson
  | GetFamilyByPerson
  | GetFamiliesPartnerByCard
  | SetPerson
  | SetPersonAssignPagination
  | SetReportByPartnerLoading
  | GetAllPersons
  | SetLoading
  | SetSecondLoading
  | SetRelationLoading
  | GetPartnersToAssign
  | GetTitularToAssign
  | SetPartnersLoading
  | SetTitularLoading
  | SetFamiliesPartnerCardLoading
  | SetSelectedFamiliesByPartnet
  | Clear
  | GetGuestByPartner
  | SetGuestByPartnerLoading
  | SetPagination
  | ClearPersons
  | GetPersonLockersByLocation
  | SetPersonLockersByLocationLoading
  | ClearPersonLockersByLocation
  | SetPersonLockersLoading
  | SetPersonLockers
  | SetFamilyByPerson
  | GetPartnerStatistics
  | GetFamilyStatistics
  | GetGuestStatistics
  | GetPersonsStatistics
  | SetPartnerStatisticsLoading
  | SetFamilyStatisticsLoading
  | SetGuestStatisticsLoading
  | SetPersonsStatisticsLoading
  | GetPersonsExceptionStatistics
  | SetPersonsExceptionStatisticsLoading
  | GetPersonsBirthdayStatistics
  | GetClient
  | SetClientLoading
  | SetPersonsBirthdayStatisticsLoading
  | SetFamilyLoading;
