import { ACTIONS, ActionTypes } from "../interfaces/actionTypes/personTypes";

type InitialState = {
  persons: Array<string | number>;
  client: Array<string | number>;
  partnersToAssign: Array<string | number>;
  partnersList: Array<string | number>;
  familiesPartnerByCard: Array<string | number>;
  familyByPerson: Array<string | number>;
  titularToAssign: Array<string | number>;
  personLockersByLocation: Array<string | number>;
  personLockers: Array<string | number>;
  partnerStatistics: object;
  familyStatistics: object;
  guestStatistics: object;
  personsStatistics: object;
  personsExceptionStatistics: object;
  personsBirthdayStatistics: object;
  guestByPartner: object;
  loading: boolean;
  secondLoading: boolean;
  assignLoading: boolean;
  setPartnersLoading: boolean;
  setTitularLoading: boolean;
  relationLoading: boolean;
  reportByPartnerLoading: boolean;
  familiesPartnerCardLoading: boolean;
  guestByPartnerLoading: boolean;
  personLockersByLocationLoading: boolean;
  personLockersLoading: boolean;
  setFamilyByPersonLoading: boolean;
  partnerStatisticsLoading: boolean;
  familyStatisticsLoading: boolean;
  guestStatisticsLoading: boolean;
  personsStatisticsLoading: boolean;
  personsExceptionStatisticsLoading: boolean;
  personsBirthdayStatisticsLoading: boolean;
  getPartnersLoading: boolean;
  setClientLoading: boolean;
  paginationPersonsToAssign: any;
  pagination: any;
  selectedPerson: any;
  personsToAssign: any;
};

const initialState: InitialState = {
  persons: [],
  loading: false,
  assignLoading: false,
  relationLoading: false,
  reportByPartnerLoading: false,
  secondLoading: false,
  selectedPerson: null,
  personsToAssign: [],
  paginationPersonsToAssign: {
    total: 0,
    perPage: 0,
    prevPageUrl: null,
    currentPage: 0
  },
  familyByPerson: [],
  partnersToAssign: [],
  titularToAssign: [],
  setPartnersLoading: false,
  setTitularLoading: false,
  familiesPartnerByCard: [],
  familiesPartnerCardLoading: false,
  guestByPartner: {},
  guestByPartnerLoading: false,
  pagination: {
    total: 0,
    perPage: 0,
    prevPageUrl: null,
    currentPage: 0
  },
  personLockersByLocation: [],
  personLockersByLocationLoading: false,
  personLockers: [],
  personLockersLoading: false,
  setFamilyByPersonLoading: false,
  partnerStatistics: {},
  familyStatistics: {},
  guestStatistics: {},
  personsStatistics: {},
  personsExceptionStatistics: {},
  personsBirthdayStatistics: {},
  partnerStatisticsLoading: false,
  familyStatisticsLoading: false,
  guestStatisticsLoading: false,
  personsStatisticsLoading: false,
  personsExceptionStatisticsLoading: false,
  personsBirthdayStatisticsLoading: false,
  partnersList: [],
  getPartnersLoading: false,
  client: [],
  setClientLoading: false
};

const personReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case ACTIONS.GET_ALL:
      return {
        ...state,
        persons: action.payload
      };
    case ACTIONS.GET_CLIENT:
      return {
        ...state,
        client: action.payload
      };
    case ACTIONS.GET_PARTNERS:
      return {
        ...state,
        partnersList: action.payload
      };
    case ACTIONS.GET_PARTNER_STATISTICS:
      return {
        ...state,
        partnerStatistics: action.payload
      };
    case ACTIONS.GET_PERSONS_BIRTHDAY_STATISTICS:
      return {
        ...state,
        personsBirthdayStatistics: action.payload
      };
    case ACTIONS.GET_FAMILY_STATISTICS:
      return {
        ...state,
        familyStatistics: action.payload
      };
    case ACTIONS.GET_GUEST_STATISTICS:
      return {
        ...state,
        guestStatistics: action.payload
      };
    case ACTIONS.GET_PERSONS_STATISTICS:
      return {
        ...state,
        personsStatistics: action.payload
      };
    case ACTIONS.GET_PERSONS_EXCEPTION_STATISTICS:
      return {
        ...state,
        personsExceptionStatistics: action.payload
      };
    case ACTIONS.SET_PAGINATION:
      return {
        ...state,
        pagination: action.payload
      };
    case ACTIONS.GET_GUEST_BY_PARTNER:
      return {
        ...state,
        guestByPartner: action.payload
      };

    case ACTIONS.GET_PERSON_TO_ASSIGN:
      return {
        ...state,
        personsToAssign: action.payload
      };
    case ACTIONS.GET_PERSON_LOCKERS_BY_LOCATION:
      return {
        ...state,
        personLockersByLocation: action.payload
      };
    case ACTIONS.GET_FAMILIES_PARTNER_BY_CARD:
      return {
        ...state,
        familiesPartnerByCard: action.payload
      };

    case ACTIONS.GET_PARTNERS_TO_ASSIGN:
      return {
        ...state,
        partnersToAssign: action.payload
      };
    case ACTIONS.GET_TITULAR_TO_ASSIGN:
      return {
        ...state,
        titularToAssign: action.payload
      };
    case ACTIONS.SET_PERSON:
      return {
        ...state,
        selectedPerson: action.payload
      };
    case ACTIONS.SET_PERSON_LOCKERS:
      return {
        ...state,
        personLockers: action.payload
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case ACTIONS.SET_PERSON_LOCKERS_LOADING:
      return {
        ...state,
        personLockersLoading: action.payload
      };
    case ACTIONS.SET_CLIENT_LOADING:
      return {
        ...state,
        setClientLoading: action.payload
      };
    case ACTIONS.SET_PERSON_LOCKERS_BY_LOCATION_LOADING:
      return {
        ...state,
        personLockersByLocationLoading: action.payload
      };
    case ACTIONS.SET_SECOND_LOADING:
      return {
        ...state,
        secondLoading: action.payload
      };
    case ACTIONS.GET_PARTNERS_LOADING:
      return {
        ...state,
        getPartnersLoading: action.payload
      };
    case ACTIONS.SET_PERSONS_BIRTHDAY_STATISTICS_LOADING:
      return {
        ...state,
        personsBirthdayStatisticsLoading: action.payload
      };
    case ACTIONS.SET_FAMILY_BY_PERSON_LOADING:
      return {
        ...state,
        setFamilyByPersonLoading: action.payload
      };
    case ACTIONS.SET_ASSIGN_LOADING:
      return {
        ...state,
        assignLoading: action.payload
      };
    case ACTIONS.SET_REPORT_BY_PARTNER_LOADING:
      return {
        ...state,
        reportByPartnerLoading: action.payload
      };
    case ACTIONS.SET_RELATION_LOADING:
      return {
        ...state,
        relationLoading: action.payload
      };
    case ACTIONS.SET_PARTNERS_LOADING:
      return {
        ...state,
        setPartnersLoading: action.payload
      };
    case ACTIONS.SET_TITULAR_LOADING:
      return {
        ...state,
        setTitularLoading: action.payload
      };
    case ACTIONS.SET_GUEST_BY_PARTNER_LOADING:
      return {
        ...state,
        guestByPartnerLoading: action.payload
      };
    case ACTIONS.SET_FAMILIES_PARTNER_CARD_LOADING:
      return {
        ...state,
        familiesPartnerCardLoading: action.payload
      };
    case ACTIONS.SET_PARTNER_STATISTICS_LOADING:
      return {
        ...state,
        partnerStatisticsLoading: action.payload
      };
    case ACTIONS.SET_FAMILY_STATISTICS_LOADING:
      return {
        ...state,
        familyStatisticsLoading: action.payload
      };
    case ACTIONS.SET_GUEST_STATISTICS_LOADING:
      return {
        ...state,
        guestStatisticsLoading: action.payload
      };
    case ACTIONS.SET_PERSONS_STATISTICS_LOADING:
      return {
        ...state,
        personsStatisticsLoading: action.payload
      };
    case ACTIONS.SET_PERSONS_EXCEPTION_STATISTICS_LOADING:
      return {
        ...state,
        personsExceptionStatisticsLoading: action.payload
      };
    case ACTIONS.SET_PERSON_ASSIGN_PAGINATION:
      return {
        ...state,
        paginationPersonsToAssign: action.payload
      };
    case ACTIONS.GET_FAMILY_BY_PERSON:
      return {
        ...state,
        familyByPerson: action.payload
      };
    case ACTIONS.CLEAR:
      return {
        ...state,
        familiesPartnerByCard: initialState.familiesPartnerByCard,
        familyByPerson: initialState.familyByPerson
      };
    case ACTIONS.CLEAR_PERSON_LOCKERS_BY_LOCATION:
      return {
        ...state,
        personLockersByLocation: initialState.personLockersByLocation
      };
    case ACTIONS.CLEAR_PERSONS:
      return {
        ...state,
        persons: initialState.persons
      };
    default:
      return state;
  }
};

export default personReducer;
