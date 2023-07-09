import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export enum UserStatus {
  Enable = 0,
  Disable = 1,
}

export enum UserIDType {
  Anonymous = 0,
  normal = 1,
}

export interface Account {
  userId: number;
  identifier: string;
  email: string;
  status: UserStatus;
  type: UserIDType;
  createAt: string;
}

export interface AccountData {
  selfIdentifier?: string;
  entities: { [identifier: string]: Account };
}

const DEFAULT_ACCOUNT_DATA: AccountData = {
  selfIdentifier: undefined,
  entities: {},
};

interface AccountStore {
  selfIdentifier: string;
  entities: { [identifier: string]: Account };

  getSelfAccount(): Account | undefined;

  makeAccountIfNotExist(): Promise<void>;
}

const LOCAL_KEY = "account-store";

export const useAccountStore = create<AccountStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        selfIdentifier: "",
        entities: {},

        getSelfAccount: () => {
          const selfIdentifier = get().selfIdentifier;
          if (selfIdentifier.length > 0) {
            return get().entities[selfIdentifier];
          }
          return undefined;
        },

        async makeAccountIfNotExist() {
          const selfIdentifier = get().selfIdentifier;
          if (selfIdentifier.length > 0) {
            return;
          }
          console.log("before fetch");
          // 注册一个临时账户
          const resp = await fetch("/api/auth/register_anonymous/");
          console.log("after fetch");
          const data = await resp.json();

          const account: Account = data.data && {
            userId: data.data.user_id,
            identifier: data.data.identifier,
            email: data.data.email,
            type: data.data.user_type,
            status: data.data.account_status,
            createAt: data.data.create_at,
          };
          set((state) => {
            state.selfIdentifier = account?.identifier;
            if (account) {
              state.entities[account.identifier] = account;
            }
          });
        },

        // end
      })),
      { name: LOCAL_KEY, version: 1 }
    )
  )
);
