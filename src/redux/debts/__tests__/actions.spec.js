import {
  getDebtsByContactFailed,
  getDebtsByContactFetched,
  getDebtsByContactSuccess,
} from '../actions';
import * as types from '../types';

describe('Redux', () => {
  describe('Debts', () => {
    describe('Actions', () => {
      it('getDebtsByContactFetched', () => {
        const contactId = 3;
        expect(getDebtsByContactFetched(contactId)).toEqual({
          type: types.GET_DEBTS_BY_CONTACT_FETCHED,
          contactId,
        });
      });

      it('getDebtsByContactSuccess', () => {
        const contactId = 5;
        const debts = ['item2', 'item1'];
        expect(getDebtsByContactSuccess(contactId, debts)).toEqual({
          type: types.GET_DEBTS_BY_CONTACT_SUCCESS,
          debts,
          contactId,
        });
      });

      it('getDebtsByContactFailed', () => {
        const error = new Error('My error');
        expect(getDebtsByContactFailed(error)).toEqual({
          type: types.GET_DEBTS_BY_CONTACT_FAILED,
          error,
        });
      });
    });
  });
});
