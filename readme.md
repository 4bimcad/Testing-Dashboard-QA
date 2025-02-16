# Automated Testing for React Admin Dashboard

Testing Website: https://marmelab.com/react-admin-demo/#/login

This repository contains automated tests for the React Admin Dashboard using [Playwright](https://playwright.dev/).

## 📌 Test Overview
The tests cover the following aspects:
- **Login Tests:** Verify authentication functionality.
- **Max Input Length Tests:** Check maximum character limits in input fields.
- **Memory Overflow Tests:** Stress test with large data submission.
- **Pagination Tests:** Ensure pagination works correctly.
- **Performance Tests:** Measure page load and response times.
- **SQL Injection Tests:** Validate security against SQL injection.
- **Stress Tests:** Simulate high user traffic.
- **UI Tests:** Check visual and layout consistency.
- **Visual Tests:** Compare UI changes against baseline snapshots.

## 🛠 Setup Instructions
### 1. Clone the Repository
```sh
git clone https://github.com/your-username/react-admin-dashboard-tests.git
cd react-admin-dashboard-tests
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Run Tests Locally
To execute all tests:
```sh
npx playwright test
```
To run a specific test:
```sh
npx playwright test tests/login-tests.spec.ts
```

### 4. Run Tests in Docker
You can run the tests inside a Docker container:
```sh
docker build -t playwright-tests .
docker run --rm playwright-tests
```

## 🔄 CI/CD with GitHub Actions
Tests are automatically executed on each push using GitHub Actions.
To set up:
1. Push the code to GitHub.
2. GitHub Actions will run the tests as defined in `.github/workflows/test.yml`.

## 📜 License
This project is licensed under the MIT License.

