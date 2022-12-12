import { applyMiddleware, compose, configureStore } from '@reduxjs/toolkit'
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: {
        expenses: expensesReducer,
        filters: filtersReducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware ({
        serializableCheck: false
    }),
    enhancers: [compose(applyMiddleware(thunk))]
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
