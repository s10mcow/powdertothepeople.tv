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
        url: 'arrifana',
        name: 'Arrifana'
    }
};

export const deleteCamera = (camera) => {
   return {
       type: 'DELETE_CAMERA',
       camera
   }
};
