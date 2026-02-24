import { graphql, HttpResponse, ws } from 'msw';
import type { Component, Notification } from '../lib/types';

const NOTIFICATION_INTERVAL = 15 * 1000; // 15 seconds

const wsLink = ws.link(import.meta.env.VITE_NOTIFICATION_WS_URL);

export const handlers = [
  graphql.query('GetComponents', () => {
    const components = [
      { "id": 1, "name": "Header" },
      { "id": 2, "name": "Input" },
      { "id": 3, "name": "Form" }
    ] satisfies Component[];

    return HttpResponse.json({
      data: { components }
    })
  }),
  wsLink.addEventListener("connection", ({ client }) => {
    const interval = setInterval(() => {
      const notification: Notification = {
        id: crypto.randomUUID(),
        message: "New notification from server",
        date: new Date().toString(),
      };

      client.send(JSON.stringify(notification));
    }, NOTIFICATION_INTERVAL);

    client.addEventListener("close", () => clearInterval(interval));
  })
];
