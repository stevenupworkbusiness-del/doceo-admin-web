import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Category } from '@/models';

type CategoriesState = {
	list: Array<Category>
}


const initialState: CategoriesState = {
	list: []
};

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		updateCategories: (state, { payload }) => {
			return {
				...state,
				...payload
			}
		},
		addCategory: (state, { payload }) => {
			state.list = [
				...state.list,
				payload
			];
		},
		updateCategory: (state, { payload }) => {
			state.list = state.list.map((cat) => {
				if (cat.id === payload.id) {
					return payload;
				}
				return cat;
			})
		},
		deleteCategory: (state, { payload }) => {
			state.list = state.list.filter((cat) => cat.id !== payload);
		}
	}
});

export const selectCategories = (state: RootState) => (state.categories);

export const selectCategoriesList = createSelector(selectCategories, state => state.list);

export const selectOrderedCategoriesList = createSelector(selectCategoriesList, (list) => {
	const temp = [...list];
	temp.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
	return temp;
})

export const categoriesActions = categoriesSlice.actions;

export default categoriesSlice;