import React from 'react';

const LoaderIcon = () => {
	return (
		<svg
			version='1.1'
			id='L3'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			x='0px'
			y='0px'
			viewBox='0 0 500 500'
			enableBackground='new 0 0 0 0'
			xmlSpace='preserve'
		>
			<circle
				fill='none'
				stroke='#000'
				strokeWidth='4'
				cx='50'
				cy='50'
				r='44'
				style={{ opacity: '0.5' }}
			/>
			<circle
				fill='#079165'
				stroke='#079165'
				strokeWidth='3'
				cx='8'
				cy='54'
				r='6'
			>
				<animateTransform
					attributeName='transform'
					dur='2s'
					type='rotate'
					from='0 50 48'
					to='360 50 52'
					repeatCount='indefinite'
				/>
			</circle>
		</svg>
	);
};

export default LoaderIcon;
