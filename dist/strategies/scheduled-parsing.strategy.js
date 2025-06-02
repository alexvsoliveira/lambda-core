"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledParsingStrategy = void 0;
/**
 * Strategy for parsing scheduled Lambda events (CloudWatch Events/EventBridge)
 */
class ScheduledParsingStrategy {
    parseEventToDto(event) {
        // For scheduled events, we just pass through the event as is
        return event;
    }
    canHandle(event) {
        return (typeof event === 'object' &&
            event !== null &&
            'detail-type' in event &&
            'source' in event &&
            'time' in event);
    }
}
exports.ScheduledParsingStrategy = ScheduledParsingStrategy;
