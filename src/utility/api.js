import axios from "axios";

const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;


const clevAPI = axios.create({
    baseURL: "https://openaccess-api.clevelandart.org/api/artworks",
})

const harvAPI = axios.create({
    baseURL: `https://api.harvardartmuseums.org`,
})

export const getArtworks = () => {
    return clevAPI
        .get(`?type=Painting&has_image=1`)
        .then(({ data }) => {
            return data;
        })
        .catch((err) => console.log(err));
}

export const getSearchedArtworks = (keySearch) => {
    return clevAPI
        .get(`?q=${keySearch}&has_image=1&type=Painting`)
        .then(({ data }) => {
            return data;
        })
        .catch((err) => console.log(err));
}

export const getSculptureData = () => {
    return harvAPI
        .get(`/object?classification=Sculpture&apikey=${apiKey}&size=100`)
        .then(sculptureResponse => {
            if (sculptureResponse.data.records) {
                const sculptures = sculptureResponse.data.records;

                return Promise.all(sculptures.map(sculpture => {
                    if (sculpture.primaryimageurl) {
                        return axios.get(sculpture.primaryimageurl)
                            .then(imageResponse => {
                                sculpture.image = imageResponse.data
                                return sculpture;
                            });
                    } else {
                        return null;
                    }
                }))
                .then(filteredSculptures => filteredSculptures.filter(sculpture => sculpture !== null)); 
            }
        })
        .catch((err)=> console.log(err));

}