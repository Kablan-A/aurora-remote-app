import mitt from 'mitt';
import type { Notification } from './lib/types';

const emitter = mitt<Record<string, Notification>>();

export default emitter;