import { API, Auth } from 'aws-amplify';
import { call, takeEvery, put, select, takeLatest, Effect, getContext, } from "redux-saga/effects";
import { StreamChat, DefaultGenerics, Channel as StreamChatChannel } from 'stream-chat';
import axios from 'axios';
import { CreateUserToken, listCategories, listTags, sendPushNotification } from '@/graphql/queries';
import { Channel, CreateUserTokenQuery, CreateUserTokenResponse, ListCategoriesQuery, ListTagsQuery, } from '@/types';

import { CREATE_ANNOUNCEMENT, CREATE_TOKEN, CREATE_UPDATE_ROOM, GET_CATEGORIES, GET_TAGS } from "../constants/actions";
import { PayloadWithType } from '.';
import roomsSlice, { roomsActions } from './rooms';
import { tagsActions } from './tags';
import { categoriesActions } from './categories';


export function* createTokenSaga({ payload }: PayloadWithType<any>): Generator<Effect, void, any> {
	try {
		const { data } = yield call(async () => {
			return await API.graphql<CreateUserTokenQuery>({
				query: CreateUserToken,
				variables: {
					id: payload.id
				}
			})
		});

		const { data: feedToken } = yield call(async () => {
			return await axios.post('/api/token', {
				user_id: payload.id
			});
		})

		yield put(roomsActions.updateRooms({
			userToken: data.CreateUserToken.token,
			feedToken: feedToken.token,
			list: data.CreateUserToken.rooms
		}));

		const res = yield call(async () => {
			return await API.graphql<ListTagsQuery>({
				query: listTags,
				variables: {
				}
			});
		});

		yield put(tagsActions.updateTags({
			list: res.data.listTags.items
		}))
	} catch {
		console.log('Error');
	}
}

export function* createUpdateRoomSaga({ payload }: PayloadWithType<Channel>): Generator<Effect, void, any> {
	try {
		// let room: StreamChatChannel<DefaultGenerics>;
		// room = payload.client.channel('room', payload.room.id, {
		//  name: payload.room.name!,
		//  image: payload.room.image!,
		//  description: payload.room.description!
		// } )
		// room = yield call(async() => {
		//  if ( payload.room.id ) {
		//      return await room.update();
		//  } else {
		//      return await room.create();
		//  }
		// });

		// if ( payload.room.id ) {
		//  yield put(roomsActions.updateRoom(room));
		// } else {
		//  yield put(roomsActions.addRoom(room));
		// }
	} catch (e) {
		console.error('Error', e);
	}
}

export function* sendNotificationSaga({ payload }: PayloadWithType<any>): Generator<Effect, void, any> {
	try {
		// yield call(async() => {})

		const { data } = yield call(async () => {
			return await API.graphql({
				query: sendPushNotification,
				variables: {
					type: payload.type,
					channel: payload.channel,
					text: payload.text
				}
			});
		})

		window.alert('notification sent');
		return data
	} catch {
		console.log('Error');
	}
}

export function* getTagsSaga(): Generator<Effect, void, any> {
	try {
		const res = yield call(async () => {
			return await API.graphql<ListTagsQuery>({
				query: listTags,
				variables: {
				}
			});
		});

		yield put(tagsActions.updateTags({
			list: res.data.listTags.items
		}))
	} catch {
		console.log('Error');
	}
}

export function* getCategoriesSaga(): Generator<Effect, void, any> {
	try {
		const res = yield call(async () => {
			return await API.graphql<ListCategoriesQuery>({
				query: listCategories,
				variables: {

				}
			});
		});

		yield put(categoriesActions.updateCategories({
			list: res.data.listCategories.items
		}))
	} catch {
		console.log('Error');
	}
}

export default function* rootSaga() {
	yield takeLatest(CREATE_TOKEN, createTokenSaga);
	yield takeEvery(CREATE_UPDATE_ROOM, createUpdateRoomSaga)
	yield takeEvery(CREATE_ANNOUNCEMENT, sendNotificationSaga);
	yield takeLatest(GET_TAGS, getTagsSaga);
	yield takeLatest(GET_CATEGORIES, getCategoriesSaga);
}
