import { connect } from 'react-redux';
import { updateTextareaCommentActionCreator,postData, postCommentAC } from '../../../../../../redux/profile-reducer';
import AddComment from './addcomment';

let mapStateToProps = (state) => {
    return {
        textComment: state.profilePage.newPostTextComment,
        postData: state.profilePage.postData
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        postComment: (data) => {
            dispatch(postCommentAC(data))
        },
        updateNewPostTextComment: (text) => {
            let action = updateTextareaCommentActionCreator(text)
            dispatch(action)
        }
    }
}

let AddCommentContainer = connect(mapStateToProps,mapDispatchToProps)(AddComment)
export default AddCommentContainer;