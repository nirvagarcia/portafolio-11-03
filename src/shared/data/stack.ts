import type { Tech, StackLayer } from '@/shared/types/stack';

export const technologies: Tech[] = [
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'AI Framework',
    layer: 'ai',
    usageExamples: ['stack.usage.bridge', 'stack.usage.aiRag'],
    narrative: 'stack.langchain.narrative',
    codePreview: {
      language: 'python',
      code: `from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory

memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=vectorstore.as_retriever(),
    memory=memory
)`,
    },
    connections: ['openai', 'python', 'chromadb'],
  },
  {
    id: 'openai',
    name: 'OpenAI API',
    category: 'LLM Provider',
    layer: 'ai',
    usageExamples: ['stack.usage.bridge', 'stack.usage.aiRag'],
    narrative: 'stack.openai.narrative',
    codePreview: {
      language: 'typescript',
      code: `import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: "gpt-4-turbo-preview",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: prompt }
  ],
  temperature: 0.7,
});`,
    },
    connections: ['typescript', 'nodejs'],
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    category: 'ML Platform',
    layer: 'ai',
    usageExamples: ['stack.usage.mlModels'],
    narrative: 'stack.huggingface.narrative',
    connections: ['python'],
  },

  {
    id: 'nextjs',
    name: 'Next.js 15',
    category: 'App Router',
    layer: 'core',
    usageExamples: ['stack.usage.portfolio', 'stack.usage.rentstate'],
    narrative: 'stack.nextjs.narrative',
    codePreview: {
      language: 'typescript',
      code: `// app/[locale]/layout.tsx
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}`,
    },
    connections: ['react', 'typescript', 'vercel'],
  },
  {
    id: 'react',
    name: 'React',
    category: 'UI Library',
    layer: 'core',
    usageExamples: ['stack.usage.portfolio', 'stack.usage.rentstate'],
    narrative: 'stack.react.narrative',
    codePreview: {
      language: 'typescript',
      code: `const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
  };
  
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);`,
    },
    connections: ['typescript', 'nextjs'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Language',
    layer: 'core',
    usageExamples: ['stack.usage.allProjects'],
    narrative: 'stack.typescript.narrative',
    codePreview: {
      language: 'typescript',
      code: `interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

type ApiResponse<T> = {
  data: T;
  error?: string;
  status: number;
};

const fetchUser = async (id: string): Promise<ApiResponse<User>> => {
  // Implementation
};`,
    },
    connections: ['nextjs', 'react', 'nestjs'],
  },

  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'API Framework',
    layer: 'core',
    usageExamples: ['stack.usage.bridge', 'stack.usage.mlApis'],
    narrative: 'stack.fastapi.narrative',
    codePreview: {
      language: 'python',
      code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class TranslationRequest(BaseModel):
    text: str
    source_lang: str
    target_lang: str

@app.post("/translate")
async def translate(request: TranslationRequest):
    result = await translator.process(
        request.text, 
        request.source_lang,
        request.target_lang
    )
    return {"translation": result}`,
    },
    connections: ['python', 'postgresql', 'docker'],
  },
  {
    id: 'nestjs',
    name: 'NestJS',
    category: 'Backend Framework',
    layer: 'core',
    usageExamples: ['stack.usage.rentstate', 'stack.usage.apis'],
    narrative: 'stack.nestjs.narrative',
    codePreview: {
      language: 'typescript',
      code: `@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertyRepo: Repository<Property>,
  ) {}

  async findNearby(lat: number, lng: number, radius: number) {
    return this.propertyRepo
      .createQueryBuilder('property')
      .where(\`ST_DWithin(
        property.location::geography,
        ST_MakePoint(:lng, :lat)::geography,
        :radius
      )\`)
      .setParameters({ lat, lng, radius: radius * 1000 })
      .getMany();
  }
}`,
    },
    connections: ['typescript', 'nodejs', 'postgresql'],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Language',
    layer: 'core',
    usageExamples: ['stack.usage.bridge', 'stack.usage.mlProjects'],
    narrative: 'stack.python.narrative',
    connections: ['fastapi', 'langchain'],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Runtime',
    layer: 'core',
    usageExamples: ['stack.usage.backend'],
    narrative: 'stack.nodejs.narrative',
    connections: ['typescript', 'nestjs', 'nextjs'],
  },

  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Relational DB',
    layer: 'data',
    usageExamples: ['stack.usage.rentstate', 'stack.usage.production'],
    narrative: 'stack.postgresql.narrative',
    codePreview: {
      language: 'sql',
      code: `-- Spatial query for nearby properties
SELECT 
  p.*,
  ST_Distance(
    p.location::geography,
    ST_MakePoint($1, $2)::geography
  ) / 1000 AS distance_km
FROM properties p
WHERE ST_DWithin(
  p.location::geography,
  ST_MakePoint($1, $2)::geography,
  $3 * 1000
)
ORDER BY distance_km
LIMIT 20;`,
    },
    connections: ['prisma', 'nestjs', 'docker'],
  },
  {
    id: 'prisma',
    name: 'Prisma',
    category: 'ORM',
    layer: 'data',
    usageExamples: ['stack.usage.nextjs', 'stack.usage.typeorm'],
    narrative: 'stack.prisma.narrative',
    codePreview: {
      language: 'typescript',
      code: `// schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  projects  Project[]
  createdAt DateTime @default(now())
}

// Usage
const user = await prisma.user.create({
  data: {
    email: "user@example.com",
    projects: {
      create: [{ title: "New Project" }]
    }
  },
  include: { projects: true }
});`,
    },
    connections: ['typescript', 'postgresql', 'nextjs'],
  },
  {
    id: 'chromadb',
    name: 'ChromaDB',
    category: 'Vector DB',
    layer: 'data',
    usageExamples: ['stack.usage.bridge', 'stack.usage.rag'],
    narrative: 'stack.chromadb.narrative',
    codePreview: {
      language: 'python',
      code: `import chromadb
from chromadb.config import Settings

client = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory="./chroma_db"
))

collection = client.create_collection("documents")

collection.add(
    documents=["Document content..."],
    metadatas=[{"source": "doc.pdf"}],
    ids=["doc1"]
)

results = collection.query(
    query_texts=["search query"],
    n_results=5
)`,
    },
    connections: ['langchain', 'python'],
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'Cache',
    layer: 'data',
    usageExamples: ['stack.usage.caching', 'stack.usage.sessions'],
    narrative: 'stack.redis.narrative',
    connections: ['nodejs', 'docker'],
  },

  {
    id: 'docker',
    name: 'Docker',
    category: 'Containerization',
    layer: 'infrastructure',
    usageExamples: ['stack.usage.allProjects'],
    narrative: 'stack.docker.narrative',
    codePreview: {
      language: 'dockerfile',
      code: `FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]`,
    },
    connections: ['gcp', 'vercel'],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Deployment',
    layer: 'infrastructure',
    usageExamples: ['stack.usage.portfolio', 'stack.usage.frontend'],
    narrative: 'stack.vercel.narrative',
    connections: ['nextjs', 'git'],
  },
  {
    id: 'gcp',
    name: 'Google Cloud',
    category: 'Cloud Platform',
    layer: 'infrastructure',
    usageExamples: ['stack.usage.production', 'stack.usage.apis'],
    narrative: 'stack.gcp.narrative',
    connections: ['docker', 'postgresql'],
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Version Control',
    layer: 'infrastructure',
    usageExamples: ['stack.usage.allProjects'],
    narrative: 'stack.git.narrative',
    connections: ['github-actions'],
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'CI/CD',
    layer: 'infrastructure',
    usageExamples: ['stack.usage.cicd'],
    narrative: 'stack.githubActions.narrative',
    codePreview: {
      language: 'yaml',
      code: `name: Deploy
on:
  push:
    branches: [main]
    
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: vercel/action@v2
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}`,
    },
    connections: ['git', 'vercel'],
  },
];

export const stackLayers: StackLayer[] = [
  {
    id: 'ai',
    name: 'stack.layers.ai',
    position: 'top',
    techs: technologies.filter((t) => t.layer === 'ai'),
  },
  {
    id: 'core',
    name: 'stack.layers.core',
    position: 'middle-top',
    techs: technologies.filter((t) => t.layer === 'core'),
  },
  {
    id: 'data',
    name: 'stack.layers.data',
    position: 'middle-bottom',
    techs: technologies.filter((t) => t.layer === 'data'),
  },
  {
    id: 'infrastructure',
    name: 'stack.layers.infrastructure',
    position: 'bottom',
    techs: technologies.filter((t) => t.layer === 'infrastructure'),
  },
];

export function getTechById(id: string): Tech | undefined {
  return technologies.find((tech) => tech.id === id);
}
