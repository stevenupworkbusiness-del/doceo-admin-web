import React from 'react';
import { TbHeart } from 'react-icons/tb';

const Footer = () => {
	return (
		<div className="bottom-0 left-2 right-2 print:hidden">
			<div className="container mx-auto">
				<footer className="footer mt-4 rounded-tr-md rounded-tl-md bg-white dark:bg-slate-800 p-4 text-center font-medium text-slate-600 dark:text-slate-400 shadow md:text-left">
                    &copy; { new Date().getFullYear() } Doceo
					<span className="float-right hidden text-slate-600 dark:text-slate-400 md:inline-block">Crafted with <TbHeart className="text-red-500 inline-block" /> by Wivil</span>
				</footer>
			</div>
		</div>
	)
}

export default Footer;