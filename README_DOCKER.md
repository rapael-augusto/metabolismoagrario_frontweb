# Como rodar este projeto Next.js com Docker

1. **Build da imagem:**
   ```powershell
   docker build -t metabolismo-frontweb .
   ```
2. **Rodar o container:**
   ```powershell
   docker run -d -p 3000:3000 --name metabolismo-frontweb metabolismo-frontweb
   ```
3. Acesse em: http://localhost:3000
