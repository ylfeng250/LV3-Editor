import { EventEmitter } from "events";
const events = new EventEmitter();

export function getEvents() {
	return events;
}
