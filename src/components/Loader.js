import React from 'react';
import LoaderIcon from './LoaderIcon';

const Loader = ({ message }) => {
	return (
		<div className='loader center'>
			<LoaderIcon />
			{message}
		</div>
	);
};

export default Loader;
