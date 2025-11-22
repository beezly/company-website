# Security Guide

This project includes multiple layers of protection to prevent accidentally committing secrets like API keys, tokens, and passwords.

## 🛡️ Protection Layers

### 1. Pre-Commit Hook (Local)
**Automatic** - Runs before every `git commit`

When you try to commit code, Gitleaks automatically scans for:
- API keys (AWS, Google, Stripe, etc.)
- Authentication tokens
- Private keys
- Passwords
- Database connection strings
- OAuth secrets

If secrets are detected, the commit is **blocked** with a helpful error message.

### 2. GitHub Actions (CI/CD)
**Automatic** - Runs on every push and pull request

Even if something bypasses local checks, GitHub Actions runs the same security scan in the cloud. This catches:
- Secrets in pull requests
- Secrets pushed from different machines
- Historical secrets in git history

### 3. Manual Scanning
**On-demand** - Run anytime

```sh
# Scan entire repository for secrets
npm run security:scan

# Scan staged files before commit
npm run security:protect
```

## 🔍 What Gets Detected

The security scanner looks for patterns like:

- **API Keys**: `api_key=sk_live_abc123...`
- **AWS Keys**: `AKIAIOSFODNN7EXAMPLE`
- **Private Keys**: `-----BEGIN RSA PRIVATE KEY-----`
- **Tokens**: `ghp_abc123...` (GitHub), `xoxb-...` (Slack)
- **Database URLs**: `mongodb://user:pass@host`
- **OAuth Secrets**: `client_secret=abc123...`

## ✅ Best Practices

### Use Environment Variables

**❌ Don't do this:**
```javascript
const apiKey = "sk_live_abc123xyz789";
```

**✅ Do this instead:**
```javascript
const apiKey = import.meta.env.PUBLIC_API_KEY;
```

### Create .env Files

1. Create `.env` file (already in .gitignore):
```sh
PUBLIC_API_KEY=your-key-here
DATABASE_URL=your-connection-string
```

2. Create `.env.example` for documentation:
```sh
PUBLIC_API_KEY=your-api-key-here
DATABASE_URL=your-database-url-here
```

3. Commit `.env.example`, never commit `.env`

### For Astro Projects

Astro supports environment variables:

```javascript
// Access in .astro files
const apiKey = import.meta.env.PUBLIC_API_KEY;

// Or in config
export default defineConfig({
  site: import.meta.env.SITE_URL,
});
```

**Note**: Prefix with `PUBLIC_` for client-side access.

## 🚨 If Secrets Are Detected

### During Commit (Pre-commit Hook)

```
❌ COMMIT BLOCKED: Potential secrets detected!

Gitleaks found potential API keys, tokens, or other secrets in your code.

What to do:
  1. Remove the secret from your code
  2. Use environment variables instead
  3. Add to .gitignore if it's a config file
  4. If this is a false positive, update .gitleaks.toml
```

**Steps to fix:**

1. **Remove the secret** from your code
2. **Move it to .env** file
3. **Update code** to use environment variables
4. **Try committing again**

### False Positives

If the scanner flags something that's not a real secret:

1. Open `.gitleaks.toml`
2. Add to the `allowlist.regexes` section:

```toml
[allowlist]
regexes = [
  '''your-false-positive-pattern''',
]
```

## 🔐 GitHub Secrets (for CI/CD)

For secrets needed in GitHub Actions:

1. Go to repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add your secret (e.g., `API_KEY`)
4. Reference in workflows:

```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

## 📋 Security Checklist

Before deploying:

- [ ] All API keys are in environment variables
- [ ] `.env` file is in `.gitignore`
- [ ] `.env.example` documents required variables
- [ ] Pre-commit hook is working (`git commit` should trigger scan)
- [ ] GitHub Actions security scan is enabled
- [ ] No hardcoded passwords or tokens in code
- [ ] Database credentials are not in source code

## 🧪 Testing the Protection

Try committing a test secret to verify it works:

```sh
# Create a test file with a fake API key
echo "api_key=sk_test_abc123xyz789" > test-secret.txt

# Try to commit it
git add test-secret.txt
git commit -m "Test secret detection"

# Should be BLOCKED with error message

# Clean up
rm test-secret.txt
git reset HEAD test-secret.txt
```

## 🆘 Already Committed a Secret?

If you accidentally committed a secret:

### 1. Rotate the Secret Immediately
- Generate a new API key/token
- Revoke the old one
- **Do this first!** Once pushed, assume it's compromised

### 2. Remove from Git History

```sh
# Remove file from all commits
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/file" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (be careful!)
git push origin --force --all
```

Or use [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/):

```sh
bfg --delete-files secret-file.txt
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push origin --force --all
```

### 3. Notify Your Team
If working with others, let them know to:
- Pull the cleaned history
- Update their local repos

## 📚 Additional Resources

- [Gitleaks Documentation](https://github.com/gitleaks/gitleaks)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Astro Environment Variables](https://docs.astro.build/en/guides/environment-variables/)

## 🐛 Troubleshooting

### Pre-commit hook not running

```sh
# Reinstall husky
npm run prepare

# Make hook executable
chmod +x .husky/pre-commit
```

### Gitleaks not found

```sh
# Reinstall dependencies
npm install
```

### Want to bypass (not recommended)

```sh
# Skip pre-commit hook (dangerous!)
git commit --no-verify -m "message"
```

**Warning**: Only use `--no-verify` if you're absolutely sure there are no secrets!

## 📞 Questions?

If you're unsure whether something is a secret or how to handle it, ask before committing!
