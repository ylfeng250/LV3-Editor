import React, { useEffect, useMemo } from "react";
import { useNodeElements } from "../../model/useElementStore";
import DragComponent from "../DragComponent";
import { listenOnUpdateNodeElementPositionEvent } from "../../events";

export interface EditorProps {
	id: string;
	width?: number;
	height?: number;
}

function getEditorId(customId: string) {
	return `lv3-${customId}`;
}

export default function Editor(props: EditorProps) {
	const { id, width = 800, height = 450 } = props;
	const { nodeElements, setNodeElements, currentElementId } = useNodeElements();
	const editorId = useMemo(() => {
		return getEditorId(id);
	}, [id]);
	useEffect(() => {
		// 监听节点更新事件，节点更新之后更新整个需要更新的数组
		const clearUpdateNodeElementPositionEvents =
			listenOnUpdateNodeElementPositionEvent(
				({ nodeElementId, updateNodeElementPosition }) => {
					setNodeElements((nodeElements) => {
						return nodeElements.map((element) => {
							if (element.id === nodeElementId) {
								return {
									...element,
									position: updateNodeElementPosition,
								};
							}
							return element;
						});
					});
				}
			);
		return () => clearUpdateNodeElementPositionEvents();
	}, []);
	return (
		<div
			id={editorId}
			style={{
				width: `${width}px`,
				height: `${height}px`,
				boxShadow: "4px 4px 15px #f00",
				userSelect: "none",
				position: "relative",
			}}
		>
			{nodeElements.map((nodeElement) => {
				const { id, position, title } = nodeElement;
				const isActive = id === currentElementId;
				return (
					<DragComponent
						id={id}
						key={id}
						position={position}
						onPositionChange={(position) => {}}
						isActive={isActive}
					>
						<div>{title}</div>
					</DragComponent>
				);
			})}
		</div>
	);
}
