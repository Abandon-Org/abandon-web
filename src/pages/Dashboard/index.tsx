// src/pages/Dashboard.tsx
import { history } from 'umi';

const Dashboard: React.FC = () => {
    return (
        <div>
            <h1>看板占位</h1>
            <button onClick={() => history.push('/access/Dashboard')}>Go to Dashboard</button>
        </div>
    );
};

export default Dashboard;
