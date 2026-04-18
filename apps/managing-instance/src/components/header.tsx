import { A } from "@solidjs/router";
import { Avatar } from "mosquito-design-system";
import { MOCK_USERS } from "../mocks";
import { Logo } from "./logo";

const currentUser = MOCK_USERS[3];

export function Header() {
  return (
    <header class="sticky top-0 z-50 w-full bg-col-bg border-b border-col-line">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <A href="/" class="flex items-center gap-2 no-underline">
          <div class="flex items-center gap-2 font-fam-msq font-black text-fs-4 text-col-fg group hover:text-col-fg-strong">
            <Logo class="w-8 h-8 text-col-accent group-hover:text-col-accent-strong" />
            MOSQUITO.social
          </div>
        </A>

        <div class="flex items-center gap-3">
          <div class="flex flex-col items-end">
            <span class="text-fs-1 text-col-fg-weak hidden sm:block">
              logged in as
            </span>
            <span class="text-fs-2 text-col-fg font-bold hidden sm:block">
              {currentUser.displayName}
            </span>
          </div>
          <Avatar user={currentUser} size="md" />
        </div>
      </div>
    </header>
  );
}
