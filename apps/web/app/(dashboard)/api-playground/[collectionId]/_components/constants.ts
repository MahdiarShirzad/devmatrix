export interface RequestItem {
  id: string;
  method: string;
  name: string;
  path: string;
}

export const REQUESTS: RequestItem[] = [
  { id: "req_1", method: "GET", name: "Get user profile", path: "/api/users/me" },
  { id: "req_2", method: "POST", name: "Create flight booking", path: "/api/bookings/flight" },
  { id: "req_3", method: "PUT", name: "Update hotel reservation", path: "/api/bookings/hotel/update" },
  { id: "req_4", method: "DELETE", name: "Cancel trip", path: "/api/trips/cancel" },
];

export const REQUEST_TABS = ["Params", "Headers", "Body", "Auth"] as const;
export type RequestTab = (typeof REQUEST_TABS)[number];

export const METHOD_COLORS: Record<string, string> = {
  GET: "text-success",
  POST: "text-brand-accent",
  PUT: "text-warning",
  DELETE: "text-error",
};

export const SAMPLE_RESPONSE = `{
  "status": "success",
  "data": {
    "bookingId": "bk_98f2a1c",
    "userId": "usr_7729alx",
    "type": "flight",
    "details": {
      "airline": "Aseman Airlines",
      "route": "THR -> BUZ",
      "class": "Economy",
      "departure": "2025-04-07T05:05:00Z"
    },
    "paymentStatus": "verified"
  },
  "meta": {
    "processedAt": "2026-08-08T09:34:00Z"
  }
}`;
