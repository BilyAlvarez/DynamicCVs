import { useState, type ReactNode } from 'react';
import { useLang } from '../i18n/LanguageContext';

interface Step {
  key: string;
  title: string;
  content: ReactNode;
}

interface Props {
  steps: Step[];
  onFinish?: () => void;
}

export default function Wizard({ steps, onFinish }: Props) {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const step = steps[current];
  const isLast = current === steps.length - 1;

  const next = () => {
    if (isLast) {
      onFinish?.();
    } else {
      setCurrent((c) => Math.min(c + 1, steps.length - 1));
    }
  };

  return (
    <div className="wizard">
      <div className="wizard-nav">
        {steps.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className={`wizard-step ${i === current ? 'wizard-step-active' : ''} ${i < current ? 'wizard-step-done' : ''}`}
            onClick={() => setCurrent(i)}
          >
            <span className="wizard-num">{i + 1}</span>
            <span className="wizard-label">{s.title}</span>
          </button>
        ))}
      </div>
      <div className="wizard-body">
        <h2 className="wizard-title">
          {t.wizard.step} {current + 1} · {step.title}
        </h2>
        {step.content}
        <div className="wizard-actions">
          <button className="btn btn-secondary" onClick={() => setCurrent((c) => Math.max(c - 1, 0))} disabled={current === 0}>
            {t.wizard.back}
          </button>
          <button className="btn btn-primary" onClick={next}>
            {isLast ? t.wizard.finish : t.wizard.next}
          </button>
        </div>
      </div>
    </div>
  );
}