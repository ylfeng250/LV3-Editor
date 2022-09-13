import React from "react";
import Editor from "./components/Editor";
import { ElementsStoreProvider } from "./model/useElementStore";
import "./index.css";

interface ComponentProps {
	/** Title for LV3Editor. */
	title: string;
}

export default function LV3Editor(props: ComponentProps) {
	const { title, ...others } = props;

	return (
		<ElementsStoreProvider>
			<Editor id="test" key={"lv3-editor"} />
		</ElementsStoreProvider>
	);
}
