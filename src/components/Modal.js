import React, { useEffect, useState } from 'react';

const Modal = (message) => {
	const [visible, changeVisibility] = useState(false);

	useEffect(() => {
		console.log(message);
	}, [message]);

	return (
		<div className='modal'>
			<p>{message.message}</p>
		</div>
	);
};

export default Modal;
