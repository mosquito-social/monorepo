import { useNavigate } from '@solidjs/router';
import { Avatar } from 'mosquito-design-system';
import { createMemo, createSignal } from 'solid-js';
import { MOCK_USERS } from '../mocks/users';

const CURRENT_USER = MOCK_USERS[0];

function slugifyHandle(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const inputClass =
  'w-full rounded-xl border border-col-line bg-col-bg px-4 py-3 text-fs-3 text-col-fg placeholder:text-col-fg-weak focus:outline-none focus:border-col-accent transition-colors';
const labelClass = 'block text-fs-2 font-semibold text-col-fg-soft mb-1.5';

export default function EditProfilePage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = createSignal(CURRENT_USER.firstName);
  const [lastName, setLastName] = createSignal(CURRENT_USER.lastName);
  const [displayName, setDisplayName] = createSignal(CURRENT_USER.displayName);
  const [handle, setHandle] = createSignal(CURRENT_USER.id);
  const [bio, setBio] = createSignal('');
  const [handleTouched, setHandleTouched] = createSignal(false);

  const autoHandle = createMemo(() =>
    slugifyHandle(`${firstName()} ${lastName()}`),
  );

  const effectiveHandle = createMemo(() =>
    handleTouched() ? handle() : autoHandle(),
  );

  const handleError = createMemo(() => {
    const h = effectiveHandle();
    if (!h) return 'Handle is required';
    if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(h) && h.length > 1)
      return 'Only lowercase letters, numbers, and hyphens allowed';
    return null;
  });

  const previewUser = createMemo(() => ({
    displayName:
      displayName() || `${firstName()} ${lastName()}`.trim() || 'Your Name',
    avatarUrl: CURRENT_USER.avatarUrl,
  }));

  function onFirstNameInput(val: string) {
    setFirstName(val);
    if (!handleTouched()) {
      const auto = slugifyHandle(`${val} ${lastName()}`);
      setHandle(auto);
    }
  }

  function onLastNameInput(val: string) {
    setLastName(val);
    if (!handleTouched()) {
      const auto = slugifyHandle(`${firstName()} ${val}`);
      setHandle(auto);
    }
  }

  function onHandleInput(val: string) {
    setHandleTouched(true);
    setHandle(slugifyHandle(val));
  }

  function onDisplayNameInput(val: string) {
    setDisplayName(val);
  }

  return (
    <main class="max-w-7xl mx-auto px-6 py-10">
      <button
        type="button"
        onClick={() => navigate(`/profile/${CURRENT_USER.id}`)}
        class="inline-flex items-center gap-2 text-fs-2 text-col-fg-soft hover:text-col-fg no-underline transition-colors mb-8"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          class="flex-shrink-0"
        >
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Back to profile
      </button>

      <div class="mb-8">
        <h1 class="text-fs-6 font-fam-msq font-black text-col-fg-strong leading-tight">
          Edit profile
        </h1>
        <p class="text-fs-3 text-col-fg-soft mt-1">
          Update your public profile information.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
        {/* LEFT: Form */}
        <div class="space-y-6 min-w-0">
          {/* Avatar */}
          <div>
            <p class={labelClass}>Avatar</p>
            <div class="flex items-center gap-4">
              <Avatar user={previewUser()} size="lg" />
              <button
                type="button"
                class="rounded-xl border border-col-line bg-col-bg px-4 py-2.5 text-fs-2 text-col-fg-soft hover:border-col-accent hover:text-col-fg transition-colors"
              >
                Change avatar
              </button>
            </div>
          </div>

          {/* First + Last name */}
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class={labelClass}>First name</label>
              <input
                type="text"
                value={firstName()}
                onInput={(e) => onFirstNameInput(e.currentTarget.value)}
                class={inputClass}
                placeholder="Alice"
              />
            </div>
            <div>
              <label class={labelClass}>Last name</label>
              <input
                type="text"
                value={lastName()}
                onInput={(e) => onLastNameInput(e.currentTarget.value)}
                class={inputClass}
                placeholder="Chen"
              />
            </div>
          </div>

          {/* Display name */}
          <div>
            <label class={labelClass}>Display name</label>
            <input
              type="text"
              value={displayName()}
              onInput={(e) => onDisplayNameInput(e.currentTarget.value)}
              class={inputClass}
              placeholder={
                `${firstName()} ${lastName()}`.trim() || 'Your display name'
              }
            />
            <p class="mt-1.5 text-fs-1 text-col-fg-weak">
              This is how your name appears across mosquito.social.
            </p>
          </div>

          {/* Handle */}
          <div>
            <label class={labelClass}>Handle</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-fs-3 text-col-fg-weak select-none">
                @
              </span>
              <input
                type="text"
                value={effectiveHandle()}
                onInput={(e) => onHandleInput(e.currentTarget.value)}
                class={`${inputClass} pl-8`}
                placeholder="alice-chen"
              />
            </div>
            {handleError() ? (
              <p class="mt-1.5 text-fs-1 text-red-500">{handleError()}</p>
            ) : (
              <p class="mt-1.5 text-fs-1 text-col-fg-weak font-mono">
                mosquito.social/@{effectiveHandle() || '…'}
              </p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label class={labelClass}>
              Bio <span class="font-normal text-col-fg-weak">(optional)</span>
            </label>
            <textarea
              value={bio()}
              onInput={(e) => setBio(e.currentTarget.value)}
              rows={3}
              class={inputClass}
              placeholder="Tell the community a bit about yourself…"
            />
          </div>

          {/* Actions */}
          <div class="flex items-center gap-4 pt-2">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full px-8 py-4 text-fs-4 font-fam-msq font-black bg-col-accent border-2 border-col-accent text-col-bg hover:bg-col-accent-strong hover:text-col-bg-strong transition-colors cursor-pointer"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={() => navigate(`/profile/${CURRENT_USER.id}`)}
              class="text-fs-2 text-col-fg-soft hover:text-col-fg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* RIGHT: Preview */}
        <div class="lg:sticky lg:top-24">
          <p class="text-fs-1 font-semibold text-col-fg-weak uppercase tracking-wider mb-3">
            Preview
          </p>
          <div class="rounded-2xl border border-col-line bg-col-bg overflow-hidden shadow-lg">
            <div class="flex items-start gap-5 p-6">
              <Avatar user={previewUser()} size="lg" class="flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <h2 class="text-fs-5 font-fam-msq font-black text-col-fg-strong leading-tight truncate">
                  {displayName() ||
                    `${firstName()} ${lastName()}`.trim() ||
                    'Your Name'}
                </h2>
                <p class="text-fs-2 text-col-fg-weak mt-0.5">
                  @{effectiveHandle() || '…'}
                </p>
                {bio() && (
                  <p class="text-fs-2 text-col-fg-soft mt-2 leading-snug line-clamp-3">
                    {bio()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
