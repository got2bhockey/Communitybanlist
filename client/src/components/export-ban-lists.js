import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import { Card, CardBody, CardHeader, Table } from 'reactstrap';

import { ExportBanListDelete } from './index';

const query = gql`
  query {
    currentSteamUser {
      exportBanListsLimit
      exportBanLists {
        _id
        name
      }
    }
  }
`;

export { query };

export default function() {
  return (
    <Query query={query} onError={() => {}}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <Card className=" shadow">
              <CardHeader className=" bg-transparent">
                <h3 className=" mb-0">Export Ban Lists</h3>
              </CardHeader>
              <CardBody>
                <div className="text-center mt-2 mb-3">Loading...</div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-circle-notch fa-spin fa-4x" />
                </div>
              </CardBody>
            </Card>
          );

        if (error)
          return (
            <Card className=" shadow">
              <CardHeader className=" bg-transparent">
                <h3 className=" mb-0">Export Ban Lists</h3>
              </CardHeader>
              <CardBody>
                <div className="text-center mt-2 mb-2">Error!</div>
                <div className="btn-wrapper text-center">
                  <i className="fas fa-exclamation-triangle fa-4x" />
                </div>
                <div className="text-center mt-2 mb-2">
                  Something went wrong. Sad times.
                </div>
              </CardBody>
            </Card>
          );

        return (
          <Card className=" shadow">
            <CardHeader className=" bg-transparent">
              <h3 className=" mb-0">
                Export Ban Lists ({data.currentSteamUser.exportBanLists.length}{' '}
                / {data.currentSteamUser.exportBanListsLimit})
              </h3>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th>Export Ban List Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.currentSteamUser.exportBanLists.map(
                  (exportBanList, key) => (
                    <tr key={key}>
                      <th>{exportBanList.name}</th>
                      <td>
                        <ExportBanListDelete _id={exportBanList._id} />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Card>
        );
      }}
    </Query>
  );
}