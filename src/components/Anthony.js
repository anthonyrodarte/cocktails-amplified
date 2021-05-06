import React from 'react';

import Selfie from '../images/anthony.jpeg';

const About = () => {
	return (
		<div>
			<div>
				<h1>Anthony Rodarte</h1>
				<h2>Web Developer</h2>
			</div>
			<img src={Selfie} className='selfie' alt='Anthony Rodarte' />
			<div>
				<h2>About</h2>
				<p>Welcome to my website!</p>
			</div>
		</div>
	);
};

export default About;
