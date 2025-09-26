import { ChannelDetail } from '@/types';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Payload, RootState } from '.';

type RoomsState = {
	showInfoModal: boolean,
	userToken: string,
	feedToken: string,
	list: Array<ChannelDetail>,
	selected: string | null
}


const initialState: RoomsState = {
	showInfoModal: false,
	userToken: '',
	feedToken: '',
	list: [],
	selected: null
};

const roomsSlice = createSlice({
	name: 'rooms',
	initialState,
	reducers: {
		updateRooms: (state, { payload }) => {
			return {
				...state,
				...payload
			}
		},
		addRoom: (state, { payload }) => {
			state.list = [
				...state.list,
				payload
			];
		},
		updateRoom: (state, { payload }) => {
			state.list = state.list.map((room) => {
				if ( room.channel.id === state.selected ) {
					room.channel = {
						...room.channel,
						...payload
					};
				}
				return room;
			})
		},
		deleteRoom: (state, {payload}) => {
			state.list = state.list.filter((room) => room.channel.id !== payload);
		},
		selectRoom: (state, {payload}: Payload<string | null>) => {
			state.selected = payload
		},
		toggleInfoModal: (state, {payload}: Payload<boolean>) => {
			state.showInfoModal = !state.showInfoModal;
		},
	}
});

export const selectRooms =  (state: RootState) => (state.rooms);

export const selectRoomList = createSelector(selectRooms, state => state.list);

export const selectFeedToken = createSelector(selectRooms, state => state.feedToken);

export const selectSpecificRoom = (id: string | null) => createSelector(selectRooms, state => state.list.find((room) => room.channel.id === id));

export const selectUserToken = createSelector(selectRooms, state => state.userToken);

export const selectSelectedRoom = createSelector(selectRooms, function (state) {
	return state.selected && state.list.find( room => room.channel.id === state.selected );
});

export const selectShowInfoModal = createSelector(selectRooms, state => state.showInfoModal);

export const roomsActions = roomsSlice.actions;

export default roomsSlice;