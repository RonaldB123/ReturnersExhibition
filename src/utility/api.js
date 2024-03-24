import axios from "axios";

const metAPI = axios.create({
    baseURL: "https://collectionapi.metmuseum.org/public/collection/v1",
})

export const getArtworkIDs = () => {
    return metAPI
    .get(`/search?hasImages=true&q=painting`)
    .then(({data}) => {
        if(data.objectIDs.length > 2){
            return data.objectIDs.slice(data.objectIDs.length - 2);
        }else{
            return data.objectIDs;
        }
    })
    .catch((err) => console.log(err));
}

export const getArtworkArr = () => {
    return getArtworkIDs().then((data) => {
        return Promise.all(
        data.map(objectID =>{
            return metAPI
            .get(`/objects/${objectID}`)
            .then(({data}) => {
                return data;
            })
        }))
    }) 
}