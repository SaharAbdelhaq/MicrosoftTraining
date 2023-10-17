import React from 'react';

import ImageUploader from './component/index.js';

// const steps = {
//     one: `npm install --save react-images-upload`,
//     two: `import React from 'react';
// import ImageUploader from 'react-images-upload';

// class App extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = { pictures: [] };
//         this.onDrop = this.onDrop.bind(this);
//     }

//     onDrop(pictureFiles, pictureDataURLs) {
//         this.setState({
//             pictures: pictureFiles
//         });
//     }

//     render() {
//         return (
//             <ImageUploader
//                 withIcon={true}
//                 buttonText='Choose images'
//                 onChange={this.onDrop}
//                 imgExtension={['.jpg', '.gif', '.png', '.gif']}
//                 maxFileSize={5242880}
//             />
//         );
//     }
// }`
// }


export default class ProductImage extends React.PureComponent {
    render() {
        return (
            <div className="page">
                <div className="head"></div>
                <ImageUploader style={{ maxWidth: '500px', margin: "20px auto", marginLeft:"30" }}
                               withPreview={true} />
            </div>
        );
    }
}
