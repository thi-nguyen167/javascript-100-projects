interface ProjectHeaderProps {
  challengeNumber: string;
  title: string;
  description: string;
}

export default function ProjectHeader({
  challengeNumber,
  title,
  description,
}: ProjectHeaderProps) {
  return (
    <div className="my-6 md:my-12 w-full max-w-4xl text-center flex flex-col items-center">
      <span className="font-label-xs text-[11px] uppercase tracking-widest text-secondary mb-4 block font-semibold">
        Challenge {challengeNumber}
      </span>
      <h1 className="font-semibold font-headline-xl text-[48px] md:text-[56px] text-primary mb-4 tracking-tight">
        {title}
      </h1>
      <p className="font-body-lg text-body-lg text-secondary max-w-lg">
        {description}
      </p>
    </div>
  );
}
