import React, { useState } from 'react';
import p from './sharefooter.module.sass'
import AddCommentContainer from './ADDCOMMENT/addcommentCONTAINER'
import Comment from './ItemCommentFOLDER/ItemComment';


function ShareFooter(props) {
    let funLike = () => {
        let obj = {
            idUser: props.myid,
            id: props.post,
            idPost: props.id
        }
        countAddLike ? addLike(false) :  addLike(true)
        props.postLike(obj)
    }
    let [countAddComment, addComment] = useState(false)
    let [countAddLike, addLike] = useState(props.liked)
    let addCommentClick = () => {
        countAddComment ? addComment(false) :  addComment(true)
    }
    let commentList = props.comment.map((el, i)=><Comment deleteComment={props.deleteComment} id={el.id} key={el._id} post={props.post} name={el.name} timePost={el.timePost} info={el.info}></Comment>)
    return (
        <>
            <div className={ props.comment.length === 0 ? p.share : p.share+' '+p.sharePadding }>
                <div className={p.iconshare}>
                    <button title="Нравится" onClick={funLike}>
                        <div className={countAddLike ? p.active+' '+p.like_button : p.like_button}></div>
                        <div className={props.likelist.length===0? p.count+' '+p.none : p.count }>{props.likelist.length}</div>
                    </button>
                    <button title="Комментарий" onClick={addCommentClick}>
                        <div className={countAddComment? p.active+' '+p.comment_button : p.comment_button}></div>
                        <div className={props.comment.length===0? p.count+' '+p.none : p.count }>{props.comment.length}</div>
                    </button>
                    <button title="Поделиться">
                        <div className={p.share_button}></div>
                        <div className={props.share.length===0? p.count+' '+p.none : p.count }>{props.share.length}</div>
                    </button>
                    <div className={p.views}><div className={p.iconviews}>0</div></div>
                </div>
               
            </div>
            <div className={p.commentList}>
                {commentList}
            </div>
            {!countAddComment ? <></> : <AddCommentContainer post={props.post} updateNewPostTextComment={props.updateNewPostTextComment}/>}
        </>

    );
}

export default ShareFooter