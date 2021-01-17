import React from 'react';
import { 
    updateTextareaActionCreator,  
    updateTextareaCommentActionCreator, 
    getDataComment, 
    deleteCommentAC, 
    GetPostAC,
    postPostAC, 
    postLikeAC} from './../../../../redux/profile-reducer'
import PostList from './postlist';
import { connect } from 'react-redux';
import * as axios from 'axios'
import { withRouter } from 'react-router-dom';

class PostListCont extends React.Component{
    
    render(){
        return <PostList 
                    myAccount={this.props.myAccount}
                    myid={this.props.myid}
                    profileInfo={this.props.profileInfo}
                    postLike={this.props.postLike}
                    deleteComment={this.props.deleteComment}
                    addPost={this.props.addPost}
                    updateNewPostText={this.props.updateNewPostText} 
                    newPostText={this.props.newPostText} 
                    postData={this.props.postData}
                    newLike={this.props.newLike}
                    updateNewPostTextComment={this.props.updateNewPostTextComment}
                    getDataComment={this.props.getDataComment}
                    />
    }
}



let mapStateToProps = (state) => {
    return {
        newPostText: state.profilePage.newPostText,
        postData: state.profilePage.postData,
        profileInfo: state.profilePage.profileInfo,
        myid: state.profilePage.myid
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        getDataComment: (data) =>{
            dispatch(getDataComment(data))  
        },
        addPost: (data) => {
            dispatch(postPostAC(data))
        },
        updateNewPostText: (text) => {
            dispatch(updateTextareaActionCreator(text))
        },
        updateNewPostTextComment: (text) => {
            dispatch(updateTextareaCommentActionCreator(text))
        },
        deleteComment: (obj) => {
            dispatch(deleteCommentAC(obj))
        },
        postLike: (obj) => {
            dispatch(postLikeAC(obj))
        }
    }
}
let WithRouterPostListCont = withRouter(PostListCont)
let PostListContainer = connect(mapStateToProps,mapDispatchToProps)(WithRouterPostListCont)
export default PostListContainer;
