import Table from 'react-bootstrap/Table';

function BasicExample() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Device</th>
          <th>Timestamp</th>
		  <th>Values</th>

        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td> Controller_PV</td>
          <td>14:31:18</td>
          <td>10</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Controller_SV</td>
          <td>14:31:43</td>
          <td>2</td>
        </tr>
		<tr>
          <td>2</td>
          <td>Controller_PV</td>
          <td>14:32:08</td>
          <td>4</td>
        </tr>
		<tr>
          <td>2</td>
          <td>Controller_SV</td>
          <td>14:31:33</td>
          <td>32</td>
        </tr>
		<tr>
          <td>2</td>
          <td>Controller_PV</td>
          <td>14:31:58</td>
          <td>18</td>
        </tr>
		<tr>
          <td>2</td>
          <td>Controller_SV</td>
          <td>14:31:58</td>
          <td>18</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default BasicExample;