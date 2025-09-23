import React from "react";
import { useRouter } from "next/router";
import { useAuth } from '@/lib/hooks/useAuth';
import Spinner from "./ui/Spinner";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const router = useRouter();
	const currentUser = useAuth();

	React.useEffect(() => {
		if (currentUser === null) router.replace('/auth/login'); // If not authenticated, force log in
	}, [currentUser, router]);

	if (currentUser) {
		return <>{children}</>;
	}
	// Session is being fetched, or no user.
	// If no user, useEffect() will redirect.
	return <Spinner size={20} />;
};

export default PrivateRoute;
