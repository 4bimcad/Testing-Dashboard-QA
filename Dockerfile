FROM mcr.microsoft.com/playwright:v1.41.0

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all test files
COPY . .

# Run tests
CMD ["npx", "playwright", "test"]
