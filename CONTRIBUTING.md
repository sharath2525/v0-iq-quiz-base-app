# Contributing to IQ Quiz Contest

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:

- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (browser, device, etc.)

### Suggesting Features

We welcome feature suggestions! Open an issue with:

- Clear description of the feature
- Use cases and benefits
- Potential implementation ideas (optional)

### Pull Requests

1. **Fork the repository**
2. **Create a branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**
4. **Test thoroughly**: Ensure the app works in Base mini app context
5. **Commit**: Use clear, descriptive commit messages
6. **Push**: `git push origin feature/your-feature-name`
7. **Open a PR**: Provide a clear description of changes

## 📝 Code Style

- Use TypeScript for type safety
- Follow existing code formatting (Prettier)
- Add comments for complex logic
- Keep components focused and reusable
- Write self-documenting code with clear variable names

## 🧪 Testing

Before submitting:

- [ ] Test in local development (`npm run dev`)
- [ ] Test in Base mini app context (deployed version)
- [ ] Test wallet connection and payment flow
- [ ] Check mobile responsiveness
- [ ] Verify no console errors

## 📚 Adding Quiz Content

See [QUIZ_GUIDE.md](./QUIZ_GUIDE.md) for detailed instructions on adding:
- New quiz categories
- New quizzes
- New questions

## 🎨 UI Guidelines

- Use Tailwind CSS classes
- Follow existing design patterns
- Maintain mobile-first approach
- Ensure touch targets are at least 44px
- Test safe area insets on mobile devices

## 📦 Dependencies

Before adding new dependencies:

- Check if existing dependencies can solve the problem
- Consider bundle size impact
- Ensure compatibility with Next.js 16
- Update package.json and package-lock.json together

## ✅ PR Checklist

- [ ] Code follows project style
- [ ] Tests pass (if applicable)
- [ ] Documentation updated (if needed)
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Works in Base mini app context

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉

