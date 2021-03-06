import {getDebtsByContact} from '../operations';
import {
  getDebtsByContactFailed,
  getDebtsByContactFetched,
  getDebtsByContactSuccess,
} from '../actions';
import {API} from 'api';

jest.mock('api', () => ({
  API: {
    Debts: {
      getAllByContact: jest.fn(),
    },
  },
}));

describe('Redux', () => {
  describe('DEBTS', () => {
    describe('Operations', () => {
      let dispatch;
      const contactId = 5;

      beforeEach(() => {
        dispatch = jest.fn();
        API.Debts.getAllByContact.mockReset();
      });

      describe('getDebtsByContact', () => {
        it('should not do anything if it is already fetching', async () => {
          const getState = () => ({
            getDebtsByContact: {
              isFetching: true,
            },
          });
          await getDebtsByContact(contactId)(dispatch, getState);
          expect(dispatch.mock.calls.length).toBe(0);
        });

        it('should not do anything if every element has already been fetched', async () => {
          const getState = () => ({
            contacts: {
              [contactId]: {
                statistics: {
                  number_of_debts: 5,
                },
                debts: [1, 2, 3, 4, 5],
              },
            },
            getDebtsByContact: {
              isFetching: false,
            },
          });
          await getDebtsByContact(contactId)(dispatch, getState);
          expect(dispatch.mock.calls.length).toBe(0);
          expect(API.Debts.getAllByContact.mock.calls.length).toBe(0);
        });

        it('should trigger fetch action (success)', async () => {
          const res = {
            data: ['a'],
          };
          const fetchedPageCount = 3;
          const getState = () => ({
            contacts: {
              [contactId]: {},
            },
            getDebtsByContact: {
              isFetching: false,
              fetchedPageCount,
            },
          });
          API.Debts.getAllByContact.mockReturnValue(Promise.resolve(res));
          await getDebtsByContact(contactId)(dispatch, getState);
          expect(dispatch.mock.calls.length).toBe(2);
          expect(dispatch.mock.calls[0]).toEqual([
            getDebtsByContactFetched(contactId),
          ]);
          expect(dispatch.mock.calls[1]).toEqual([
            getDebtsByContactSuccess(contactId, res.data),
          ]);
          expect(API.Debts.getAllByContact.mock.calls.length).toBe(1);
          expect(API.Debts.getAllByContact.mock.calls[0]).toEqual([
            contactId,
            fetchedPageCount + 1,
          ]);
        });

        it('should trigger fetch action (failed)', async () => {
          const error = new Error();
          const fetchedPageCount = 0;
          const getState = () => ({
            contacts: {
              [contactId]: {},
            },
            getDebtsByContact: {
              isFetching: false,
              fetchedPageCount,
            },
          });
          API.Debts.getAllByContact.mockReturnValue(Promise.reject(error));
          await getDebtsByContact(contactId)(dispatch, getState);
          expect(dispatch.mock.calls.length).toBe(2);
          expect(dispatch.mock.calls[0]).toEqual([
            getDebtsByContactFetched(contactId),
          ]);
          expect(dispatch.mock.calls[1]).toEqual([
            getDebtsByContactFailed(error),
          ]);
          expect(API.Debts.getAllByContact.mock.calls.length).toBe(1);
          expect(API.Debts.getAllByContact.mock.calls[0]).toEqual([
            contactId,
            fetchedPageCount + 1,
          ]);
        });
      });
    });
  });
});
