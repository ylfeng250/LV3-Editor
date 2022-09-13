import { useMemo, useState } from "react";
import { createStore } from "hox";
import type { NodeElement } from "../types";

function useElement() {
	const [nodeElements, setNodeElements] = useState<NodeElement[]>([
		{
			id: "test",
			componentName: "text",
			title: "文本",
			propValue: "1111",
			position: {
				top: 10,
				left: 10,
			},
		},
		{
			id: "test2",
			componentName: "text2",
			title: "文本2",
			propValue: "1111",
			position: {
				top: 10,
				left: 10,
			},
		},
	]);
	const [currentElementId, setCurrentElementId] = useState<string>("");
	const clearCurrentElementId = () => {
		setCurrentElementId("");
	};
	const currentElement = useMemo(() => {
		return nodeElements.find((element) => element.id === currentElementId);
	}, [currentElementId]);
	return {
		nodeElements,
		setNodeElements,
		currentElement,
		currentElementId,
		setCurrentElementId,
		clearCurrentElementId,
	};
}

export const [useNodeElements, ElementsStoreProvider] = createStore(useElement);
