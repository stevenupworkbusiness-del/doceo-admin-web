import React from 'react';

type SpinnerProps = {
    size: number
}

const Spinner: React.FC<SpinnerProps> = ({size = 12}) => {
	return (
		<div
			style={{
				width: size + 'px',
				height: size + 'px'
			}}
			className="rounded-full animate-spin border-4 border-solid border-green-500 border-t-transparent"
		>
			<span className='sr-only'>Loading</span>
		</div>
	)
}

export default Spinner