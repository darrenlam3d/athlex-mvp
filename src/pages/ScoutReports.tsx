
// Since we're removing scout functionality, we'll create a Not Found page
import { Navigate } from 'react-router-dom';

const ScoutReports = () => {
  return <Navigate to="/404" replace />;
};

export default ScoutReports;
