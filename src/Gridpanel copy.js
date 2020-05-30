import React,{useState} from 'react';
import Uploadbutton from './Uploadbutton';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 120,
    width: 100,
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
                imagePreviewUrl: ''
            });
     
    const previewimage = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setuploadfilestate({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
        reader.readAsDataURL(file)
     } 

     let {imagePreviewUrl} = uploadfilestate;
     let $imagePreview = null;
     if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} width='100px' height='120px'  alt="..." />);
        } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
     }

     const handleChange = (event) => {
        setSpacing(Number(event.target.value));
    };

    return (
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
              {[0, 1, 2].map((value) => (
                <Grid key={value} item>
                  <Paper className={classes.paper} >
                        
                    <div className="imgPreview">
                      {$imagePreview}
                    </div>
    
                  </Paper> 
                  
                </Grid>
                
              ))}
              <Uploadbutton click={previewimage}></Uploadbutton>
            </Grid>
          </Grid>
          </Grid>
      );


}

export default Gridpanel;