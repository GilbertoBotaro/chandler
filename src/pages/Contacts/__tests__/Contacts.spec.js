import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import {Contacts} from '../Contacts';

describe('Pages', () => {
  describe('Contacts', () => {
    const getContacts = jest.fn();
    const searchContacts = jest.fn();
    const navigateToContact = jest.fn();

    it('should not have a componentWillReceiveProps method', () => {
      const tree = shallow(
        <Contacts
          getContacts={getContacts}
          searchContacts={searchContacts}
          contacts={[]}
          isFetching={true}
          isSearching={false}
          navigateToContact={navigateToContact}
        />,
      );
      expect(tree.instance().componentWillReceiveProps).toBeUndefined();
    });

    it('should renders correctly without contacts and fetching', () => {
      expect(
        toJson(
          shallow(
            <Contacts
              getContacts={getContacts}
              searchContacts={searchContacts}
              contacts={[]}
              isFetching={true}
              isSearching={false}
              navigateToContact={navigateToContact}
            />,
          ),
        ),
      ).toMatchSnapshot();
    });

    it('should renders correctly without contacts (even in the db) and not fetching', () => {
      expect(
        toJson(
          shallow(
            <Contacts
              getContacts={getContacts}
              searchContacts={searchContacts}
              contacts={[]}
              count={0}
              isFetching={false}
              isSearching={false}
              navigateToContact={navigateToContact}
            />,
          ),
        ),
      ).toMatchSnapshot();
    });

    const contacts = [
      {
        first_name: 'Theo',
        last_name: 'Math',
        updated_at: '1991-12-17',
      },
      {
        first_name: 'Ines',
        last_name: 'Bode',
        updated_at: '2018-02-01',
      },
    ];

    it('should renders correctly with contacts and not fetching', () => {
      expect(
        toJson(
          shallow(
            <Contacts
              getContacts={getContacts}
              searchContacts={searchContacts}
              contacts={contacts}
              count={2}
              isFetching={false}
              isSearching={false}
              navigateToContact={navigateToContact}
            />,
          ),
        ),
      ).toMatchSnapshot();
    });

    it('should renders correctly with contacts and fetching', () => {
      expect(
        toJson(
          shallow(
            <Contacts
              getContacts={getContacts}
              searchContacts={searchContacts}
              contacts={contacts}
              count={30}
              isFetching={true}
              isSearching={false}
              navigateToContact={navigateToContact}
            />,
          ),
        ),
      ).toMatchSnapshot();
    });
  });
});
