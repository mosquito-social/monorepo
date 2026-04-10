export interface ContributorCardProps {
  name: string;
  role: string;
  initials: string;
}

export function ContributorCard(props: ContributorCardProps) {
  return (
    <div class="flex flex-col items-center gap-3 p-6 bg-col-bg rounded-2xl border border-col-line text-center">
      <div class="w-16 h-16 rounded-full bg-col-accent-weak text-col-fg flex items-center justify-center text-lg font-bold font-fam-msq ring-2 ring-col-line-strong">
        {props.initials}
      </div>
      <div>
        <p class="font-black tex-col-fg-strong font-fam-msq">{props.name}</p>
        <p class="text-sm text-col-fg-soft">{props.role}</p>
      </div>
    </div>
  );
}
