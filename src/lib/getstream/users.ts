import { CreateUserToken } from '@/graphql/queries';
import { API } from 'aws-amplify';

export const getToken = ( id: string, name: string ) => {
	return API.graphql({
		query: CreateUserToken,
		variables: {
			id: id,
			name: name,
			apiKey: process.env.NEXT_PUBLIC_STREAM_KEY,
			apiSecret: 'Secret Key'
		}
	});
};