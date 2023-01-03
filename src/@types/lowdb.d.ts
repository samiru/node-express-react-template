import { Low } from "lowdb";

declare module "lowdb" {
  interface Low<T> {
    get<K extends keyof T>(key: K): T[K];
  }

  interface Object {
    assign<T, U>(target: T, source: U): T & U;
  }
}
