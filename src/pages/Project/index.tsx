// src/pages/Dashboard.tsx
import { history } from 'umi';

const Project: React.FC = () => {
    return (
        <div>
            <h1>占位</h1>
            <button onClick={() => history.push('/project')}>Go to Staging</button>
        </div>
    );
};

export default Project;
