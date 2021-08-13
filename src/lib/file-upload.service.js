import * as axios from 'axios';

const BASE_URL = 'http://178.128.105.21:5000';

function upload(formData) {
    console.log('asd')
    const url = `${BASE_URL}/predict`;
    return axios.post(url, formData)
        // get data
        .then(x => x.data);
        // add url field
        // .then(x => {
        //     console.log(img)
        //     x.map(img => Object.assign({},
        //         img, { url: img.data.url }))
        // });
}

export { upload }