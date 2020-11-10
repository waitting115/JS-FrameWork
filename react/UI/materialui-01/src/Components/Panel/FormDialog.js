import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function FormDialog({getInputData, open, handleClose }) {
  
  const [inputData, setInputData] = React.useState({
    title: '',
    detail: '',
    MainData: ''
  });
  // const [editorId, setEditorId] = React.useState(0);

  const submitData = () => {
    let TF = Object.keys(inputData).every((v, i) => (
      inputData[v] !== ''
    ))
    if(TF) {
      handleClose(false)
      getInputData(inputData);
      setInputData({
        title: '',
        detail: '',
        MainData: ''
      })
    } else {
      alert('Please perfect your form')
    }
  }


  const getData = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    })
  }

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 320,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
  
  const classes = useStyles();

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">输入新的数据</DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            required
            margin="dense"
            name="title"
            label="项目Title"
            type="text"
            fullWidth
            value={inputData.title}
            onChange={getData}
            />
            <TextField
            required
            margin="dense"
            name="detail"
            label="项目明细"
            type="text"
            fullWidth
            value={inputData.detail}
            onChange={getData}
            />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">项目名</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={inputData.MainData}
              name="MainData"
              onChange={getData}
            >
              <MenuItem value="项目一" id="MainData">项目一</MenuItem>
              <MenuItem value="项目二" id="MainData">项目二</MenuItem>
              <MenuItem value="项目三" id="MainData">项目三</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitData} color="primary">
            提交
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}