import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import avatarDefoult from '../../assets/img/avatar.jpg'

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            content: '""'
        }
    }
})) (Badge);


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function AvatarState(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <StyledBadge
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot"
            >
                <Avatar alt={props.name} src={ props.photo != null ? props.photo.image : "/broken-image.jpg" } />
            </StyledBadge>
        </div>
    );
}