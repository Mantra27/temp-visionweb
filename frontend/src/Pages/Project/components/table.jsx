import Table from 'react-bootstrap/Table';

function StripedRowExample() {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Header Name</th>
          <th>Time</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Controller1_pv</td>
          <td>14:31:18</td>
          <td>32.2</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Controller1_pv</td>
          <td>14:31:43</td>
          <td>31.3</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Controller1_pv</td>
          <td>14:32:08</td>
          <td>32.1</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Controller1_pv</td>
          <td>14:31:33</td>
          <td>31.7</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Controller1_pv</td>
          <td>14:31:58</td>
          <td>32</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Controller1_pv</td>
          <td>14:32:23</td>
          <td>31.8</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default StripedRowExample;