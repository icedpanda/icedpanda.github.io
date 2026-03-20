# GitHub Pages Setup

This repository is configured to deploy the site with GitHub Actions.

## GitHub settings to enable

1. Open the repository on GitHub.
2. Go to **Settings** -> **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Save the setting if GitHub prompts for it.

## Expected result

- Pushes to `master` trigger `.github/workflows/deploy-pages.yml`.
- Successful workflow runs deploy the site to `https://icedpanda.github.io/`.
- The Pages status panel on GitHub will link to the latest deployment run.

## If the site does not appear immediately

- Check the **Actions** tab for the `Deploy Jekyll site to Pages` workflow.
- Check **Settings** -> **Pages** to confirm the source is still `GitHub Actions`.
- GitHub Pages deployments can take a short time to become visible after the workflow finishes.

