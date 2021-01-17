import React from 'react';
import p from './addcomment.module.sass'
import noAvatar from './../../../../../../assets/img/noavatar.jpg'


function AddComment(props) {
    
    let textarea = React.createRef()

    let textareaResize = () => {
        let tt = textarea.current
        let text = tt.value
        tt.style.height = 'auto'
        tt.style.height = '30px'
        tt.style.height = tt.scrollHeight + 'px'
        props.updateNewPostTextComment(text)
    }

    let publicComment = (e) => {

        let info = textarea.current.value

        var date = new Date();
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
            idUser: 1,
            name: 'Ilya Myshko',
            timePost: date.toLocaleString('ru',options), 
            info:info,
            idPost: props.post
        }
        props.postComment(obj)
        e.preventDefault()
    }
    return (
        <>
            <div className={p.commentblock}>
                <a className={p.linkavatar} href="">
                    <img className={p.avatar} src={ props.photo ? props.photo.image : noAvatar } alt=""></img>
                </a>
                <form method="post" action="/addcomment">
                  <textarea 
                    placeholder='Написать комментарий...'
                    name="text"
                    ref={textarea}
                    onChange={textareaResize}
                    value={props.textComment}>
                  </textarea>
                  <button type="submit" onClick={publicComment}>Опубликовать</button>
                </form>
            </div>
        </>

    );
}

export default AddComment;