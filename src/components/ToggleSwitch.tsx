import { ChangeEvent, MouseEventHandler, ReactNode, useState } from "react";

import classNames from "classnames";

interface ComponentProps {
	children?: ReactNode;
	cn?: string;
	label?: string;
	labelStyle?: string;
	id?: string;
	checkedClass?: string;
	uncheckedClass?: string;
	labelClassName?: string;
	disabled?: boolean;
}
export default function ToggleButton({
	children,
	cn,
	label,
	id,
	labelStyle,
	checkedClass = "bg-green-500",
	uncheckedClass = "bg-gray-300",
	labelClassName = "text-gray-700",
	disabled = false,
	...props
}: ComponentProps) {
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const handleMouseDown = () => !disabled && setIsChecked(!isChecked);
	const handleMouseUp: MouseEventHandler<HTMLDivElement> = (event) =>
		event.preventDefault();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
		!disabled && setIsChecked(event.target.checked);

	const switchClass = classNames(
		"w-12 h-6 rounded-full transition-all duration-300",
		isChecked ? checkedClass : uncheckedClass,
		{ "opacity-50 cursor-not-allowed": disabled }
	);
	const circleClass = classNames(
		"absolute left-0 top-0 w-6 h-6 rounded-full shadow transition-transform duration-300",
		isChecked ? "translate-x-6 bg-green-600" : "translate-x-0 bg-gray-400"
	);
	const knobClass = classNames(
		"absolute left-0 top-0 w-6 h-6 rounded-full bg-white shadow transition-transform duration-300",
		isChecked ? "translate-x-6" : "translate-x-0"
	);
	const labelClass = classNames(
		"ml-3 font-medium transition-all duration-300",
		isChecked ? labelClassName : "text-gray-400",
		{ "opacity-50 cursor-not-allowed": disabled }
	);

	return (
		<label htmlFor={id} className="flex items-center cursor-pointer">
			<div className="relative flex items-center">
				<input
					type="checkbox"
					id={id}
					className="sr-only"
					checked={isChecked}
					onChange={handleChange}
					disabled={disabled}
				/>
				<div
					className={switchClass}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}>
					<div className={circleClass}></div>
					<div className={knobClass}></div>
				</div>
			</div>
			<div className={labelClass}>{label}</div>
		</label>
	);
	return (
		<label
			className={classNames(
				"inline-flex items-center cursor-pointer -ml-3 mr-4"
			)}>
			<span
				className={classNames(
					"inline-flex w-14 h-9 overflow-hidden p-3 box-border relative shrink-0 z-0"
				)}>
				<span
					className={classNames(
						"inline-flex items-center justify-center box-border bg-transparent outline-none border-none m-0 cursor-pointer select-none appearance-none "
					)}>
					<input
						type="checkbox"
						name="toggle"
						id="toggle"
						role="switch"
						className={classNames("sr-only peer")}
						checked={isChecked}
						readOnly></input>
					<span
						className={classNames(
							"shadow-[0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)] w-5 h-5 rounded-full",
							{
								["bg-[#90CAF9]"]: isChecked,
								["bg-[#CFCFCF]"]: !isChecked,
							}
						)}></span>
					<span></span>
				</span>
			</span>
			<span
				className={classNames("ml-3", {
					[`${labelStyle}`]: labelStyle,
				})}>
				{label}
			</span>
		</label>
		// <div className="flex items-center relative h-full">
		// 	<input
		// 		type="checkbox"
		// 		name="toggle"
		// 		id="toggle"
		// 		role="switch"
		// 		className={classnames("sr-only peer", {})}
		// 		checked={isChecked}
		// 		readOnly
		// 		// className={classnames(
		// 		// 	"absolute top-0 left-0 w-9 h-5 opacity-0 z-0",
		// 		// 	"before:content-[''] before:absolute before:w-9 before:h-5 before:bg-[#545E6A] before:top-[5px]left-0 rounded-2xl z-10",
		// 		// 	"after:content-[''] after:checked:bg-red-500 after:bg-gray-300",
		// 		// 	{}
		// 		// )}
		// 	/>
		// 	{/* Thumb */}
		// 	<span
		// 		onClick={handleToggle}
		// 		className={classnames(
		// 			"peer peer-focus:ring-green-300 cursor-pointer",
		// 			// Background
		// 			"w-[34px] h-[14px] bg-[#535D69] rounded-full peer-checked:bg-[#4D7291]",
		// 			//Thumb
		// 			"after:h-5 after:w-5 after:rounded-full after:transition-all after:bg-[#DDDDDD] after:absolute after:content-[''] after:top-1/2 after:-translate-y-1/2 after:-left-[3px] after:peer-checked:bg-[#90CAF9] peer-checked:after:translate-x-full after:text-red-500",
		// 			//
		// 			// "w-5 h-5 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white   after:top-0.5 after:left-[2px]  after:border-gray-300 after:border after:rounded-full   after:transition-all peer-checked:bg-[#4C708F]",
		// 			// //Thumb
		// 			// "after:content-[''] after:absolute after:bg-[#90CAF9] after:w-9 after:h-5 after:z-10",
		// 			{}
		// 		)}></span>
		// 	{/* Ripple effect */}
		// 	<span className={classnames("", {})}></span>
		// 	<label
		// 		htmlFor={"toggle"}
		// 		className={classnames("ml-3 text-[#E0E5E6]", {
		// 			[`${labelStyle}`]: labelStyle,
		// 		})}>
		// 		{label}
		// 	</label>
		// 	{/* <button
		// 		className={classnames(
		// 			"rounded-xl w-10 h-6 border border-black  flex items-center",
		// 			{
		// 				[`justify-end bg-[#1B80EC]`]: checked,
		// 				[`justify-start bg-[#D2D2D2]`]: !checked,
		// 			}
		// 		)}
		// 		onClick={handleChange}>
		// 		<div
		// 			className={classnames("rounded-full w-[21px] h-[21px]", {
		// 				["bg-[#81C2F2]"]: checked,
		// 				["bg-[#D0CDC7]"]: !checked,
		// 			})}></div>
		// 	</button> */}
		// </div>
	);
}

// "mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 hover:cursor-pointer dark:bg-neutral-600",
// 					//before
// 					"before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-['']",
// 					//after
// 					"after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] dark:after:bg-neutral-400",
// 					//focus
// 					"focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)]",
// 					{
// 						["checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] dark:checked:bg-primary dark:checked:after:bg-primary dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"]:
// 							checked,
// 					}
