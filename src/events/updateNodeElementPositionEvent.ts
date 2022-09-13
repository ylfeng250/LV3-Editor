import { getEvents } from "./getEvents";
import { eventMap } from "./eventMap";
import { Position } from "../types";

interface UpdateNodeElementPositionEventData {
	nodeElementId: string;
	updateNodeElementPosition: Position;
}

/**
 * 触发 element 位置更新事件
 * @param nodeElementId 更新的元素 id
 * @param updateNodeElementPosition  更新的元素位置
 */
export function emitUpdateNodeElementPositionEvent(
	data: UpdateNodeElementPositionEventData
) {
	const events = getEvents();
	events.emit(eventMap["UPDATE_NODE_ELEMENT_POSITION"], data);
}
/**
 * 监听 element 位置更新事件
 * @param listener 监听回调事件
 */
export function listenOnUpdateNodeElementPositionEvent(
	listener: (data: UpdateNodeElementPositionEventData) => void
) {
	const events = getEvents();
	events.on(eventMap["UPDATE_NODE_ELEMENT_POSITION"], listener);
	return () => {
		events.removeListener(eventMap["UPDATE_NODE_ELEMENT_POSITION"], listener);
	};
}
