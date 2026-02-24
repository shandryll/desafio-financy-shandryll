_Faaaaaaala, dev! Vamos agora passar pelos requisitos desse desafio._

Nesse projeto front-end será desenvolvido uma aplicação React que, em conjunto com a API, permite o gerenciamento de transações e categorias.

## Funcionalidades e Regras

Assim como na API, temos as seguintes funcionalidades e regras:

- [x] O usuário pode criar uma conta e fazer login
- [x] O usuário pode ver e gerenciar apenas as transações e categorias criadas por ele
- [x] Deve ser possível criar uma transação
- [x] Deve ser possível deletar uma transação
- [x] Deve ser possível editar uma transação
- [x] Deve ser possível listar todas as transações
- [x] Deve ser possível criar uma categoria
- [x] Deve ser possível deletar uma categoria
- [x] Deve ser possível editar uma categoria
- [x] Deve ser possível listar todas as categorias

Além disso, também temos algumas regras importantes específicas para o front-end:

- [x] É obrigatória a criação de uma aplicação React usando GraphQL para consultas na API e Vite como `bundler`;
- [x] Siga o mais fielmente possível o layout do Figma;

<aside>
💡

Dica: Copie os checkbox acima para o README do seu projeto.
Assim irá poder ir marcando na medida que implementar as funcionalidades. 😉

</aside>

## Páginas

Essa aplicação possui 6 páginas e dois modais com os formulários (Dialog):

- A página raiz (`/`) que exibe:
  - Tela de login caso o usuário esteja deslogado
  - Tela dashboard caso usuário esteja logado

## Ferramentas

É obrigatório o uso de:

- Typescript
- React
- Vite sem framework
- GraphQL

É flexível o uso de:

- TailwindCSS
- Shadcn
- React Query
- React Hook Form
- Zod

## Variáveis ambiente

Todo projeto tem diversas configurações de variáveis que devem ser diferentes de acordo com o ambiente que ele é executado. Para isso, importante sabermos, de forma fácil e intuitiva, quais variáveis são essas. Então é obrigatório que esse projeto tenha um arquivo `.env.example` com as chaves necessárias:

```
VITE_BACKEND_URL=
```

## Dicas

- Comece o projeto pela aba `Style Guide` no Figma. Dessa forma, você prepara todo o seu tema, fontes e componentes e quando for criar as páginas vai ser bem mais tranquilo;
- Assim com a experiência do usuário é importante (UX), a sua experiência no desenvolvimento (DX) também é muito importante. Por isso, apesar de ser possível criar essa aplicação sem nenhuma biblioteca, recomendamos utilizar algumas bibliotecas que vão facilitar tanto o desenvolvimento inicial quanto a manutenção do código;
- Em caso de dúvidas, utilize o espaço da comunidade e do nosso fórum para interagir com outros alunos/instrutores e encontrar uma solução que funcione para você.

---

## Quer ir além?

Se você quer se desafiar e explorar conceitos além do que foram propostos no desafio, temos algumas ideias em mente para te inspirar:

<aside>
⚠️

A correção do seu desafio é apenas levando em conta as regras e funcionalidades obrigatórias mencionadas nas etapas anteriores. Portanto, envie o seu código para correção antes de implementar novas funcionalidades (ou crie uma nova `branch` com o seu código alterado)

</aside>

- Upload de imagem: o upload de imagem para o avatar do usuário é opcional, mas que tal você usar o que aprendeu e se desafiar adicionando a imagem de perfil do usuário.

<aside>
<img src="https://prod-files-secure.s3.us-west-2.amazonaws.com/08f749ff-d06d-49a8-a488-9846e081b224/8a262faf-804f-467d-828c-37c228ac33c9/symbol.svg" alt="https://prod-files-secure.s3.us-west-2.amazonaws.com/08f749ff-d06d-49a8-a488-9846e081b224/8a262faf-804f-467d-828c-37c228ac33c9/symbol.svg" width="40px" /> Feito com 💜 por Rocketseat

</aside>
