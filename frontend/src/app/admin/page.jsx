'use client';

import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <div>
      Hello { userInfo.email }
    </div>
  );
};

export default AdminDashboard;
