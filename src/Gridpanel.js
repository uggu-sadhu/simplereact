import React,{useState} from 'react';
import Uploadbutton from './Uploadbutton';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { isWidthDown } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  paper: {
    height: 70,
    width: 70,
    fontSize: '12px',
    justifyContent: 'flex-end',
  },
  image: {
    width: 70,
    height: 70,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  control: {
    padding: theme.spacing(2),
  },
}));



const Gridpanel =(props) =>  {
    
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();
  
    const [uploadfilestate,setuploadfilestate] = useState({
                file: '',
                imagePreviewUrl: '',
                filename: ''
            });
     
    const previewimage = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        let filename = file.name;
         console.log(filename);
        reader.onloadend = () => {
            setuploadfilestate({
            file: file,
            imagePreviewUrl: reader.result,
            filename : filename
          });
        }
        reader.readAsDataURL(file)
     } 
     
     let filename = uploadfilestate.filename;
     let {imagePreviewUrl} = uploadfilestate;
     let $imagePreview = null;
     if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} className={classes.image}  alt="..." />);
        } else {
        $imagePreview = ('Select File');
     }

     const handleChange = (event) => {
        setSpacing(Number(event.target.value));
    };

    return (
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
               <Grid container justify="center" spacing={spacing}>
                <Grid item >
                  <Paper className={classes.paper} >
                      {$imagePreview}
                  </Paper> 
                </Grid>
              <Uploadbutton click={previewimage}></Uploadbutton>
            </Grid>
            {filename}
          </Grid>
          </Grid>
      );


}

export default Gridpanel;