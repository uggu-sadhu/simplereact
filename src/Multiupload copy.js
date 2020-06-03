import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DeleteIcon from '@material-ui/icons/Delete';
import docx from './Docx.png';
import pdf from './pdf.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'none',
  },
  paper: {
    height: 70,
    width: 70,
    fontSize: '12px',
  },
  image: {
    width: 70,
    height: 70,
  },
}));

const Multiupload = (props) => {

  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  const [fileupload, setfileupload] = useState([]);
  const [addchck, setaddchk] = useState(true);
  
  const addemptyfile = () => {
    setaddchk(true);
  }

  const addfile = (fileindx, ddd, event) => {
    console.log("1111111111111");
    console.log("22222222222222");

    console.log(fileindx);
    console.log(ddd);
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    let filename = file.name;
    let fileextension = filename.split('.').pop();
    let imagePreview;
    let fileoverride = [];
    let newfile;
    let checkreupload = false;
    let uploadinput = "uploadinput".concat(filename);
    let deleteinput = "deleteinput".concat(filename);

    reader.onloadend = () => {
      imagePreview = reader.result;
      if (fileextension === 'docx' || fileextension === 'doc') {
        imagePreview = docx;
      }
      if (fileextension === 'pdf') {
        imagePreview = pdf;
      }

      if ("newfile" != fileindx) {
        // Second Time  reupload
        fileupload.forEach(element => {
          console.log("outside");
          newfile = element;
          console.log(element.id);
          console.log(fileindx)
          if (element.id === fileindx) {
            console.log("inside");
            console.log(element.id);
            console.log(fileindx)
            newfile = {
              file: file,
              imagePreviewUrl: reader.result,
              id: file.name,
              chk: true,
              extension: fileextension,
              src: imagePreview,
              uploadinput: uploadinput,
              deleteinput: deleteinput

            }
            checkreupload = true;
          }
          fileoverride.push(newfile);
        });
      }


      fileoverride.forEach(element => {
        console.log("final");
        console.log(element.id);
      });
      // First Time or new File upload
      if (!checkreupload) {
        newfile = {
          file: file,
          imagePreviewUrl: reader.result,
          id: file.name,
          chk: true,
          extension: fileextension,
          src: imagePreview,
          uploadinput: uploadinput,
          deleteinput: deleteinput
        }
        fileoverride = [...fileupload];
        fileoverride.push(newfile);
      }

      setfileupload(fileoverride);

    }
    reader.readAsDataURL(file);
    setaddchk(false);
    checkreupload = false;
  }




  const deletefile = (fileindex) => {
    const files = [...fileupload];
    files.splice(fileindex, 1);
    setfileupload(files);
  }



  return (
    <React.Fragment>
      <Grid container item  spacing={3}>
        {fileupload.map((value) => (
              <Grid item key={value.id}  >
                  <Paper className={classes.paper} >
                    {value.imagePreviewUrl !== '' &&
                      <img src={value.src} className={classes.image} alt="..." />
                    }
                  </Paper>
                  <input accept="image/*, .doc, .docx,.pdf" onChange={(e) => addfile(value.id, value.uploadinput,  e)} className={classes.input} id="{value.uploadinput}" type="file" />
                  <label htmlFor="{value.uploadinput}">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>



                  < IconButton color="primary" aria-label="delete picture" component="span" >
                    <DeleteIcon />
                  </IconButton>
                  {value.chk &&
                    < IconButton color="primary" aria-label="add picture" component="span" onClick={addemptyfile}  >
                      <AddIcon />
                    </IconButton>
                  }
                  {value.id}
              
             </Grid>

          
        ))}
       
   
        {addchck &&

            <Grid item >
              <Paper className={classes.paper} >
                <div className="previewText">Select File</div>
              </Paper>

              <input accept="image/*,.doc, .docx,.pdf" onChange={(e) => addfile("newfile", "hai", e)} className={classes.input} id="icon-button-file-first" type="file" />
              <label htmlFor="icon-button-file-first">
                <IconButton color="primary" aria-label="upload picture" component="span" >
                  <PhotoCamera />
                </IconButton>
              </label>
            </Grid>
         
        }
      </Grid>
    </React.Fragment>
  )




}

export default Multiupload;