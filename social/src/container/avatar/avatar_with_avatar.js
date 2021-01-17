import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';


const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.background.paper}`,
    },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: '8px',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function AvatarWithAvatar() {
    const classes = useStyles();

    return (
        <div className={classes.root} syles={{borderRadius:'2px'}}> 
            <Badge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                badgeContent={<SmallAvatar alt="Remy Sharp" src="https://sun9-26.userapi.com/agw6sWkxaeTKERInwFcehoFinaF9C0-L8jdJkw/KmPvMgFuUAA.jpg" />}
            >
                <Avatar  alt="Travis Howard" src="https://sun9-26.userapi.com/agw6sWkxaeTKERInwFcehoFinaF9C0-L8jdJkw/KmPvMgFuUAA.jpg" />
            </Badge>
        </div>
    );
}