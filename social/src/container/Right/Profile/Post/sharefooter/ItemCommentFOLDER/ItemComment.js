import React from 'react';
import c from './ItemComment.module.sass'
import { makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { fetchDeletComment } from '../../../../../../redux/sagas';
import noAvatar from './../../../../../../assets/img/noavatar.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        right: 0,
        fontSize: '0.9em',
        opacity: 0
    },
  }));

  

function Comment(props) {
    let classes = useStyles()

    let deleteCom = () => {
        let obj = {
            id: props.id,
            post: props.post 
        }
        props.deleteComment(obj)
        fetchDeletComment(props.id)

    }

    return (
            <div className={`${c.container} ${props.id}`}>
                <div className={c.avatar}>
                    <img src={ props.photo ? props.photo.image : noAvatar }></img>
                </div>
                <div className={c.name}>
                    <a className={c.name_link} href="#">{props.name}</a>
                    <div className={c.info}>{props.info}</div>
                    <div className={c.time}>{props.timePost}</div>
                </div>
                <ClearIcon onClick={deleteCom} className={classes.root}/>
            </div>
    );
}

export default Comment