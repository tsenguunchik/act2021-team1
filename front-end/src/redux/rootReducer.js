import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import userReducer from './slices/user';
import mentorReducer from './slices/mentor';
import essayReducer from './slices/essay';
import notificationReducer from './slices/notification';

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
  mentor: mentorReducer,
  essay: essayReducer,
  notification: notificationReducer
});

export { rootPersistConfig, rootReducer };
