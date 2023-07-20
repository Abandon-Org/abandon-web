// src/pages/Dashboard.tsx
import { history } from 'umi';

const Staging: React.FC = () => {
    return (
        <div>
            <h1>工作台占位</h1>
            <button onClick={() => history.push('/access/HTTPrequest')}>Go to Staging</button>
        </div>
    );
};

export default Staging;
