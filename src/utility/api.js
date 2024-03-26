import axios from "axios";


const clevAPI = axios.create({
    baseURL: "https://openaccess-api.clevelandart.org/api/artworks",
})

export const getArtworks = () => {
    return clevAPI
    .get(`?type=Painting&has_image=1`)
    .then(({data}) => {
        return data;
    })
    .catch((err) => console.log(err));
}

// const metAPI = axios.create({
//     baseURL: "https://collectionapi.metmuseum.org/public/collection/v1",
// })

// export const getArtworkIDs = () => {
//     return metAPI
//     .get(`/search?hasImages=true&q=painting`)
//     .then(({data}) => {
//         if(data.objectIDs.length > 2){
//             return data.objectIDs.slice(data.objectIDs.length - 2);
//         }else{
//             return data.objectIDs;
//         }
//     })
//     .catch((err) => console.log(err));
// }

// export const getArtworkArr = () => {
//     return getArtworkIDs().then((data) => {
//         return Promise.all(
//         data.map(objectID =>{
//             return metAPI
//             .get(`/objects/${objectID}`)
//             .then(({data}) => {
//                 return data;
//             })
//         }))
//     }) 
// }