import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import cameras from './cameras'

const webcams = combineReducers({
    visibilityFilter,
    cameras
});

export default webcams
