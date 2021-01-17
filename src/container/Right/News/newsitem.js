import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import c from './newsitem.module.sass'
import ShareFooter from '../Profile/Post/sharefooter/sharefooter'

export default function NewsItem(props) {
  return (
    <Card className={c.newsitem}>
      <CardHeader
        avatar={
          <Avatar aria-label="Lenta">
            L
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader={props.data}
      />
      <CardMedia className={c.img}
        image={props.img}
        title={props.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>
      {/* <ShareFooter  id={props.id} newLike={props.newLike} /> */}
    </Card>
  )
}