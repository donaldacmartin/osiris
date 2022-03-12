export class SubscriptionResource {
  channelId?: string;
}

export class SubscriptionSnippet {
  resourceId?: SubscriptionResource;
}

export class Subscription {
  snippet?: SubscriptionSnippet;
}
