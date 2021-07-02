import React from 'react';

import Selfie from '../images/anthony.jpeg';
import Github from '../images/GitHub-logo.png';
import LinkedIn from '../images/linkedin-logo-copy.png';

const About = () => {
	return (
		<div>
			<div>
				<h1>Anthony Rodarte</h1>
				<h2>Web Developer</h2>
			</div>
			<img src={Selfie} className='selfie' alt='Anthony Rodarte' />
			<div>
				<h2>Links</h2>
				<a
					href='https://github.com/anthonyrodarte'
					target='_blank'
					rel='noreferrer'
				>
					<img src={Github} className='github-logo' alt='Github' />
				</a>
				<a
					href='https://www.linkedin.com/in/anthony-rodarte-99abb1155/'
					target='_blank'
					rel='noreferrer'
				>
					<img src={LinkedIn} className='linkedIn-logo' alt='LinkedIn' />
				</a>
			</div>
		</div>
	);
};

export default About;
