export const ACTIONS = {
    GET_ALL: 'note/get_all',
    GET: 'note/get',
    GET_NOTES_BY_PERSON: 'note/get_notes_by_person',
    GET_LIST: 'note/get_list',
    SET_LOADING: 'note/set_loading',
    SET_PAGINATION: 'note/set_pagination',
};
  
  interface Get {
    type: typeof ACTIONS.GET
    payload: Array<string|number>
  }

  interface GetNotesByPerson {
    type: typeof ACTIONS.GET_NOTES_BY_PERSON
    payload: Array<string|number>
  }
  
  interface GetAll {
    type: typeof ACTIONS.GET_ALL
    payload: Array<string|number>
  }

  interface GetList {
    type: typeof ACTIONS.GET_LIST
    payload: Array<string|number>
  }
  
  interface SetLoading {
    type: typeof ACTIONS.SET_LOADING
    payload: boolean
  }

  interface SetPagination {
    type: typeof ACTIONS.SET_PAGINATION
    payload: Array<string|number>
  }
  
  
  export type ActionTypes = Get | GetAll | SetLoading | SetPagination | GetList | GetNotesByPerson;