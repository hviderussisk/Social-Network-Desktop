import React, { useState } from 'react';
import Post from '../Post/Post';
import c from './postlist.module.sass'

function PostList(props) {
  let [countNewPost, setCountNewPost] = useState(false)
  let textarea = React.createRef()

  let textareaResize = () => {
    let tt = textarea.current
    let text = tt.value
    tt.style.height = 'auto'
    tt.style.height = tt.scrollHeight + 'px'
    props.updateNewPostText(text)
  }

  let publicPost = (e) => {
    let date = new Date()
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    let obj = {
      idUser: props.myid,
      whomIdUser: props.profileInfo.id,
      name:`${props.profileInfo.name} ${props.profileInfo.lastname}`,
      timePost: date.toLocaleString('ru', options),
      info: textarea.current.value,
      likeList: [],
      liked: false,
      comment: [],
      share: []
    }
    props.addPost(obj)
    props.updateNewPostText('')
    e.preventDefault()
  }
  let PostElements = props.postData.map((d, i) =>
    <Post
      myAccount={props.myAccount}
      photo={props.profileInfo.photo}
      postLike={props.postLike}
      liked={d.liked}
      postid={d.id}
      deleteComment={props.deleteComment}
      getDataComment={props.getDataComment}
      key={d.id}
      updateNewPostTextComment={props.updateNewPostTextComment}
      share={d.share}
      comment={d.comment}
      likelist={d.likeList}
      massage={d.info}
      newLike={props.newLike}
      id={d.id}
      timePost={d.timePost}
      name={d.name} 
      myid={props.myid}
      lastname={d.lastname}/>)


  

  let openPanel = (e) => {
    if (!countNewPost && e.type === 'click') {
      setCountNewPost(true)
      e.currentTarget.lastChild.style.display = 'flex'
    } else if (countNewPost && e.type === 'blur' && props.newPostText.length === 0) {
      setCountNewPost(false)
      e.currentTarget.lastChild.style.display = 'none'
    }
    if(e.target.localName === 'button'){
      e.currentTarget.lastChild.style.display = 'none'
    }
  }

  const error = () => alert('Функция ещё не работает.')
  if(props.myAccount){
    return (
      <div className={c.container_middle} >
        <div className={c.ui_block}>
          <div className={c.new_post}>
            <form method="post" action="/addpost" onClick={openPanel} onBlur={openPanel} >
              <div className={c.row}>
                <textarea value={props.newPostText}
                  className={c.writepost}
                  ref={textarea}
                  onChange={textareaResize}
                  placeholder='Что у Вас нового?'
                  name="text">
                </textarea>
              </div>
              <div className={c.panel}>
                <div className={c.attachPhoto} onClick={error}></div>
                <button type="submit" onClick={publicPost}>Опубликовать</button>
              </div>
            </form>
          </div>
        </div>
        <div className={c.list}>
          {props.postData.length === 0 ? <div className={c.noData}><span>Нету записей</span></div> : PostElements }
        </div>
      </div>
    );
  }else{
    return (
      <div className={c.container_middle} >
        <div className={c.ui_block}>
          <div className={c.new_post}>
            <form method="post" action="/addpost" onClick={openPanel} onBlur={openPanel} >
              <div className={c.row}>
                <textarea value={props.newPostText}
                  className={c.writepost}
                  ref={textarea}
                  onChange={textareaResize}
                  placeholder='Напишите что-нибудь на стене у своего друга.'
                  name="text">
                </textarea>
              </div>
              <div className={c.panel}>
                <div className={c.attachPhoto} onClick={error}></div>
                <button type="submit" onClick={publicPost}>Опубликовать</button>
              </div>
            </form>
          </div>
        </div>
        <div className={c.list}>
          {props.postData.length === 0 ? <div className={c.noData}><span>Нету записей</span></div> : PostElements }
        </div>
      </div>
    );
  }
  
}

export default PostList;