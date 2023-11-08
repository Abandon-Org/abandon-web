import React from 'react';
import { Avatar, Tooltip } from "antd";

interface UserLinkProps {
    user: {
        id: number;
        name: string;
        deleted_at: string | null;
        avatar: string | null;
    } | undefined;
    size?: number;
    marginLeft?: number;
}

const UserLink: React.FC<UserLinkProps> = ({ user, size = 24, marginLeft = 6 }) => {
    if (user === undefined) {
        return <Avatar size={size} alt="avatar" />;
    }

    return (
        <>
            {/*<Avatar size={size} className={styles.avatar} src={user.avatar || CONFIG.AVATAR_URL} alt="avatar" />*/}
            <Tooltip title="点击可查看用户资料">
                {user.deleted_at ? (
                    <del>
                        <a style={{ marginLeft, fontSize: 13, color: "#ccc" }} href={`/#/member/${user.id}`} rel="noreferrer">
                            {user.name}
                        </a>
                    </del>
                ) : (
                    <a
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        style={{ marginLeft, fontSize: 13, verticalAlign: 'middle' }}
                        href={`/#/member/${user.id}`}
                        rel="noreferrer"
                    >
                        {user.name}
                    </a>
                )}
            </Tooltip>
        </>
    );
};

export default UserLink;
