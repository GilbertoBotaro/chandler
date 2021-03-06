import * as types from './types';

export function getDebtsByContactFetched(contactId) {
  return {
    type: types.GET_DEBTS_BY_CONTACT_FETCHED,
    contactId,
  };
}

export function getDebtsByContactSuccess(contactId, debts) {
  return {
    type: types.GET_DEBTS_BY_CONTACT_SUCCESS,
    debts,
    contactId,
  };
}

export function getDebtsByContactFailed(error) {
  return {
    type: types.GET_DEBTS_BY_CONTACT_FAILED,
    error,
  };
}
