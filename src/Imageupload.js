import React,{useState} from 'react';
import Uploadbutton from './Uploadbutton';



function ImageUpload() {
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
   $imagePreview = (<img src={imagePreviewUrl} alt="..." />);
   } else {
   $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
}
  
return (
        <div>
          

          <Uploadbutton click={previewimage}></Uploadbutton>
          <div className="imgPreview">
            {$imagePreview}
          </div>
         

        </div>
      )




}

export default ImageUpload;
