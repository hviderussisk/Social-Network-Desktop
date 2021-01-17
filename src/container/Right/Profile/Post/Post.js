import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { watcherChangePostAC, watcherDeletePostAC } from '../../../../redux/profile-reducer';
import p from './Post.module.sass'
import ShareFooter from './sharefooter/sharefooter';
import noAvatar from './../../../../assets/img/noavatar.jpg'


function Post(props) {

  let dispatch = useDispatch()
  let textarea = React.createRef()
  let info = React.createRef()
  let change = React.createRef()
  let changeLabel = React.createRef()

  let [stateChange, setStateChange] = useState(props.massage)

  let deletePost = () => {
    let objDelete = {
      idPost: props.id,
      idLikes: props.likelist.map(el=> el.idLike) ,
      idComment: props.comment.map(el=> el.id) 
    }
    dispatch(watcherDeletePostAC(objDelete))
  }

  let textareaResize = () => {
    let tt = textarea.current
    let text = tt.value
    tt.style.height = 'auto'
    tt.style.height = tt.scrollHeight + 'px'
    setStateChange(text)
  }

  let changePost = () => {
    info.current.style.display = 'none'
    change.current.style.display = 'block'
    change.current.value = props.massage
    changeLabel.current.style.display = 'inline-block'
  }
  let backchangePost = (e) => {
    info.current.style.display = 'block'
    change.current.style.display = 'none'
    changeLabel.current.style.display = 'none'
    e.preventDefault()
  }
  let savechangePost = (e) => {
    info.current.style.display = 'block'
    change.current.style.display = 'none'
    changeLabel.current.style.display = 'none'
    const changeObj = {
      id: props.id,
      newText: stateChange
    }
    dispatch(watcherChangePostAC(changeObj))
    e.preventDefault()
  }
  if(props.myAccount){
  return (
    <div className={p.ui_block}>
      <div className={p.content}>
        <div className={p.author}>
          <div className={p.avatar}>
            <img src={ props.photo ? props.photo.image : noAvatar }></img>
          </div>
          <div className={p.name}>
            <div>
              <a className={p.name_link} href="#">{props.name}</a>
              <span className={p.changeLabel} ref={changeLabel}>редактирование записи</span>
            </div>
            <div className={p.time}>
              {props.timePost}
            </div>
          </div>
          <div className={p.more}>
          <div className={p.modalMore} >
              <div className={p.modal_item} onClick={changePost}><span>Редактировать</span></div>
              <div className={p.modal_item} onClick={deletePost}><span>Удалить</span></div>
            </div>
          </div>
        </div>
        <div className={p.info} ref={info}>
          {stateChange}
        </div>
        <div className={p.changePost} ref={change}>
          <form>
            <textarea value={stateChange} ref={textarea} onChange={textareaResize} name="text"></textarea>
                <div className={p.change_post_buttons}>
                  <button onClick={backchangePost} className={p.back_change_button}>Отмена</button>
                  <button onClick={savechangePost} className={p.done_change_button}>Сохранить</button>
                </div>
          </form>
        </div>
        <ShareFooter 
            photo={props.photo}
            postLike={props.postLike}
            liked={props.liked}
            post={props.postid}
            deleteComment={props.deleteComment}
            getDataComment={props.getDataComment}
            updateNewPostTextComment={props.updateNewPostTextComment} 
            id={props.id} 
            newLike={props.newLike} 
            likelist={props.likelist} 
            comment={props.comment} 
            share={props.share} 
            myid={props.myid}/>
      </div>
    </div>
  );}else{
    return (
      <div className={p.ui_block}>
        <div className={p.content}>
          <div className={p.author}>
            <div className={p.avatar}>
              <img src={ props.photo ? props.photo.image : noAvatar }></img>
            </div>
            <div className={p.name}>
              <div>
                <a className={p.name_link} href="#">{props.name}</a>
              </div>
              <div className={p.time}>
                {props.timePost}
              </div>
            </div>
          </div>
          <div className={p.info} ref={info}>
            {stateChange}
          </div>
          <ShareFooter 
              photo={props.photo}
              postLike={props.postLike}
              liked={props.liked}
              post={props.postid}
              deleteComment={props.deleteComment}
              getDataComment={props.getDataComment}
              updateNewPostTextComment={props.updateNewPostTextComment} 
              id={props.id} 
              newLike={props.newLike} 
              likelist={props.likelist} 
              comment={props.comment} 
              share={props.share} 
              myid={props.myid}/>
        </div>
      </div>
    );
  }
  
}


export default Post;

