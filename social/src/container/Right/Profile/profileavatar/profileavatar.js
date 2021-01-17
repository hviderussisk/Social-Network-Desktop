import { Button, makeStyles } from '@material-ui/core';
import React, { useState , useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { uploadAvatarAC, watcherDeletePhotoAC, Watcher_miniatureAC } from '../../../../redux/profile-reducer';
import p from './profileavatar.module.sass';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import noAvatar from './../../../../assets/img/noavatar.jpg'
import ClearIcon from '@material-ui/icons/Clear';
import CreateIcon from '@material-ui/icons/Create';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

let useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    color: '#2787f5',
    backgroundColor: '#e8e8e8',
    textTransform: 'inherit',
    fontFamily: 'inherit',
    width: '100%',
    marginTop: '14px',
    letterSpacing: '0px',
    fontSize: '13px',
    fontWeight: 400,
    '&:hover': {
      boxShadow: 'none',
      backgroundColor: '#d0d0d0',
    },
    '&:focus': {
      boxShadow: 'none',
      backgroundColor: '#d0d0d0',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#d0d0d0',
    }
  },
}))



function ProfileAvatar(props) {
  const dispatch = useDispatch()

  let uploadAvatar = e => {
    if (e.target.files[0].length !== 0) {
      let base64 = new FileReader()
      base64.readAsDataURL(e.target.files[0])
      base64.onload = () => {
        let imgObj = {
          'image': base64.result
        }
        dispatch(uploadAvatarAC(imgObj))
      }
    }
  }
  let deletePhoto = e => {
    dispatch(watcherDeletePhotoAC())
  }
  let classes = useStyles()
  let [modalCountAvatar, setCountModalAvatar] = useState(false)
  let modalAvatar = () => {
      setCountModalAvatar(true)
  }
  let noneModal = () => {
    setCountModalAvatar(false)
  }
  if (props.myAccount) {
    return <div className={p.profile_left + ' ' + p.ui_block}>
      {modalCountAvatar ? <ModalContentAvatar noneModal={noneModal} photo={props.photo}/> : <></>}
      <div className={p.profile_avatar}>
        <img src={props.photo ? props.photo.image : noAvatar}/>
        <div className={props.photo ? p.setting_avatar : p.delete_noavatar_item}>
          <div className={p.setting_avatar_item} onClick={modalAvatar}><span>Изменить миниатюру</span></div>
        </div>
        <div className={props.photo ? p.delete_avatar_item : p.delete_noavatar_item} onClick={deletePhoto}><ClearIcon /></div>
      </div>
      <form method="post" action="/" >
        <label htmlFor="upload-photo">
          <input style={{ display: "none" }} id="upload-photo" name="upload-photo" type="file" encType="multipart/form-data" onChange={uploadAvatar} />
          <Button className={classes.root} color="secondary" variant="contained" component="span"><PhotoCameraIcon style={{ margin: '2px 5px 0px 0px', fontSize: '1rem' }} /> {props.photo ? 'Изменить фото' : 'Загрузить фото'} </Button>
        </label>
      </form>
    </div>
  } else {
    return <div className={p.profile_left + ' ' + p.ui_block}>
      <div className={p.profile_avatar}>
        <img src={props.photo ? props.photo.image : noAvatar}/>
      </div>
        <Button className={classes.root} style={{backgroundColor:'#2787f5', color: 'white'}} color="secondary" variant="contained" component="span"><CreateIcon style={{ margin: '2px 5px 0px 0px', fontSize: '1rem' }} /> Написать </Button>
    </div>
  }


}


let ModalContentAvatar = (props) => {
  let area = React.createRef()
  let preview_mini = React.createRef()
  let preview = React.createRef()
  let cropper = null
  const dispatch = useDispatch()
  useEffect(()=>{
    cropper = new Cropper(area.current, {
      aspectRatio: 1/1,
      autoCrop: true,
      viewMode: 2,
      modal: true,
      guides: false,
      minContainerHeight: 0,
      minContainerWidth: 0,
      minCropBoxWidth: 100,
      scalable: false,
      zoomable: false,
      rotatable: false,
      preview:  [ preview.current , preview_mini.current ]
    });
  }, [])
  let crop = () => {
    cropper.getCroppedCanvas({
      width: 160,
      height: 90,
      minWidth: 256,
      minHeight: 256,
      maxWidth: 4096,
      maxHeight: 4096,
      fillColor: '#fff',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high',
    }).toBlob((blob) => {
      let base64 = new FileReader()
      base64.readAsDataURL(blob)
      base64.onload = () => {
        let imgObj = {
          'image': base64.result
        }
        dispatch(Watcher_miniatureAC(imgObj))
        props.noneModal()
      }
    })
    
  }
  // let [ coordinatsXY, setCoordinatsXY ] = useState([0,0,0])
  // let flagPress = false
  // let flagMove = false
  


  // function startDrag(e) {
  //   let posX = e.clientX, 
  //       posY = e.clientY
  //   let positionParent = e.currentTarget.offsetParent.getBoundingClientRect()
  //   let elem = e.currentTarget
  //   class Limits {
  //     constructor(options){
  //         this.top = options.top
  //         this.right = options.right
  //         this.bottom = options.bottom
  //         this.left = options.left
  //         this.x = options.x 
  //         this.y = options.y
  //         this.coordsleft = 0
  //         this.coordstop = 0
  //     }  
  //     set start(options) {
  //         this.startX = options.x 
  //         this.startY = options.y
  //     }
  //     set coords(options) {
  //       this.x = options.x - elem.offsetLeft
  //       this.y = options.y - elem.offsetTop
  //       if(this.x < this.left) return
  //       if(this.x > this.left) this.coordsleft = this.x - this.startX 
  //       if(this.y < this.top) return
  //       if(this.y > this.top) this.coordsTop = this.y - this.startY 
  //     }
  //   }
  //   window.onmousemove = (e) => {
  //       const a = new Limits({
  //           top: positionParent.top,
  //           right: positionParent.right,
  //           bottom: positionParent.bottom,
  //           left: positionParent.left,
  //       })
  //       a.start = { x : posX , y : posY }
  //       a.coords = { x : e.clientX , y : e.clientY }
  //       console.log(a)
  //       elem.style.left = a.coordsleft + 'px'
  //   }
  // }
  //   //e.currentTarget.style.left = 
  // }
  // function startDrag(e) {
  //     flagPress = true
  //     let [posMouseMoveX, posMouseMoveY, countDrag] = coordinatsXY
  //     let coordss =  e.currentTarget.getBoundingClientRect()
  //     let coords =  e.currentTarget.getBoundingClientRect()
  //     let parent = e.currentTarget.offsetParent.getBoundingClientRect()
  //     let elem = e.currentTarget
  //     let posX = e.clientX,
  //         posY = e.clientY 
  //     elem.onmousedown = function(e) {
  //       flagPress = true
  //     }
  //     document.onmouseup = function() {
  //       flagPress = false
  //     }
  //     // document.onmousemove =  
  //     function movee(e) {
  //           if (flagPress ) {
  //             coords = elem.getBoundingClientRect()
  //             move(e)
  //           } 
  //     } 
  //     document.addEventListener('onmousemove', movee)
      

  //     var limits = {
  //         top: parent.top,
  //         right: parent.right,
  //         bottom: parent.bottom,
  //         left: parent.left
  //     }


  //     function move(e) {
  //       var newLocation = {
  //           x: 0,
  //           y: 0
  //       };
  //       console.log(coords.left, limits.left)
  //       if ( countDrag !== 0 ) {
  //             if (coords.right <= limits.right && coords.left >= limits.left){
  //                 document.addEventListener('onmousemove',movee)
  //                 newLocation.x = Number(posMouseMoveX) + e.clientX - posX
  //             } else if (coords.right > limits.right) {
  //                 newLocation.x = limits.right-coordss.left-coords.width
  //                 document.onmousemove = null
  //             } else if (coords.left < limits.left) {
  //                 newLocation.x = 0
  //                 document.onmousemove = null
  //             }
  //             if (coords.bottom <= limits.bottom && coords.top >= limits.top){
  //                 document.addEventListener('onmousemove',movee)
  //                 newLocation.y = Number(posMouseMoveY) + e.clientY - posY
  //             } else if (coords.bottom > limits.bottom) {
  //                 newLocation.y = limits.bottom-coordss.top-coords.width
  //                 document.onmousemove = null
  //             } else if (coords.top < limits.top) {
  //                 newLocation.y = 0
  //                 document.onmousemove = null
  //             }
  //       } else {
  //           if (coords.right <= limits.right && coords.left >= limits.left){
  //               document.addEventListener('onmousemove',movee)
  //               newLocation.x = e.clientX - posX
  //           } else if (coords.right > limits.right) {
  //               newLocation.x = limits.right-coordss.left-coords.width
  //               document.onmousemove = null
  //           } else if (coords.left < limits.left) {
  //               newLocation.x = 0
  //               document.onmousemove = null
  //           }
  //           if (coords.bottom <= limits.bottom && coords.top >= limits.top){
  //               document.addEventListener('onmousemove',movee)
  //               newLocation.y = e.clientY - posY
  //           } else if (coords.bottom > limits.bottom) {
  //               newLocation.y = limits.bottom-coordss.top-coords.width
  //               document.onmousemove = null
  //           } else if (coords.top < limits.top) {
  //               newLocation.y = 0
  //               document.onmousemove = null
  //           }
  //       }
  //       relocate(newLocation);
  //     }

  //     function relocate(newLocation) {
  //         elem.style.left = newLocation.x + 'px';
  //         elem.style.top = newLocation.y + 'px';
  //         let savePositionX = elem.style.left.replace('px','')
  //         let savePositionY = elem.style.top.replace('px','')
  //         setCoordinatsXY([savePositionX, savePositionY, countDrag + 1])
  //     }
  // }

  return (
    <div className={p.modalAvatar}>
        <div className={p.modalAvatarContent}>
          <div className={p.titleModalAvatar}>
            <h3>Выбор миниатюры</h3>
            <div className={p.noneMod} onClick={props.noneModal}><ClearIcon/></div>
          </div>
          <div className={p.owner}>
            <div className={p.description}>
                              Выберите область для маленьких фотографий.<br/>
                  Выбранная миниатюра будет использоваться в новостях, личных сообщениях и комментариях.
            </div>
            <div className={p.dragArea} >
              <div>
                <img  ref={area} src={props.photo ? props.photo.image : noAvatar}/>
              </div>
              <div className={p.prew}>
                <div ref={preview} className={p.preview}></div>
                <div ref={preview_mini} className={p.preview_mini}></div>
              </div>
            </div>
            <div className={p.button}>
              <button  onClick={crop}>Сохранить</button>
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default ProfileAvatar;