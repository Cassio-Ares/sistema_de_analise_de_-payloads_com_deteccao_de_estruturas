pnpm init


{
  "name": "sistema_de_analise_de_-payloads_com_deteccao_de_estruturas",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.23.0"
}

{
  "name": "sistema_de_analise_de_-payloads_com_deteccao_de_estruturas",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "workspaces": [
    "api",
    "web"
  ],
  "packageManager": "pnpm@10.23.0"
}

pnpm create vite@latest web

api pnpm init 
Wrote to /workspaces/sistema_de_analise_de_-payloads_com_deteccao_de_estruturas/api/package.json

{
  "name": "api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.23.0"
}

 pnpm i typescript @types/node tsx -D
..                                       | Progress: resolved 121, reused 0, downloaded 0, added 0, done

devDependencies:
+ @types/node ^24.10.4
+ tsx ^4.21.0
+ typescript ~5.9.3

..                                       |   +3 +
Done in 1.8s using pnpm v10.23.0
@Cassio-Ares ➜ /workspaces/sistema_de_analise_de_-payloads_com_deteccao_de_estruturas/api (install_and_config) $ 
@Cassio-Ares ➜ /workspaces/sistema_de_analise_de_-payloads_com_deteccao_de_estruturas/api (install_and_config) $ pnpm tsc --init

Created a new tsconfig.json                                                                                             
                                                                                                                     TS 
You can learn more at https://aka.ms/tsconfig


"paths": {
      "@/*": ["./src/*"]
    }


pnpm i fastify

import { fastify } from "fastify";

const app = fastify();

app.listen({port: 3333, host: '0.0.0.0'}).then(()=>{
  console.log("Api running on port 3333")
})


  "scripts": {
    "dev": "tsx watch src/server.ts"
  },

  pnpm run dev


  "scripts": {
    "dev": "tsx watch --env-file=.env src/server.ts"
  },

  pnpm add -D -E @biomejs/biome

  pnpm exec biome init

  pnpm i @fastify/cors @fastify/swagger zod fastify-type-provider-zod @scalar/fastify-api-reference


basic 
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifyCors } from '@fastify/cors'
import ScalarApiReference from '@scalar/fastify-api-reference'
import { listWebhooks } from './routes/list-webhooks'
import { env } from './env'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  // credentials: true,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Webhook Inspector API',
      description: 'API for capturing and inspecting webhook requests',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(ScalarApiReference, {
  routePrefix: '/docs',
})

app.register(listWebhooks)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('🔥 HTTP server running on http://localhost:3333!')
  console.log('📚 Docs available at http://localhost:3333/docs')
})


//https://commitlint.js.org/

pnpm add -D @commitlint/cli @commitlint/config-conventional

echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js



commitlint.config.js ___
                      |
import { RuleConfigSeverity, } from "@commitlint/types";
export default {
    parserPreset: "conventional-changelog-conventionalcommits",
    rules: {
        "body-leading-blank": [RuleConfigSeverity.Warning, "always"],
        "body-max-line-length": [RuleConfigSeverity.Error, "always", 100],
        "footer-leading-blank": [RuleConfigSeverity.Warning, "always"],
        "footer-max-line-length": [
            RuleConfigSeverity.Error,
            "always",
            100,
        ],
        "header-max-length": [RuleConfigSeverity.Error, "always", 100],
        "header-trim": [RuleConfigSeverity.Error, "always"],
        "subject-case": [
            RuleConfigSeverity.Error,
            "never",
            ["sentence-case", "start-case", "pascal-case", "upper-case"],
        ],
        "subject-empty": [RuleConfigSeverity.Error, "never"],
        "subject-full-stop": [RuleConfigSeverity.Error, "never", "."],
        "type-case": [RuleConfigSeverity.Error, "always", "lower-case"],
        "type-empty": [RuleConfigSeverity.Error, "never"],
        "type-enum": [
            RuleConfigSeverity.Error,
            "always",
            [
                "build",
                "chore",
                "ci",
                "docs",
                "feat",
                "fix",
                "perf",
                "refactor",
                "revert",
                "style",
                "test",
            ],
        ],
    },
    prompt: {
        questions: {
            type: {
                description: "Select the type of change that you're committing",
                enum: {
                    feat: {
                        description: "A new feature",
                        title: "Features",
                        emoji: "✨",
                    },
                    fix: {
                        description: "A bug fix",
                        title: "Bug Fixes",
                        emoji: "🐛",
                    },
                    docs: {
                        description: "Documentation only changes",
                        title: "Documentation",
                        emoji: "📚",
                    },
                    style: {
                        description: "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
                        title: "Styles",
                        emoji: "💎",
                    },
                    refactor: {
                        description: "A code change that neither fixes a bug nor adds a feature",
                        title: "Code Refactoring",
                        emoji: "📦",
                    },
                    perf: {
                        description: "A code change that improves performance",
                        title: "Performance Improvements",
                        emoji: "🚀",
                    },
                    test: {
                        description: "Adding missing tests or correcting existing tests",
                        title: "Tests",
                        emoji: "🚨",
                    },
                    build: {
                        description: "Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
                        title: "Builds",
                        emoji: "🛠",
                    },
                    ci: {
                        description: "Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
                        title: "Continuous Integrations",
                        emoji: "⚙️",
                    },
                    chore: {
                        description: "Other changes that don't modify src or test files",
                        title: "Chores",
                        emoji: "♻️",
                    },
                    revert: {
                        description: "Reverts a previous commit",
                        title: "Reverts",
                        emoji: "🗑",
                    },
                },
            },
            scope: {
                description: "What is the scope of this change (e.g. component or file name)",
            },
            subject: {
                description: "Write a short, imperative tense description of the change",
            },
            body: {
                description: "Provide a longer description of the change",
            },
            isBreaking: {
                description: "Are there any breaking changes?",
            },
            breakingBody: {
                description: "A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself",
            },
            breaking: {
                description: "Describe the breaking changes",
            },
            isIssueAffected: {
                description: "Does this change affect any open issues?",
            },
            issuesBody: {
                description: "If issues are closed, the commit requires a body. Please enter a longer description of the commit itself",
            },
            issues: {
                description: 'Add issue references (e.g. "fix #123", "re #123".)',
            },
        },
    },
};


pnpm add --save-dev husky

# husky@v9
pnpm husky init

# husky@v8 or lower
pnpm husky install

# Add commit message linting to commit-msg hook
echo "pnpm dlx commitlint --edit \$1" > .husky/commit-msg

