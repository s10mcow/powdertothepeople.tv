export const setVisibilityFilter = filter => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
};

export const setNewCamera = (camera) => {
    return {
        type: 'SET_NEW_CAMERA',
        camera
    }
};

export const addNewCamera = () => {
    return {
        type: 'ADD_NEW_CAMERA',
        url: 'https://cams.cdn-surfline.com/wsc-east/pt-arrifanacam.stream/chunklist.m3u8',
        name: 'Arrifana 2'
    }
};

export const deleteCamera = (camera) => {
   return {
       type: 'DELETE_CAMERA',
       camera
   }
};
