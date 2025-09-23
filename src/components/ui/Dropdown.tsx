import React, { useState, ReactNode, useRef } from "react";
import { useClickAway } from 'react-use';

interface Props {
		className?: string;
		title: ReactNode;
		children: ReactNode;
		dropdownClass?: string;
}

const Dropdown: React.FC<Props> = ({ className, title, children, dropdownClass }) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);

	useClickAway(ref, () => {
		setIsOpen(false);
	});

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={"dropdown " + (className ?? '')} ref={ref}>
			<button onClick={handleToggle} className="dropdown-toggle  font-medium rounded text-sm px-3 py-2 text-center" type="button">{title}</button>
			{isOpen && <div className={"dropdown-menu z-10 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 " + (dropdownClass ?? '')}>{children}</div>}
		</div>
	);
};

export default Dropdown;