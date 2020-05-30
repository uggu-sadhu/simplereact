import React from 'react';

const Multiupload =(props) =>  {
const [fileupload, setfileupload] = useState([]);

const addfile = (e) =>{
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
        setfileupload (
            [...fileupload , {
                 file: file,
                 imagePreviewUrl: reader.result,
                 filename: ''
            }
            ]
        );
    }
    reader.readAsDataURL(file)
} 
   



}

export default Gridpanel;