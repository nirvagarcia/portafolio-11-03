'use client';

const codeSnippets = [
  { text: 'model.fit(X_train, y_train)', category: 'ml', x: '8%', y: '15%', duration: 8 },
  { text: 'from transformers import AutoModel', category: 'ml', x: '88%', y: '10%', duration: 10 },
  { text: 'await prisma.user.create()', category: 'backend', x: '12%', y: '65%', duration: 9 },
  {
    text: 'torch.nn.functional.softmax()',
    category: 'ml',
    x: '82%',
    y: '70%',
    duration: 11,
  },
  {
    text: 'const [state, dispatch] = useReducer()',
    category: 'frontend',
    x: '20%',
    y: '35%',
    duration: 7,
  },
  // Desktop-only from here (index >= 5)
  { text: 'docker compose up --build', category: 'devops', x: '75%', y: '45%', duration: 9 },
  {
    text: 'app.post("/api/predict", async)',
    category: 'backend',
    x: '48%',
    y: '80%',
    duration: 10,
  },
  {
    text: '<Suspense fallback={<Loading />}>',
    category: 'frontend',
    x: '92%',
    y: '55%',
    duration: 8,
  },
  { text: 'redis.setex(key, 3600, data)', category: 'backend', x: '15%', y: '88%', duration: 9 },
  { text: 'np.linalg.svd(matrix)', category: 'ml', x: '65%', y: '20%', duration: 10 },
  { text: 'useState<T extends Model>()', category: 'frontend', x: '35%', y: '60%', duration: 8 },
  { text: 'git rebase -i HEAD~3', category: 'devops', x: '55%', y: '25%', duration: 9 },
];

const MOBILE_VISIBLE_COUNT = 5;

function getColorClass(category: string) {
  switch (category) {
    case 'ml':
      return 'text-gray-500 dark:text-gray-400';
    case 'backend':
      return 'text-gray-600 dark:text-gray-300';
    case 'frontend':
      return 'text-gray-400 dark:text-gray-500';
    case 'devops':
      return 'text-gray-500 dark:text-gray-400';
    default:
      return 'text-gray-600 dark:text-gray-300';
  }
}

export function FloatingCode() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {codeSnippets.map((snippet, index) => (
        <div
          key={snippet.text}
          className={`absolute select-none whitespace-nowrap font-mono ${index >= MOBILE_VISIBLE_COUNT ? 'hidden sm:block' : ''}`}
          style={{
            left: snippet.x,
            top: snippet.y,
            opacity: 0,
            willChange: 'transform, opacity',
            animation: `float-code-up ${snippet.duration}s ${index * 0.7}s infinite linear`,
            animationFillMode: 'backwards',
          }}
        >
          <span className={`${getColorClass(snippet.category)} text-xs sm:text-sm`}>
            {snippet.text}
          </span>
        </div>
      ))}
    </div>
  );
}
