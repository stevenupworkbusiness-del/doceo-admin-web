import { ICognitoUser } from '@/types';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useAuth = () => {
	const [auth, setAuth] = useState<ICognitoUser | null | undefined>();
	const router = useRouter();

	useEffect(() => {
		async function getAuth() {
			try {
				let res = await Auth.currentUserInfo();
				setAuth(res);
			} catch(e) {
				router.replace('/auth/login')
				setAuth(null)
			}   
		}

		getAuth();
	}, [router])

	return auth;
}