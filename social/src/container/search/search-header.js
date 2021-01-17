import React from 'react';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        color: "white",
      },
      before : {
        borderColor: "rgba(255,255,255,0.42)"
      }
    },
  }));

export default function SearchHeader() {
  return (
    <form noValidate autoComplete="off">
      <Input className={useStyles().root} placeholder="Placeholder" inputProps={{ 'aria-label': 'description' }} />
    </form>
  );
}