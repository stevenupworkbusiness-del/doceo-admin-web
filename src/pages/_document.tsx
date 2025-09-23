import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="bg-gray-100 dark:bg-gray-900 bg-[url('/assets/images/bg-body.png')] dark:bg-[url('/assets/images/bg-body-2.png')]">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
