import { EventTypes as StreamEventTypes } from 'stream-chat';

// Extend the Stream Chat EventTypes
declare module 'stream-chat' {
    interface EventTypes extends StreamEventTypes {
        'recording.settings.updated': {
            roomId: string;
            data: {
                name: string;
                room: string;
                showRecordButton: boolean;
                interface: string;
                [key: string]: any;
            };
        };
    }
} 