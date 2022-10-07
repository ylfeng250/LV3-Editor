import React, { useRef } from "react";
import DragBox from "./components/DragBox";
import "./index.css";

interface ComponentProps {
	/** Title for ExampleComponent. */
	title: string;
}

export default function ExampleComponent(props: ComponentProps) {
	const { title, ...others } = props;

	return (
		<div className="ExampleComponent" {...others}>
			<DragBox />
		</div>
	);
}
