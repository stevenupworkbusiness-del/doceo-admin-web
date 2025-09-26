import { Tag } from '@/types';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

type TagsState = {
	list: Array<Tag>
}


const initialState: TagsState = {
	list: []
};

const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	reducers: {
		updateTags: (state, { payload }) => {
			return {
				...state,
				...payload
			}
		},
		addTag: (state, { payload }) => {
			state.list = [
				...state.list,
				payload
			];
		},
		updateTag: (state, { payload }) => {
			state.list = state.list.map((tag) => {
				if ( tag.id === payload.id ) {
					return payload;
				}
				return tag;
			})
		},
		deleteTag: (state, {payload}) => {
			state.list = state.list.filter((tag) => tag.id !== payload);
		}
	}
});

export const selectTags =  (state: RootState) => (state.tags);

export const selectTagsList = createSelector(selectTags, state => state.list);

export const tagsActions = tagsSlice.actions;

export default tagsSlice;