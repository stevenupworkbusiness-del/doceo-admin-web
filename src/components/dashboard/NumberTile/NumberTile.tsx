import React from 'react';

const width = typeof window !== "undefined" ? window.innerWidth : 1200;
const height = typeof window !== "undefined" ? window.innerHeight : 900;

interface Styles {
	container: React.CSSProperties;
}

const styles: Styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: height * 0.1,
		width: width * 0.1,
		backgroundColor: '#FFFFFF',
	},
}

type Props = {
  number: number;
  index?: boolean;
}

const NumberTile = (props: Props) => {

	const {number, index} = props;

	return (
		<div style={styles.container}>
			<td style={{fontSize: height * 0.05}}>{index ? `${number * 100}%` : number}</td>
		</div>
	);
}

export default NumberTile;
