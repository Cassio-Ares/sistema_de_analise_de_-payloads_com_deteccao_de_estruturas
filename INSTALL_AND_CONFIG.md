# INicio do projeto

## pnpm init

- instalação inicial que cria o package.json

```
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
`
```

- Ajustamos o package.json pois vamos criar um projeto fullstack similar ao um monolito

```
{
"name": "sistema*de_analise_de*-payloads_com_deteccao_de_estruturas",
"version": "1.0.0",
"description": "",
"private": true,
"workspaces": [
"api",
"web"
],
"packageManager": "pnpm@10.23.0"
}
```

- arquivo pnpm-workspace.yaml

```
packages:
  - 'api'
  - 'web'
```

## Inicio dos arquivos do projeto

### touch api

- pnpm init
- pnpm i typescript @types/node tsx -D
- pnpm tsc --init

- no tsconfig.json

```
"paths": {
"@/_": ["./src/_"]
}
```

- pnpm i fastify

- pnpm add -D -E @biomejs/biome

- pnpm exec biome init

- pnpm i @fastify/cors @fastify/swagger zod fastify-type-provider-zod @scalar/fastify-api-reference

### api/src/server

```
OBS:  teste para ver se está rodando

import { fastify } from "fastify";

const app = fastify();

app.listen({port: 3333, host: '0.0.0.0'}).then(()=>{
console.log("Api running on port 3333")
})

"scripts": {
"dev": "tsx watch src/server.ts"
},

pnpm run dev

```

#### config basico do server

```
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


"scripts": {
"dev": "tsx watch --env-file=.env src/server.ts"
},
```

### Basico de rota

```
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const listWebhooks: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/api/webhooks', => url
    {
      schema: {  => preenche o swagger como as informações
        summary: 'List webhooks',
        tags: ['Webhooks'],
        querystring: z.object({
          limit: z.coerce.number().min(1).max(100).default(20),
        }),
        response: {  => configuração da response
          200: z.array(
            z.object({
              id: z.string(),
              method: z.string(),
            })
          )
        },
        response: {
          204: z.void(),
          404: z.object({ message: z.string() }),
        },
        response: {
          200: createSelectSchema(webhooks),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { limit } = request.query

      return [
        {
          id: '123',
          method: 'POST',
        }
      ]
    },
  )
}
```

- pnpm i drizzle-kit -D
- pnpm i drizzle-orm drizzle-zod pg
- pnpm i @types/pg -D
- pnpm i uuidv7

lembrar detalhar drizzle config, e arquivos db

"dev": "tsx watch --env-file=.env src/server.ts",
"start": "node dist/server.js",
"format": "biome format --write",
"db:generate": "drizzle-kit generate",
"db:migrate": "drizzle-kit migrate",
"db:studio": "drizzle-kit studio"

 pnpm run db:generate
 pnpm run db:migrate

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;API:;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

### pnpm create vite@latest web - cria a parta e configura o vite

//https://commitlint.js.org/

pnpm add -D @commitlint/cli @commitlint/config-conventional

echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

commitlint.config.js \_\_\_
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

pnpm add --save-dev @commitlint/cli @commitlint/config-conventional @commitlint/prompt-cli

{
"scripts": {
"commit": "commit"
}
}

https://cz-git.qbb.sh/guide/

pnpm install -D cz-git

{
"scripts": {

},
"config": {
"commitizen": {
"path": "node_modules/cz-git"
}
}
}

{
"scripts": {
"commit": "git-cz"
},
"config": {
"commitizen": {
"path": "node_modules/cz-git",
"useEmoji": true
}
}
}
