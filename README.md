# ClimateMind AI

Plataforma de previsão climática com inteligência artificial, utilizando dados da OpenWeather e um modelo preditivo próprio. O projeto é composto por um backend em FastAPI e um frontend em React.

## Project Status

**Status:** Em construção (fase de desenvolvimento ativo)

O projeto encontra-se em estágio inicial de desenvolvimento. As funcionalidades básicas de consulta climática e exibição de previsões estão implementadas, mas melhorias significativas estão planejadas para estabilidade, desempenho, segurança e experiência do usuário.

### O que já funciona
- Consulta de clima atual via OpenWeather API
- Previsão estendida (próximos dias)
- Interface web simples para exibição dos dados

### Em desenvolvimento / próximas entregas
- Integração completa do modelo de ML (arquivo model.pkl já presente)
- Tratamento robusto de erros e validação de entrada
- Cache para reduzir chamadas externas
- Testes automatizados
- Deploy via Docker com orquestração

## Documentação

### Documentação existente
- ANALYSIS.md – análise técnica do projeto e pontos de melhoria
- README.md (este arquivo) – visão geral e status

### Documentação pendente (a ser implementada)

Com base na análise do projeto, os seguintes itens de documentação precisam ser criados ou melhorados:

1. **README aprimorado**
   - Descrição mais detalhada do problema resolvido e público-alvo
   - Badges de status, versão, licença e tecnologias
   - Capturas de tela ou GIFs demonstrando a interface
   - Tópicos (GitHub topics) para categorização do repositório
   - Seção de funcionalidades principais com check-list

2. **Guia de contribuição (CONTRIBUTING.md)**
   - Diretrizes para reportar bugs e sugerir melhorias
   - Padrões de código (linting, formatação)
   - Processo de pull requests

3. **Templates para issues e pull requests**
   - Template para reportar bugs (bug_report.md)
   - Template para solicitar funcionalidades (feature_request.md)
   - Template para pull requests (pull_request_template.md)

4. **Licença**
   - Escolher e adicionar uma licença de software aberto (ex: MIT, GPL-3.0)

5. **Documentação da API**
   - Exemplos de requisição/resposta para os endpoints (usando o Swagger gerado pelo FastAPI já disponível em /docs, mas sem documentação complementar no README)

6. **Arquivo de boas práticas de instalação**
   - Instruções detalhadas para rodar o projeto em desenvolvimento (frontend e backend separadamente)
   - Variáveis de ambiente necessárias (arquivo .env.example já existe, mas faltam explicações)

7. **Guia de deploy**
   - Passos para deploy com Docker (Dockerfile e docker-compose a serem criados/otimizados)
   - Opções de hospedagem sugeridas

## Tecnologias utilizadas

- Backend: Python, FastAPI, Uvicorn, Pydantic, joblib (para o modelo ML)
- Frontend: React, JavaScript, CSS
- API externa: OpenWeather API
- (Planejado) Cache: Redis
- (Planejado) Testes: Pytest, Vitest

## Como executar (versão resumida)

### Backend
1. Copie `.env.example` para `.env` e preencha sua chave da OpenWeather.
2. Instale dependências: `pip install -r requirements.txt`
3. Execute: `uvicorn main:app --reload`

### Frontend
1. Acesse a pasta do frontend: `cd frontend`
2. Instale dependências: `npm install`
3. Execute: `npm start`

## Contribuição

Consulte a seção "Documentação pendente" – assim que o arquivo CONTRIBUTING.md for adicionado, as diretrizes estarão disponíveis. Por enquanto, sinta-se à vontade para abrir issues relatando problemas ou sugerindo melhorias.

## Licença

Nenhuma licença foi definida ainda. Este item está listado como pendente na documentação.

---

Projeto desenvolvido por João Victor A. Abreu.
