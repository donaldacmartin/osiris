export class AuthWrapper<T> {
  constructor(public expiration: Date, public auth: T) {}
}
