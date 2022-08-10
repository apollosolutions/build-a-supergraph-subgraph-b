# GitHub Actions

Included in this repo are actions to:

* Run npm test on PR
* Run Helm build and lint on PR
* Build and publish Docker image on merge

## Running Locally

If you want to run any of these actions locally, you can use [act](https://github.com/nektos/act).

## Pinning Actions Version
The referenced actions are [pinned by specific git SHA](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions#using-third-party-actions).

You can use [pin-github-action](https://github.com/mheap/pin-github-action) if you want to update an action version.

We allow the GitHub first party actions to be referenced by tag with the flag `--allow "actions/*"`.

```shell
npx pin-github-action --allow "actions/*" .github/workflows/pr-check-code.yml
```